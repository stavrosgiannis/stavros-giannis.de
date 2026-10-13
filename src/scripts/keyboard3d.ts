// The 3D keyboard: a 60% mechanical keyboard with sculpted keycaps. The
// section keys (A, E, W, S, C) launch out of their switches and float above
// the board; clicking one selects its section.
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { sections, type SectionId } from "../data/site";

export type KeyboardScene = {
  select(id: SectionId | null): void;
  press(id: SectionId): void;
};

type Options = { onSelect(id: SectionId | null): void };

type Kind = "alpha" | "mod" | "accent";
type KeyDef = { label: string; w: number; kind?: Kind; legend?: string };

const U = 1; // one key unit
const CAP_H = 0.42;
const COLORS = {
  bg: 0x07090d,
  case: 0x1c2029,
  plate: 0x0c0f14,
  housing: 0x2a2f38,
  alpha: 0xd8d4cb,
  alphaText: "#2b3038",
  mod: 0x4a505c,
  modText: "#e4e6ea",
  accent: 0x2dd4bf,
  accentText: "#0b2a27",
  cable: 0x15181f,
};

const k = (label: string, w = 1, kind: Kind = "alpha", legend?: string): KeyDef => ({ label, w, kind, legend });
const alphas = (s: string) => [...s].map((c) => k(c));

// Standard ANSI 60% layout, 15u per row.
const LAYOUT: KeyDef[][] = [
  [k("Esc", 1, "accent"), ...alphas("1234567890-="), k("Backspace", 2, "mod", "⌫")],
  [k("Tab", 1.5, "mod"), ...alphas("QWERTYUIOP[]"), k("\\", 1.5)],
  [k("Caps", 1.75, "mod"), ...alphas("ASDFGHJKL;'"), k("Enter", 2.25, "accent")],
  [k("Shift", 2.25, "mod"), ...alphas("ZXCVBNM,./"), k("Shift", 2.75, "mod")],
  [k("Ctrl", 1.25, "mod"), k("Win", 1.25, "mod"), k("Alt", 1.25, "mod"), k("", 6.25), k("Alt", 1.25, "mod"), k("Fn", 1.25, "mod"), k("Menu", 1.25, "mod"), k("Ctrl", 1.25, "mod")],
];
const ROW_TILT = [-0.12, -0.06, 0, 0.06, 0.1]; // OEM-style row sculpt

const KIND_STYLE: Record<Kind, { color: number; text: string }> = {
  alpha: { color: COLORS.alpha, text: COLORS.alphaText },
  mod: { color: COLORS.mod, text: COLORS.modText },
  accent: { color: COLORS.accent, text: COLORS.accentText },
};

type BigKey = {
  id: SectionId;
  group: THREE.Group;
  body: THREE.Mesh;
  socket: THREE.Vector3;
  home: THREE.Vector3;
  phase: number;
  launch: number; // 0..1 intro progress
  pressT: number; // seconds since last press, for the press dip
  hover: number; // eased 0..1
};

const ease = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);
const hex = (n: number) => `#${n.toString(16).padStart(6, "0")}`;

/** Rounded box whose top is pulled in, like a sculpted keycap. */
function keycapGeometry(w: number, d: number, h: number, inset: number): THREE.BufferGeometry {
  const g = new RoundedBoxGeometry(w, h, d, 3, Math.min(0.09, h / 3));
  const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const t = (pos.getY(i) + h / 2) / h; // 0 bottom .. 1 top
    const x = pos.getX(i);
    const z = pos.getZ(i);
    pos.setX(i, x - Math.sign(x) * inset * t);
    pos.setZ(i, z - Math.sign(z) * inset * t);
  }
  g.computeVertexNormals();
  return g;
}

