import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

export type TableAction = "tea" | "lamp" | "code";

export interface TableSceneOptions {
	isDark: boolean;
	reducedMotion: boolean;
	onAction: (action: TableAction) => void;
	onReady: () => void;
	onError: () => void;
}

const UP = new THREE.Vector3(0, 1, 0);

/** The entire illustration is procedural: no remote model, texture or HDR request. */
export class TableScene {
	private readonly canvas: HTMLCanvasElement;
	private readonly options: TableSceneOptions;
	private renderer?: THREE.WebGLRenderer;
	private composer?: EffectComposer;
	private bloom?: UnrealBloomPass;
	private controls?: OrbitControls;
	private scene?: THREE.Scene;
	private camera?: THREE.PerspectiveCamera;
	private resizeObserver?: ResizeObserver;
	private animationFrame = 0;
	private readonly sceneTime = new THREE.Clock();
	private readonly raycaster = new THREE.Raycaster();
	private readonly pointer = new THREE.Vector2();
	private readonly pointerDown = new THREE.Vector2();
	private readonly interactiveMeshes: THREE.Object3D[] = [];
	private readonly steam: THREE.Mesh[] = [];
	private readonly keys: THREE.Mesh[] = [];
	private lampOn = true;
	private warmLight?: THREE.PointLight;
	private lampGlow?: THREE.MeshStandardMaterial;
	private screenGlow?: THREE.MeshStandardMaterial;
	private group?: THREE.Group;
	private isVisible = true;
	private isDocumentVisible = true;
	private disposed = false;
	private hasInteracted = false;
	private actionPulse = 0;
	private codeBoost = 0;
	private themeTransition?: THREE.DirectionalLight;
	private readonly dayKeyColor = new THREE.Color(0xffe6bc);
	private readonly nightKeyColor = new THREE.Color(0x8fa9cf);
	private currentTheme: boolean;
	private reducedMotion: boolean;
	private readonly onPointerMoveBound: (event: PointerEvent) => void;
	private readonly onPointerDownBound: (event: PointerEvent) => void;
	private readonly onPointerUpBound: (event: PointerEvent) => void;
	private readonly onVisibilityBound: () => void;
	private readonly onContextLostBound: (event: Event) => void;

	constructor(canvas: HTMLCanvasElement, options: TableSceneOptions) {
		this.canvas = canvas;
		this.options = options;
		this.currentTheme = options.isDark;
		this.reducedMotion = options.reducedMotion;
		this.onPointerMoveBound = (event) => this.onPointerMove(event);
		this.onPointerDownBound = (event) => this.onPointerDown(event);
		this.onPointerUpBound = (event) => this.onPointerUp(event);
		this.onVisibilityBound = () => {
			this.isDocumentVisible = !document.hidden;
			this.syncAnimation();
		};
		this.onContextLostBound = (event) => {
			event.preventDefault();
			this.options.onError();
		};
	}

	init() {
		try {
			this.renderer = new THREE.WebGLRenderer({
				canvas: this.canvas,
				antialias: true,
				alpha: true,
				powerPreference: "low-power",
			});
			this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 640 ? 1.3 : 1.6));
			this.renderer.shadowMap.enabled = true;
			this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
			this.renderer.shadowMap.autoUpdate = false;
			this.renderer.shadowMap.needsUpdate = true;
			this.renderer.outputColorSpace = THREE.SRGBColorSpace;
			this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
			this.renderer.toneMappingExposure = this.currentTheme ? 1.08 : 0.94;

