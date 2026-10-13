// Homepage controller. Without WebGL (or with reduced motion) the sections
// stay a normal scrolling page; otherwise the 3D keyboard drives them.
import { sections, type SectionId } from "../data/site";
import type { KeyboardScene } from "./keyboard3d";

const ids = sections.map((s) => s.id) as SectionId[];
const isSection = (v: string): v is SectionId => (ids as string[]).includes(v);

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function setupHome(): void {
  const root = document.documentElement;
  const canvas = document.getElementById("scene") as HTMLCanvasElement | null;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canvas || reduceMotion || !hasWebGL()) return;

  root.classList.add("is-3d");

  const panels = new Map(ids.map((id) => [id, document.getElementById(id) as HTMLElement]));
  let scene: KeyboardScene | null = null;
  let current: SectionId | null = null;
  let returnFocus: HTMLElement | null = null;
  const navLinks = document.querySelectorAll<HTMLAnchorElement>(".keynav a");
  const markNav = () =>
    navLinks.forEach((a) => a.setAttribute("aria-current", String(a.dataset.section === current)));

  function open(id: SectionId): void {
    if (current === id) return;
    if (!current) returnFocus = document.activeElement as HTMLElement | null;
    if (current) panels.get(current)?.classList.remove("open");
    current = id;
    const panel = panels.get(id)!;
    panel.classList.add("open");
    panel.scrollTop = 0;
    root.classList.add("panel-open");
    history.replaceState(null, "", `#${id}`);
    scene?.select(id);
    markNav();
    panel.querySelector<HTMLElement>("[tabindex='-1']")?.focus({ preventScroll: true });
  }

  function close(): void {
    if (!current) return;
    panels.get(current)?.classList.remove("open");
    current = null;
    root.classList.remove("panel-open");
    history.replaceState(null, "", location.pathname);
    scene?.select(null);
    markNav();
    returnFocus?.focus({ preventScroll: true });
  }

  navLinks.forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const id = a.dataset.section ?? "";
      if (isSection(id)) (current === id ? close() : open(id));
    });
  });

  document.querySelectorAll(".panel-close").forEach((b) => b.addEventListener("click", close));

  window.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "Escape") return close();
    const hit = sections.find((s) => s.key.toLowerCase() === e.key.toLowerCase());
    if (hit) {
      scene?.press(hit.id);
      open(hit.id);
    }
  });

  window.addEventListener("hashchange", () => {
    const id = location.hash.slice(1);
    if (isSection(id)) open(id);
  });

  const initial = location.hash.slice(1);
  if (isSection(initial)) open(initial);

  import("./keyboard3d")
    .then(({ createKeyboard }) => {
      scene = createKeyboard(canvas, {
        onSelect: (id) => (id === null ? close() : current === id ? close() : open(id)),
      });
      if (current) scene.select(current);
      root.classList.add("scene-ready");
    })
    .catch(() => {
      // Fall back to the flat page if the scene fails to load.
      close();
      root.classList.remove("is-3d", "panel-open");
    });
}
