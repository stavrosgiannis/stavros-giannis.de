// The 3D keyboard: a board of small keys, with one big key per section that
// launches out of its socket and floats above the board. Clicking a big key
// selects its section.
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { sections, type SectionId } from "../data/site";

export type KeyboardScene = {
  select(id: SectionId | null): void;
  press(id: SectionId): void;
};

type Options = { onSelect(id: SectionId | null): void };

const PITCH = 1.05; // distance between small keys
const ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const ROW_OFFSET = [0, 0.3, 0.8];
const COLORS = {
  bg: 0x07090d,
  board: 0x161a22,
  key: 0x262c37,
  legend: "#8b93a3",
  cap: 0xe9e5db,
  capText: "#151a22",
  accent: 0x2dd4bf,
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

function legendTexture(letter: string, label: string | null, bg: string, fg: string): THREE.CanvasTexture {
  const size = label ? 512 : 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  g.fillStyle = bg;
  g.fillRect(0, 0, size, size);
  g.fillStyle = fg;
  g.textBaseline = "top";
  if (label) {
    g.font = "700 230px ui-monospace, Menlo, Consolas, monospace";
    g.fillText(letter, 52, 40);
    g.font = "600 64px ui-sans-serif, system-ui, sans-serif";
    g.textBaseline = "alphabetic";
    g.fillText(label.toUpperCase(), 56, size - 64);
  } else {
    g.font = "600 44px ui-monospace, Menlo, Consolas, monospace";
    g.fillText(letter, 20, 16);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

const hex = (n: number) => `#${n.toString(16).padStart(6, "0")}`;

export function createKeyboard(canvas: HTMLCanvasElement, opts: Options): KeyboardScene {
  const mobile = matchMedia("(pointer: coarse)").matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = !mobile;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(COLORS.bg);
  scene.fog = new THREE.Fog(COLORS.bg, 18, 42);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);

  // Lights
  scene.add(new THREE.HemisphereLight(0xbfd4ff, 0x0b0d12, 0.9));
  const sun = new THREE.DirectionalLight(0xffffff, 2.2);
  sun.position.set(-5, 12, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -10, right: 10, top: 8, bottom: -8, near: 1, far: 30 });
  sun.shadow.bias = -0.0005;
  scene.add(sun);
  const rimTeal = new THREE.PointLight(COLORS.accent, 40, 20);
  rimTeal.position.set(6, 3, -3);
  const rimViolet = new THREE.PointLight(0x8b5cf6, 30, 20);
  rimViolet.position.set(-7, 2.5, -2);
  scene.add(rimTeal, rimViolet);

  // Floor grid for depth
  const grid = new THREE.GridHelper(80, 80, 0x1b2230, 0x121722);
  grid.position.y = -0.6;
  scene.add(grid);

  // Board
  const keyboard = new THREE.Group();
  scene.add(keyboard);
  const boardW = 10 * PITCH + 1.1;
  const boardD = 4 * PITCH + 0.9;
  const board = new THREE.Mesh(
    new RoundedBoxGeometry(boardW, 0.6, boardD, 4, 0.25),
    new THREE.MeshStandardMaterial({ color: COLORS.board, metalness: 0.7, roughness: 0.35 }),
  );
  board.receiveShadow = true;
  keyboard.add(board);

  // Small keys, with sockets left where the big keys sit
  const bigLetters = new Map<string, SectionId>(sections.map((s) => [s.key, s.id]));
  const sockets = new Map<SectionId, THREE.Vector3>();
  const smallGeo = new RoundedBoxGeometry(0.88, 0.42, 0.88, 3, 0.1);
  const smallMat = new THREE.MeshStandardMaterial({ color: COLORS.key, roughness: 0.6, metalness: 0.1 });
  const legendGeo = new THREE.PlaneGeometry(0.72, 0.72);
  const socketGeo = new THREE.PlaneGeometry(0.8, 0.8);
  const socketMat = new THREE.MeshBasicMaterial({ color: COLORS.accent, transparent: true, opacity: 0.35 });
  const rowZ = (r: number) => -boardD / 2 + 0.45 + PITCH * (r + 0.5);

  ROWS.forEach((row, r) => {
    [...row].forEach((letter, i) => {
      const x = -boardW / 2 + 0.55 + PITCH * (i + 0.5) + ROW_OFFSET[r];
      const z = rowZ(r);
      const big = bigLetters.get(letter);
      if (big) {
        sockets.set(big, new THREE.Vector3(x, 0.32, z));
        const glow = new THREE.Mesh(socketGeo, socketMat);
        glow.rotation.x = -Math.PI / 2;
        glow.position.set(x, 0.305, z);
        keyboard.add(glow);
        return;
      }
      const key = new THREE.Mesh(smallGeo, smallMat);
      key.position.set(x, 0.45, z);
      key.castShadow = key.receiveShadow = true;
      const legend = new THREE.Mesh(
        legendGeo,
        new THREE.MeshStandardMaterial({ map: legendTexture(letter, null, hex(COLORS.key), COLORS.legend), roughness: 0.6 }),
      );
      legend.rotation.x = -Math.PI / 2;
      legend.position.y = 0.211;
      key.add(legend);
      keyboard.add(key);
    });
  });

  // Space bar
  const space = new THREE.Mesh(new RoundedBoxGeometry(PITCH * 5.5, 0.42, 0.88, 3, 0.1), smallMat);
  space.position.set(0.4, 0.45, rowZ(3));
  space.castShadow = space.receiveShadow = true;
  keyboard.add(space);

  // Big keys
  const capGeo = new RoundedBoxGeometry(1.7, 0.9, 1.7, 4, 0.2);
  const topGeo = new RoundedBoxGeometry(1.36, 0.14, 1.36, 3, 0.06);
  const faceGeo = new THREE.PlaneGeometry(1.2, 1.2);
  const bigKeys: BigKey[] = sections.map((s, i) => {
    const accent = s.id === "contact";
    const capColor = accent ? COLORS.accent : COLORS.cap;
    const mat = new THREE.MeshStandardMaterial({ color: capColor, roughness: 0.45, metalness: 0.05, emissive: COLORS.accent, emissiveIntensity: 0 });
    const group = new THREE.Group();
    const body = new THREE.Mesh(capGeo, mat);
    body.castShadow = true;
    const top = new THREE.Mesh(topGeo, mat);
    top.position.y = 0.48;
    const face = new THREE.Mesh(
      faceGeo,
      new THREE.MeshStandardMaterial({ map: legendTexture(s.key, s.label, hex(capColor), COLORS.capText), roughness: 0.5 }),
    );
    face.rotation.x = -Math.PI / 2;
    face.position.y = 0.552;
    group.add(body, top, face);
    group.userData.id = s.id;
    body.userData.id = top.userData.id = face.userData.id = s.id;
    const socket = sockets.get(s.id)!.clone();
    group.position.copy(socket);
    group.scale.setScalar(0.52);
    keyboard.add(group);
    return { id: s.id, group, body, socket, home: new THREE.Vector3(), phase: i * 1.3, launch: 0, pressT: 9, hover: 0 };
  });

  // Dust
  const dustCount = mobile ? 150 : 350;
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 40;
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
    const span = narrow ? 9 : 15; // world width we want in view
    const hfov = 2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect);
    const dist = Math.max(narrow ? 13 : 14, span / 2 / Math.tan(hfov / 2) + 3);
    baseCam.set(0, dist * 0.62, dist * 0.8);
    baseLook.set(0, narrow ? 0.8 : 1.4, 0);
    const fog = scene.fog as THREE.Fog;
    fog.near = dist * 1.1;
    fog.far = dist * 2.6;
    camera.updateProjectionMatrix();

    bigKeys.forEach((k, i) => {
      const n = bigKeys.length;
      const t = i / (n - 1) - 0.5; // -0.5..0.5
      if (narrow) {
        // two staggered rows so the keys stay big on phones
        const row = i % 2;
        k.home.set(t * 5.2, 4.2 - row * 1.7, 0.8 + row * 0.6);
      } else {
        k.home.set(t * 12, 2.6 + Math.cos(t * Math.PI) * 0.9, 1.1 - Math.abs(t) * 1.6);
      }
    });
  }

  // Interaction
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(0, 0);
  const parallax = new THREE.Vector2(0, 0);
  let hovered: SectionId | null = null;
  let selected: SectionId | null = null;
  let downAt: { x: number; y: number } | null = null;

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
    }
    parallax.set((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1);
  });
  canvas.addEventListener("pointerleave", () => {
    hovered = null;
    canvas.style.cursor = "";
  });
  canvas.addEventListener("pointerdown", (e) => (downAt = { x: e.clientX, y: e.clientY }));
  canvas.addEventListener("pointerup", (e) => {
    if (!downAt || Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) > 8) return;
    downAt = null;
    const id = pick(e.clientX, e.clientY);
    if (id) press(id);
    opts.onSelect(id);
  });

  function press(id: SectionId): void {
    const k = bigKeys.find((b) => b.id === id);
    if (k) k.pressT = 0;
  }

  // Loop
  const timer = new THREE.Timer();
  const tmp = new THREE.Vector3();
  let started = 0;

  function frame(): void {
    timer.update();
    const dt = Math.min(timer.getDelta(), 0.05);
    const t = timer.getElapsed();
    if (!started) started = t;
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

      const scale = THREE.MathUtils.lerp(0.52, 1, k.launch) * (1 + k.hover * 0.08);
      k.group.scale.setScalar(scale);
      k.group.rotation.x = Math.sin(t * 0.9 + k.phase) * 0.12 * k.launch + 0.25 * k.launch;
      k.group.rotation.z = Math.cos(t * 0.7 + k.phase) * 0.1 * k.launch;
      k.group.rotation.y = (1 - k.launch) * Math.PI * 2 + (isSel ? Math.sin(t * 1.5) * 0.25 : 0);

      const mat = k.body.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = k.hover * 0.35;
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
    const k = Math.min(1, dt * 2.5);
    camera.position.lerp(camPos, k);
    cameraLook.lerp(camLook, k);
    camera.lookAt(cameraLook);

    keyboard.rotation.y = Math.sin(t * 0.2) * 0.05;
    dust.rotation.y = t * 0.01;
    socketMat.opacity = 0.25 + Math.sin(t * 2) * 0.1;

    renderer.render(scene, camera);
  }

  const cameraLook = baseLook.clone();
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