			this.scene = new THREE.Scene();
			this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60);
			this.camera.position.set(7.6, 6.1, 8.7);
			this.camera.lookAt(0, 0.85, 0);

			const pmrem = new THREE.PMREMGenerator(this.renderer);
			const room = new RoomEnvironment();
			this.scene.environment = pmrem.fromScene(room, 0.06).texture;
			this.scene.environmentIntensity = this.currentTheme ? 0.24 : 0.46;
			room.dispose();
			pmrem.dispose();

			this.addLighting();
			this.group = new THREE.Group();
			this.scene.add(this.group);
			this.addTable();
			this.addNotebook();
			this.addTea();
			this.addLamp();
			this.addBook();
			this.addSteam();

			this.controls = new OrbitControls(this.camera, this.canvas);
			this.controls.target.set(0, 0.85, 0);
			this.controls.enableDamping = !this.reducedMotion;
			this.controls.enableZoom = false;
			this.controls.dampingFactor = 0.055;
			this.controls.enablePan = false;
			this.controls.enableZoom = true;
			this.controls.minDistance = 9;
			this.controls.maxDistance = 13.5;
			this.controls.minPolarAngle = 0.55;
			this.controls.maxPolarAngle = 1.3;
			this.controls.minAzimuthAngle = -0.5;
			this.controls.maxAzimuthAngle = 1.65;
			this.canvas.style.touchAction = "pan-y";
			this.controls.rotateSpeed = 0.48;
			this.controls.zoomSpeed = 0.5;
			this.controls.addEventListener("start", () => {
				this.hasInteracted = true;
			});
			this.controls.update();

			this.composer = new EffectComposer(this.renderer);
			this.composer.addPass(new RenderPass(this.scene, this.camera));
			this.bloom = new UnrealBloomPass(new THREE.Vector2(640, 420), this.currentTheme ? 0.36 : 0.2, 0.65, 1.08);
			this.composer.addPass(this.bloom);
			this.composer.addPass(new OutputPass());

			this.resizeObserver = new ResizeObserver(() => this.resize());
			this.resizeObserver.observe(this.canvas.parentElement!);
			this.canvas.addEventListener("pointermove", this.onPointerMoveBound);
			this.canvas.addEventListener("pointerdown", this.onPointerDownBound);
			this.canvas.addEventListener("pointerup", this.onPointerUpBound);
			this.canvas.addEventListener("webglcontextlost", this.onContextLostBound);
			document.addEventListener("visibilitychange", this.onVisibilityBound);
			this.resize();
			if (this.reducedMotion) this.renderFrame();
			this.options.onReady();
		} catch (error) {
			console.warn("3D table unavailable:", error);
			this.options.onError();
			this.dispose();
		}
	}

	setDark(isDark: boolean) {
		if (!this.scene || !this.renderer || this.currentTheme === isDark) return;
		this.currentTheme = isDark;
		this.scene.environmentIntensity = isDark ? 0.24 : 0.46;
		this.renderer.toneMappingExposure = isDark ? 1.08 : 0.94;
		if (this.bloom) this.bloom.strength = isDark ? 0.36 : 0.2;
		this.requestRender();
	}

	setReducedMotion(reduced: boolean) {
		this.reducedMotion = reduced;
		if (this.controls) this.controls.enableDamping = !reduced;
		this.syncAnimation();
	}

	setVisible(visible: boolean) {
		this.isVisible = visible;
		this.syncAnimation();
	}

	activate(action: TableAction) {
		this.performAction(action);
		this.requestRender();
	}

	private material(color: THREE.ColorRepresentation, roughness = 0.7, metalness = 0) {
		return new THREE.MeshStandardMaterial({ color, roughness, metalness });
	}

	private mesh(
		geometry: THREE.BufferGeometry,
		material: THREE.Material,
		position: [number, number, number],
		parent: THREE.Object3D = this.group!,
	) {
		const object = new THREE.Mesh(geometry, material);
		object.position.set(...position);
		object.castShadow = true;
		object.receiveShadow = true;
		parent.add(object);
		return object;
	}

	private roundedBox(
		size: [number, number, number],
		position: [number, number, number],
		material: THREE.Material,
		radius = 0.05,
		parent: THREE.Object3D = this.group!,
	) {
		return this.mesh(new RoundedBoxGeometry(...size, 3, radius), material, position, parent);
	}

	private addLighting() {
		const hemisphere = new THREE.HemisphereLight(0xffedcf, 0x514035, this.currentTheme ? 0.7 : 1.35);
		this.scene!.add(hemisphere);

		const key = new THREE.DirectionalLight(0xffe6bc, this.currentTheme ? 2.5 : 3.6);
		key.position.set(-3, 8, 5);
		key.castShadow = true;
			key.shadow.mapSize.set(1024, 1024);
		key.shadow.camera.left = -7;
		key.shadow.camera.right = 7;
		key.shadow.camera.top = 7;
		key.shadow.camera.bottom = -7;
		key.shadow.normalBias = 0.035;
		key.shadow.bias = -0.0001;
		key.shadow.radius = 4;
		this.themeTransition = key;
		this.scene!.add(key);

		const rim = new THREE.DirectionalLight(0xe2bd83, 0.85);
		rim.position.set(4, 3, -5);
		this.scene!.add(rim);
	}

	private makeWoodTexture() {
		const canvas = document.createElement("canvas");
		canvas.width = 1024;
		canvas.height = 512;
		const context = canvas.getContext("2d")!;
		const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
		gradient.addColorStop(0, "#c18e5f");
		gradient.addColorStop(0.5, "#d6a875");
		gradient.addColorStop(1, "#bc8657");
		context.fillStyle = gradient;
		context.fillRect(0, 0, canvas.width, canvas.height);

		// Deterministic grain avoids visual changes whenever the component remounts.
		let seed = 83;
		const random = () => {
			seed = (seed * 16807) % 2147483647;
			return (seed - 1) / 2147483646;
		};
		for (let line = 0; line < 155; line++) {
			const y = random() * canvas.height;
			context.beginPath();
			context.moveTo(0, y);
			for (let x = 0; x <= canvas.width; x += 24) {
				const bend = Math.sin(x * 0.012 + line * 0.6) * (2 + random() * 5);
				context.lineTo(x, y + bend);
			}
			context.strokeStyle = `rgba(100, 57, 26, ${0.02 + random() * 0.075})`;
			context.lineWidth = 0.5 + random() * 1.4;
			context.stroke();
		}
		const texture = new THREE.CanvasTexture(canvas);
		texture.colorSpace = THREE.SRGBColorSpace;
		texture.anisotropy = this.renderer!.capabilities.getMaxAnisotropy();
		return texture;
	}

	private addTable() {
		const wood = this.makeWoodTexture();
		const woodMaterial = new THREE.MeshStandardMaterial({ map: wood, roughness: 0.7 });
		this.roundedBox([6.2, 0.28, 4.2], [0, 0, 0], woodMaterial, 0.13);

		const edgeMaterial = this.material(0x98663f, 0.82);
		this.roundedBox([5.7, 0.2, 3.76], [0, -0.21, 0], edgeMaterial, 0.065);
		const legMaterial = this.material(0x77503a, 0.8);
		for (const x of [-2.55, 2.55]) {
			for (const z of [-1.55, 1.55]) {
				const leg = this.mesh(new THREE.CylinderGeometry(0.12, 0.17, 1.8, 12), legMaterial, [x, -1.1, z]);
				leg.rotation.z = x > 0 ? -0.06 : 0.06;
			}
		}

		const placemat = this.material(0x8e5138, 0.97);
		this.roundedBox([2.05, 0.025, 1.8], [1.52, 0.17, 0.34], placemat, 0.07);
		const stitch = this.material(0xdbb78b, 0.85);
		for (let i = 0; i < 12; i++) {
			this.roundedBox([0.065, 0.012, 0.012], [0.72 + i * 0.14, 0.188, 1.15], stitch, 0.004);
		}

		const shadowCanvas = document.createElement("canvas");
		shadowCanvas.width = 128;
		shadowCanvas.height = 128;
		const ctx = shadowCanvas.getContext("2d")!;
		const gradient = ctx.createRadialGradient(64, 64, 8, 64, 64, 64);
		gradient.addColorStop(0, "rgba(53, 34, 22, 0.3)");
		gradient.addColorStop(0.65, "rgba(53, 34, 22, 0.11)");
		gradient.addColorStop(1, "rgba(53, 34, 22, 0)");
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, 128, 128);
		const shadowMaterial = new THREE.MeshBasicMaterial({
			map: new THREE.CanvasTexture(shadowCanvas),
			transparent: true,
			depthWrite: false,
		});
		const shadow = this.mesh(new THREE.PlaneGeometry(10, 8), shadowMaterial, [0, -2.07, 0]);
		shadow.rotation.x = -Math.PI / 2;
		shadow.castShadow = false;
	}

	private makeScreenTexture() {
		const canvas = document.createElement("canvas");
		canvas.width = 900;
		canvas.height = 580;
		const ctx = canvas.getContext("2d")!;
		ctx.fillStyle = "#302820";
		ctx.fillRect(0, 0, 900, 580);
		ctx.fillStyle = "#44382c";
		ctx.fillRect(0, 0, 900, 54);
		for (const [index, color] of ["#d08b5b", "#d8b45e", "#849977"].entries()) {
			ctx.beginPath();
			ctx.arc(34 + index * 29, 27, 7, 0, Math.PI * 2);
			ctx.fillStyle = color;
			ctx.fill();
		}
		ctx.font = "22px monospace";
		ctx.fillStyle = "#b4a28b";
		ctx.fillText("little-table.ts", 650, 36);
		const code = [
			["#bd9576", "const ", "#f2d2a5", "life ", "#bd9576", "= ", "#d4b96e", "await ", "#f2d2a5", "cook();"],
			["#7e7466", "// No bugs on an empty stomach."],
			["#bd9576", "function ", "#a9bc92", "makeSomethingLovely", "#f2d2a5", "() {"],
			["#f2d2a5", "  return {"],
			["#f2d2a5", "    code: ", "#d4a879", "'a little',"],
			["#f2d2a5", "    tea: ", "#d4a879", "'a lot',"],
			["#f2d2a5", "  };"],
			["#f2d2a5", "}"],
		];
		code.forEach((line, row) => {
			let x = 54;
			for (let index = 0; index < line.length; index += 2) {
				ctx.font = "25px monospace";
				ctx.fillStyle = line[index];
				ctx.fillText(line[index + 1], x, 115 + row * 53);
				x += ctx.measureText(line[index + 1]).width;
			}
		});
		ctx.fillStyle = "#e9bb72";
		ctx.fillRect(55, 519, 11, 26);
		const texture = new THREE.CanvasTexture(canvas);
		texture.colorSpace = THREE.SRGBColorSpace;
		return texture;
	}

	private addNotebook() {
		const aluminum = this.material(0xafa397, 0.37, 0.62);
		const dark = this.material(0x342d27, 0.72);
		this.roundedBox([2.55, 0.1, 1.75], [-0.63, 0.22, -0.36], aluminum, 0.075);
		this.roundedBox([2.36, 0.025, 1.5], [-0.63, 0.28, -0.38], dark, 0.04);
		const keyboardMaterial = this.material(0x61544a, 0.58);
		for (let row = 0; row < 5; row++) {
			for (let col = 0; col < 12; col++) {
				const key = this.roundedBox(
					[0.135, 0.025, 0.14],
					[-1.65 + col * 0.186, 0.31, -0.93 + row * 0.19],
					keyboardMaterial,
					0.015,
				);
				this.keys.push(key);
			}
		}
		this.roundedBox([0.72, 0.008, 0.38], [-0.63, 0.3, 0.18], aluminum, 0.04);

		const screen = new THREE.Group();
		screen.position.set(-0.63, 0.27, -1.18);
		screen.rotation.x = -0.17;
		this.group!.add(screen);
		this.roundedBox([2.55, 1.67, 0.1], [0, 0.8, 0], aluminum, 0.08, screen);
		this.roundedBox([2.4, 1.52, 0.018], [0, 0.8, 0.056], dark, 0.05, screen);
		this.screenGlow = new THREE.MeshStandardMaterial({
			map: this.makeScreenTexture(),
			roughness: 0.4,
			emissive: 0xffffff,
			emissiveMap: this.makeScreenTexture(),
			emissiveIntensity: 0.36,
		});
		const display = this.mesh(new THREE.PlaneGeometry(2.25, 1.43), this.screenGlow, [0, 0.8, 0.069], screen);
		display.userData.action = "code" satisfies TableAction;
		this.interactiveMeshes.push(display);
	}

	private addTea() {
		const ceramic = this.material(0xf2e1bf, 0.26);
		const teaMaterial = new THREE.MeshPhysicalMaterial({
			color: 0x794226,
			roughness: 0.18,
			metalness: 0.04,
			clearcoat: 1,
			clearcoatRoughness: 0.15,
		});
		const cup = new THREE.Group();
		cup.position.set(1.65, 0.19, 0.35);
		this.group!.add(cup);
		const body = this.mesh(new THREE.CylinderGeometry(0.32, 0.25, 0.55, 40, 1, true), ceramic, [0, 0.28, 0], cup);
		body.material.side = THREE.DoubleSide;
		this.mesh(new THREE.TorusGeometry(0.316, 0.033, 10, 40), ceramic, [0, 0.555, 0], cup).rotation.x = Math.PI / 2;
		this.mesh(new THREE.CylinderGeometry(0.281, 0.281, 0.014, 40), teaMaterial, [0, 0.531, 0], cup);
		this.mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.055, 32), ceramic, [0, 0.03, 0], cup);
		const handle = this.mesh(new THREE.TorusGeometry(0.17, 0.045, 10, 28), ceramic, [0.33, 0.3, 0], cup);
		handle.scale.x = 0.75;
		const spoon = this.mesh(new THREE.CapsuleGeometry(0.027, 0.48, 4, 8), this.material(0xc2b6a4, 0.2, 0.85), [2.16, 0.22, 0.34]);
		spoon.rotation.x = Math.PI / 2;
		spoon.rotation.z = -0.2;
		const spoonBowl = this.mesh(new THREE.SphereGeometry(0.065, 16, 12), this.material(0xc2b6a4, 0.2, 0.85), [2.2, 0.23, 0.64]);
		spoonBowl.scale.set(0.8, 0.25, 1.35);

		const hitArea = this.mesh(new THREE.CylinderGeometry(0.68, 0.68, 1.1, 16), new THREE.MeshBasicMaterial({ visible: false }), [0, 0.4, 0.16], cup);
		hitArea.userData.action = "tea" satisfies TableAction;
		this.interactiveMeshes.push(hitArea);
	}

	private addLamp() {
		const brass = this.material(0x9c713d, 0.36, 0.58);
		const linen = new THREE.MeshStandardMaterial({
			color: 0xf5cb83,
			roughness: 0.95,
			side: THREE.DoubleSide,
			emissive: 0xffa637,
			emissiveIntensity: 0.18,
		});
		const x = 2.06;
		const z = -1.18;
		this.mesh(new THREE.CylinderGeometry(0.31, 0.37, 0.08, 32), brass, [x, 0.22, z]);
		this.mesh(new THREE.CylinderGeometry(0.035, 0.05, 1.05, 12), brass, [x, 0.75, z]);
		this.mesh(new THREE.CylinderGeometry(0.18, 0.43, 0.56, 40, 1, true), linen, [x, 1.37, z]);
		this.mesh(new THREE.TorusGeometry(0.43, 0.018, 6, 40), brass, [x, 1.09, z]).rotation.x = Math.PI / 2;
		this.mesh(new THREE.TorusGeometry(0.18, 0.015, 6, 32), brass, [x, 1.65, z]).rotation.x = Math.PI / 2;
		const bulbMaterial = new THREE.MeshStandardMaterial({
			color: 0xffd69b,
			emissive: 0xffad4b,
			emissiveIntensity: 3,
		});
		this.lampGlow = bulbMaterial;
		this.mesh(new THREE.SphereGeometry(0.095, 20, 16), bulbMaterial, [x, 1.28, z]);
		this.warmLight = new THREE.PointLight(0xffb65b, 4, 5.5, 1.8);
		this.warmLight.position.set(x, 1.25, z + 0.1);
		this.group!.add(this.warmLight);

		const hitArea = this.mesh(new THREE.CylinderGeometry(0.55, 0.55, 1.8, 12), new THREE.MeshBasicMaterial({ visible: false }), [x, 0.9, z]);
		hitArea.userData.action = "lamp" satisfies TableAction;
		this.interactiveMeshes.push(hitArea);
	}

	private addBook() {
		const cover = this.material(0x6c7660, 0.92);
		const pages = this.material(0xeee0bd, 0.95);
		const book = new THREE.Group();
		book.position.set(-2.22, 0.21, 0.85);
		book.rotation.y = 0.22;
		this.group!.add(book);
		this.roundedBox([1.1, 0.075, 1.38], [0, 0, 0], cover, 0.03, book);
		this.roundedBox([1.02, 0.15, 1.27], [0, 0.1, 0], pages, 0.02, book);
		this.roundedBox([1.1, 0.045, 1.38], [0, 0.2, 0], cover, 0.03, book);
		this.roundedBox([0.065, 0.008, 0.65], [-0.23, 0.227, 0], pages, 0.01, book);
		const ribbon = this.material(0xc8804d, 0.8);
		this.roundedBox([0.075, 0.008, 0.35], [0.3, 0.223, 0.63], ribbon, 0.005, book);
	}

	private addSteam() {
		for (let index = 0; index < 14; index++) {
			const material = new THREE.MeshBasicMaterial({
				color: 0xfff1d5,
				transparent: true,
				opacity: 0.22,
				depthWrite: false,
			});
			const particle = this.mesh(new THREE.SphereGeometry(0.045, 8, 8), material, [1.65, 0.82, 0.35]);
			particle.castShadow = false;
			particle.receiveShadow = false;
			particle.userData.offset = index / 14;
			this.steam.push(particle);
		}
	}

	private onPointerDown(event: PointerEvent) {
		this.pointerDown.set(event.clientX, event.clientY);
	}

	private onPointerUp(event: PointerEvent) {
		if (event.button !== 0 || this.pointerDown.distanceTo(new THREE.Vector2(event.clientX, event.clientY)) > 7) return;
		const action = this.pickAction(event);
		if (action) {
			this.performAction(action);
			return;
		}
		if (this.isNearCup(event)) this.performAction("tea");
	}

	private onPointerMove(event: PointerEvent) {
		if (event.pointerType === "touch") return;
		this.canvas.style.cursor = this.pickAction(event) || this.isNearCup(event) ? "pointer" : "grab";
	}

	private isNearCup(event: PointerEvent) {
		if (!this.camera) return false;
		const rect = this.canvas.getBoundingClientRect();
		const cupCenter = new THREE.Vector3(1.65, 0.6, 0.35).project(this.camera);
		const cupX = rect.left + (cupCenter.x + 1) * rect.width / 2;
		const cupY = rect.top + (1 - cupCenter.y) * rect.height / 2;
		return Math.hypot(event.clientX - cupX, event.clientY - cupY) < 48;
	}

	private pickAction(event: PointerEvent): TableAction | undefined {
		if (!this.camera) return undefined;
		const rect = this.canvas.getBoundingClientRect();
		this.pointer.set(
			((event.clientX - rect.left) / rect.width) * 2 - 1,
			-((event.clientY - rect.top) / rect.height) * 2 + 1,
		);
		this.raycaster.setFromCamera(this.pointer, this.camera);
		return this.raycaster.intersectObjects(this.interactiveMeshes, false)[0]?.object.userData.action;
	}

	private performAction(action: TableAction) {
		this.actionPulse = 1;
		if (action === "lamp") this.lampOn = !this.lampOn;
		if (action === "code") this.codeBoost = 1;
		this.options.onAction(action);
		this.requestRender();
	}

	private resize() {
		if (!this.renderer || !this.camera || !this.composer) return;
		const parent = this.canvas.parentElement!;
		const width = parent.clientWidth;
		const height = parent.clientHeight;
		if (!width || !height) return;
		this.renderer.setSize(width, height, false);
		this.composer.setSize(width, height);
		this.camera.aspect = width / height;
		this.camera.fov = parent.clientWidth < 500 ? 43 : 32;
		this.camera.updateProjectionMatrix();
		this.requestRender();
	}

	private syncAnimation() {
		const shouldAnimate = !this.reducedMotion && this.isVisible && this.isDocumentVisible && !this.disposed;
		cancelAnimationFrame(this.animationFrame);
		this.animationFrame = 0;
		if (shouldAnimate) this.renderFrame();
		else this.requestRender();
	}

	private requestRender() {
		if (this.disposed || this.animationFrame) return;
		this.animationFrame = requestAnimationFrame(() => {
			this.animationFrame = 0;
			this.renderFrame();
		});
	}

	private renderFrame = () => {
		if (this.disposed || !this.renderer || !this.composer || !this.controls) return;
		const time = this.sceneTime.getElapsedTime();
		const delta = Math.min(this.sceneTime.getDelta(), 0.05);
		const blend = this.reducedMotion ? 1 : 1 - Math.exp(-delta * 5);
		if (this.themeTransition) {
			this.themeTransition.color.lerp(this.currentTheme ? this.nightKeyColor : this.dayKeyColor, blend);
			this.themeTransition.intensity = THREE.MathUtils.lerp(this.themeTransition.intensity, this.currentTheme ? 2.5 : 3.6, blend);
		}
		if (this.warmLight) this.warmLight.intensity = THREE.MathUtils.lerp(this.warmLight.intensity, this.lampOn ? 4 : 0, blend);
		if (this.lampGlow) this.lampGlow.emissiveIntensity = THREE.MathUtils.lerp(this.lampGlow.emissiveIntensity, this.lampOn ? 3 : 0, blend);
		if (!this.reducedMotion) {
			this.steam.forEach((particle, index) => {
				const progress = (time * 0.16 + particle.userData.offset) % 1;
				particle.position.set(
					1.65 + Math.sin(progress * 7 + index) * 0.095 * progress,
					0.78 + progress * 1.13,
					0.35 + Math.cos(progress * 5 + index) * 0.055 * progress,
				);
				particle.scale.setScalar(0.3 + progress * 1.5);
				(particle.material as THREE.MeshBasicMaterial).opacity = Math.sin(progress * Math.PI) * 0.24;
			});
			this.actionPulse = Math.max(0, this.actionPulse - delta * 0.7);
			this.codeBoost = Math.max(0, this.codeBoost - delta * 0.23);
			if (this.screenGlow) this.screenGlow.emissiveIntensity = 0.36 + this.codeBoost * 0.8;
			this.keys.forEach((key, index) => {
				const wave = Math.max(0, Math.sin(time * 2.2 - index * 0.17));
				key.position.y = 0.31 + wave * this.codeBoost * 0.035;
			});
			if (!this.hasInteracted && this.group) {
				this.group.rotation.y = THREE.MathUtils.lerp(this.group.rotation.y, Math.sin(time * 0.13) * 0.035, 0.03);
			}
		} else {
			this.steam.forEach((particle, index) => {
				const progress = (index + 1) / (this.steam.length + 1);
				particle.position.set(1.65 + Math.sin(index) * 0.07, 0.82 + progress * 0.85, 0.35);
				particle.scale.setScalar(0.5 + progress);
				(particle.material as THREE.MeshBasicMaterial).opacity = 0.1;
			});
			if (this.screenGlow) this.screenGlow.emissiveIntensity = 0.36 + this.codeBoost * 0.8;
			}
			this.renderer.shadowMap.needsUpdate = true;
			this.controls.update();
		this.composer.render();
		if (!this.reducedMotion && this.isVisible && this.isDocumentVisible) {
			this.animationFrame = requestAnimationFrame(this.renderFrame);
		}
	};

	dispose() {
		this.disposed = true;
		cancelAnimationFrame(this.animationFrame);
		this.resizeObserver?.disconnect();
		document.removeEventListener("visibilitychange", this.onVisibilityBound);
		this.canvas.removeEventListener("pointermove", this.onPointerMoveBound);
		this.canvas.removeEventListener("pointerdown", this.onPointerDownBound);
		this.canvas.removeEventListener("pointerup", this.onPointerUpBound);
		this.canvas.removeEventListener("webglcontextlost", this.onContextLostBound);
		this.controls?.dispose();
		const materials = new Set<THREE.Material>();
		const textures = new Set<THREE.Texture>();
		this.scene?.traverse((object) => {
			if (!(object instanceof THREE.Mesh)) return;
			object.geometry.dispose();
			const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
			objectMaterials.forEach((material) => materials.add(material));
		});
		materials.forEach((material) => {
			Object.values(material).forEach((value) => {
				if (value instanceof THREE.Texture) textures.add(value);
			});
			material.dispose();
		});
		textures.forEach((texture) => texture.dispose());
		this.scene?.environment?.dispose();
		this.composer?.dispose();
		this.renderer?.dispose();
	}
}