function legendTexture(text: string, aspect: number, bg: string, fg: string, sub?: string): THREE.CanvasTexture {
  const px = 128;
  const c = document.createElement("canvas");
  c.width = Math.round(px * aspect);
  c.height = px;
  const g = c.getContext("2d")!;
  g.fillStyle = bg;
  g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = fg;
  if (sub !== undefined) {
    // big section key: letter + label
    g.font = "700 62px ui-monospace, Menlo, Consolas, monospace";
    g.textBaseline = "top";
    g.fillText(text, 14, 10);
    g.font = "600 17px ui-sans-serif, system-ui, sans-serif";
    g.textBaseline = "alphabetic";
    g.fillText(sub.toUpperCase(), 15, px - 14);
  } else if (text.length <= 1 || text === "⌫") {
    g.font = "600 54px ui-sans-serif, system-ui, sans-serif";
    g.textBaseline = "top";
    g.fillText(text, 16, 12);
  } else {
    g.font = "600 32px ui-sans-serif, system-ui, sans-serif";
    g.textBaseline = "alphabetic";
    g.fillText(text.toLowerCase(), 14, px - 18);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

export function createKeyboard(canvas: HTMLCanvasElement, opts: Options): KeyboardScene {
  const touch = matchMedia("(pointer: coarse)").matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, touch ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = !touch;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(COLORS.bg);
  scene.fog = new THREE.Fog(COLORS.bg, 18, 42);

  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);

  // Lights
  scene.add(new THREE.HemisphereLight(0xc8d8ff, 0x0b0d12, 1.0));
  const sun = new THREE.DirectionalLight(0xffffff, 2.4);
  sun.position.set(-5, 12, 7);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 1024);
  Object.assign(sun.shadow.camera, { left: -11, right: 11, top: 8, bottom: -8, near: 1, far: 30 });
  sun.shadow.bias = -0.0004;
  scene.add(sun);
  const rimTeal = new THREE.PointLight(COLORS.accent, 45, 22);
  rimTeal.position.set(8, 3, -3.5);
  const rimViolet = new THREE.PointLight(0x8b5cf6, 35, 22);
  rimViolet.position.set(-9, 2.5, -3);
  scene.add(rimTeal, rimViolet);

  const grid = new THREE.GridHelper(90, 90, 0x1b2230, 0x121722);
  grid.position.y = -0.7;
  scene.add(grid);

  // Case and plate
  const keyboard = new THREE.Group();
  keyboard.rotation.x = 0.06; // typing angle
  scene.add(keyboard);
  const rows = LAYOUT.length;
  const boardW = 15 * U + 0.7;
  const boardD = rows * U + 0.7;
  const caseMesh = new THREE.Mesh(
    new RoundedBoxGeometry(boardW, 0.8, boardD, 5, 0.3),
    new THREE.MeshStandardMaterial({ color: COLORS.case, metalness: 0.75, roughness: 0.32 }),
  );
  caseMesh.receiveShadow = caseMesh.castShadow = true;
  keyboard.add(caseMesh);
  const plate = new THREE.Mesh(
    new THREE.BoxGeometry(15 * U + 0.06, 0.05, rows * U + 0.06),
    new THREE.MeshStandardMaterial({ color: COLORS.plate, roughness: 0.9 }),
  );
  plate.position.y = 0.38;
  plate.receiveShadow = true;
  keyboard.add(plate);

  // USB cable out of the back
  const cable = new THREE.Mesh(
    new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-3, 0.1, -boardD / 2),
        new THREE.Vector3(-3, -0.25, -boardD / 2 - 0.9),
        new THREE.Vector3(-2.4, -0.6, -boardD / 2 - 2.4),
        new THREE.Vector3(0.5, -0.61, -boardD / 2 - 4.5),
        new THREE.Vector3(6, -0.61, -boardD / 2 - 6),
      ]),
      64,
      0.09,
      10,
    ),
    new THREE.MeshStandardMaterial({ color: COLORS.cable, roughness: 0.6 }),
  );
  keyboard.add(cable);

  // Keys
  const bigLetters = new Map<string, SectionId>(sections.map((s) => [s.key, s.id]));
  const sockets = new Map<SectionId, THREE.Vector3>();
  const geoCache = new Map<number, THREE.BufferGeometry>();
  const capGeo = (w: number) => {
    if (!geoCache.has(w)) geoCache.set(w, keycapGeometry(w * U - 0.1, U - 0.1, CAP_H, 0.09));
    return geoCache.get(w)!;
  };
  const matCache = new Map<Kind, THREE.MeshStandardMaterial>();
  const capMat = (kind: Kind) => {
    if (!matCache.has(kind))
      matCache.set(kind, new THREE.MeshStandardMaterial({ color: KIND_STYLE[kind].color, roughness: 0.55, metalness: 0.02 }));
    return matCache.get(kind)!;
  };
  const housingGeo = new THREE.BoxGeometry(0.62, 0.22, 0.62);
  const housingMat = new THREE.MeshStandardMaterial({ color: COLORS.housing, roughness: 0.5 });
  const stemMat = new THREE.MeshStandardMaterial({ color: COLORS.accent, emissive: COLORS.accent, emissiveIntensity: 0.9 });
  const stemA = new THREE.BoxGeometry(0.26, 0.16, 0.07);
  const stemB = new THREE.BoxGeometry(0.07, 0.16, 0.26);
  const capTop = 0.4 + CAP_H / 2 + 0.1;

  LAYOUT.forEach((row, r) => {
    let x = (-15 * U) / 2;
    const z = (-rows / 2 + r + 0.5) * U;
    row.forEach((def) => {
      const cx = x + (def.w * U) / 2;
      x += def.w * U;
      const big = def.w === 1 ? bigLetters.get(def.label) : undefined;
      if (big) {
        // Exposed switch where the section key launched from
        sockets.set(big, new THREE.Vector3(cx, capTop, z));
        const housing = new THREE.Mesh(housingGeo, housingMat);
        housing.position.set(cx, 0.51, z);
        const s1 = new THREE.Mesh(stemA, stemMat);
        const s2 = new THREE.Mesh(stemB, stemMat);
        s1.position.set(cx, 0.68, z);
        s2.position.copy(s1.position);
        keyboard.add(housing, s1, s2);
        return;
      }
      const kind = def.kind ?? "alpha";
      const cap = new THREE.Mesh(capGeo(def.w), capMat(kind));
      cap.position.set(cx, capTop, z);
      cap.rotation.x = ROW_TILT[r];
      cap.castShadow = cap.receiveShadow = true;
      const legendText = def.legend ?? def.label;
      if (legendText) {
        const faceW = def.w * U - 0.36;
        const faceD = U - 0.36;
        const face = new THREE.Mesh(
          new THREE.PlaneGeometry(faceW, faceD),
          new THREE.MeshStandardMaterial({
            map: legendTexture(legendText, faceW / faceD, hex(KIND_STYLE[kind].color), KIND_STYLE[kind].text),
            roughness: 0.55,
          }),
        );
        face.rotation.x = -Math.PI / 2;
        face.position.y = CAP_H / 2 + 0.002;
        cap.add(face);
      }
      keyboard.add(cap);
    });
  });

  // Big section keys: the same sculpted cap, scaled up when airborne
  const bigGeo = keycapGeometry(1.8, 1.8, 0.95, 0.2);
  const bigFace = new THREE.PlaneGeometry(1.3, 1.3);
  const bigKeys: BigKey[] = sections.map((s, i) => {
    const accent = s.id === "contact";
    const color = accent ? COLORS.accent : COLORS.alpha;
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.03, emissive: COLORS.accent, emissiveIntensity: 0 });
    const group = new THREE.Group();
    const body = new THREE.Mesh(bigGeo, mat);
    body.castShadow = true;
    const face = new THREE.Mesh(
      bigFace,
      new THREE.MeshStandardMaterial({
        map: legendTexture(s.key, 1, hex(color), accent ? COLORS.accentText : COLORS.alphaText, s.label),
        roughness: 0.5,
      }),
    );
    face.rotation.x = -Math.PI / 2;
    face.position.y = 0.477;
    group.add(body, face);
    body.userData.id = face.userData.id = s.id;
    group.position.copy(sockets.get(s.id)!);
    group.scale.setScalar(0.5);
    keyboard.add(group);
    const socket = sockets.get(s.id)!.clone();
    return { id: s.id, group, body, socket, home: new THREE.Vector3(), phase: i * 1.3, launch: 0, pressT: 9, hover: 0 };
  });

  // Dust
  const dustCount = touch ? 150 : 350;
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 44;
    dustPos[i * 3 + 1] = Math.random() * 14 - 1;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0x5eead4, size: 0.05, transparent: true, opacity: 0.6 }));
  scene.add(dust);

  // Layout: where the big keys float, and where the camera sits
  const camPos = new THREE.Vector3();
  const camLook = new THREE.Vector3();
  const baseCam = new THREE.Vector3();
  const baseLook = new THREE.Vector3(0, 1.4, 0);
  let narrow = false;

  function layout(): void {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    narrow = camera.aspect < 0.9;
    const span = narrow ? 10.5 : 18; // world width we want in view
    const hfov = 2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect);
    const dist = Math.max(14, span / 2 / Math.tan(hfov / 2) + 3);
    baseCam.set(0, dist * 0.62, dist * 0.8);
    baseLook.set(0, narrow ? 0.8 : 1.3, 0);
    const fog = scene.fog as THREE.Fog;
    fog.near = dist * 1.1;
    fog.far = dist * 2.6;
    camera.updateProjectionMatrix();

    bigKeys.forEach((k, i) => {
      const t = i / (bigKeys.length - 1) - 0.5; // -0.5..0.5
      if (narrow) {
        const row = i % 2; // two staggered rows keep the keys big on phones
        k.home.set(t * 5.4, 4.4 - row * 1.8, 1 + row * 0.6);
      } else {
        k.home.set(t * 13, 2.8 + Math.cos(t * Math.PI) * 0.9, 1.4 - Math.abs(t) * 1.6);
      }
    });
  }

  // Interaction
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(0, 0);
  const parallax = new THREE.Vector2(0, 0);
  let hovered: SectionId | null = null;
  let selected: SectionId | null = null;
  let down: { id: number; x: number; y: number } | null = null;

  function pick(clientX: number, clientY: number): SectionId | null {
    const r = canvas.getBoundingClientRect();
    pointer.set(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(bigKeys.map((k) => k.group), true)[0];
    return (hit?.object.userData.id as SectionId | undefined) ?? null;
  }

  canvas.addEventListener("pointermove", (e) => {
    if (e.pointerType === "mouse") {
      hovered = pick(e.clientX, e.clientY);
      canvas.style.cursor = hovered ? "pointer" : "";
      parallax.set((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1);
    }
  });
  canvas.addEventListener("pointerleave", () => {
    hovered = null;
    canvas.style.cursor = "";
  });
  canvas.addEventListener("pointerdown", (e) => {
    if (e.isPrimary) down = { id: e.pointerId, x: e.clientX, y: e.clientY };
  });
  canvas.addEventListener("pointercancel", () => (down = null));
  canvas.addEventListener("pointerup", (e) => {
    const start = down;
    down = null;
    if (!start || start.id !== e.pointerId || Math.hypot(e.clientX - start.x, e.clientY - start.y) > 10) return;
    const id = pick(e.clientX, e.clientY);
    if (id) {
      press(id);
      opts.onSelect(id);
    } else if (e.pointerType === "mouse") {
      // Clicking empty space closes; on touch screens a stray tap shouldn't.
      opts.onSelect(null);
    }
  });

  function press(id: SectionId): void {
    const k = bigKeys.find((b) => b.id === id);
    if (k) k.pressT = 0;
  }

  // Loop
  const timer = new THREE.Timer();
  const tmp = new THREE.Vector3();
  const cameraLook = baseLook.clone();
  let started = -1;

  function frame(): void {
    timer.update();
    const dt = Math.min(timer.getDelta(), 0.05);
    const t = timer.getElapsed();
    if (started < 0) started = t;
    const intro = t - started;

    bigKeys.forEach((k, i) => {
      k.launch = ease((intro - 0.4 - i * 0.12) / 1.1);
      k.pressT += dt;
      const isSel = selected === k.id;
      k.hover += ((hovered === k.id || isSel ? 1 : 0) - k.hover) * Math.min(1, dt * 10);

      const bob = Math.sin(t * 1.3 + k.phase) * 0.18 * k.launch;
      const dip = k.pressT < 0.35 ? -Math.sin((k.pressT / 0.35) * Math.PI) * 0.45 : 0;
      tmp.copy(k.socket).lerp(k.home, k.launch);
      tmp.y += bob + dip + k.hover * 0.35 + Math.sin(k.launch * Math.PI) * 1.2;
      k.group.position.copy(tmp);

      k.group.scale.setScalar(THREE.MathUtils.lerp(0.5, 1, k.launch) * (1 + k.hover * 0.08));
      k.group.rotation.x = Math.sin(t * 0.9 + k.phase) * 0.12 * k.launch + 0.25 * k.launch;
      k.group.rotation.z = Math.cos(t * 0.7 + k.phase) * 0.1 * k.launch;
      k.group.rotation.y = (1 - k.launch) * Math.PI * 2 + (isSel ? Math.sin(t * 1.5) * 0.25 : 0);
      (k.body.material as THREE.MeshStandardMaterial).emissiveIntensity = k.hover * 0.35;
    });

    // Camera: idle sway, pointer parallax, and fly to the selected key
    const sel = selected ? bigKeys.find((k) => k.id === selected) : null;
    if (sel) {
      sel.group.getWorldPosition(tmp);
      const side = narrow ? 0 : 2.4; // keep the key left of the side panel
      camLook.set(tmp.x + side, tmp.y + (narrow ? -1.4 : 0), tmp.z);
      camPos.set(tmp.x + side * 0.6, tmp.y + 3.2, tmp.z + (narrow ? 8.5 : 7.5));
    } else {
      camLook.copy(baseLook);
      camPos.copy(baseCam);
      camPos.x += Math.sin(t * 0.15) * 0.8;
    }
    camPos.x += parallax.x * 0.8;
    camPos.y -= parallax.y * 0.5;
    const follow = Math.min(1, dt * 2.5);
    camera.position.lerp(camPos, follow);
    cameraLook.lerp(camLook, follow);
    camera.lookAt(cameraLook);

    keyboard.rotation.y = Math.sin(t * 0.2) * 0.05;
    dust.rotation.y = t * 0.01;
    stemMat.emissiveIntensity = 0.7 + Math.sin(t * 2) * 0.3;

    renderer.render(scene, camera);
  }

  layout();
  camera.position.copy(baseCam).add(new THREE.Vector3(0, 4, 6));
  new ResizeObserver(layout).observe(canvas);
  renderer.setAnimationLoop(frame);

  return {
    select(id) {
      selected = id;
    },
    press,
  };
}
