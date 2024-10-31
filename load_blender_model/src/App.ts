import * as THREE from 'three';
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';

export default class App {
  private _divContainer: Element;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;

  constructor() {
    this._divContainer = document.querySelector('#app')!;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(new THREE.Color('#2c3e50'), 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.toneMappingExposure = 0.5;

    this._divContainer?.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    this._setupCamera();
    this._setupLight();
    this._setupControls();
    this._setupModel();
    this._setupEvent();
  }

  private _setupCamera() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 5);
    camera.position.set(0, 1, 1.3);
    this.camera = camera;
  }

  private _setupLight() {
    const lights = [];
    for (let i = 0; i < 3; i++) {
      lights[i] = new THREE.DirectionalLight(0xffffff, 3);
      this.scene.add(lights[i]);
    }

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);
  }

  private _setupControls() {
    new OrbitControls(this.camera!, this._divContainer! as HTMLElement);
  }

  private _setupModel() {
    const loader = new GLTFLoader();
    loader.load('./realistic_human_heart.glb', (gltf) => {
      this.scene.add(gltf.scene);
    });
  }

  private _setupEvent() {
    window.onresize = this.resize.bind(this);
    this.resize();
    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  private render(time: number) {
    this.update(time);
    this.renderer.render(this.scene, this.camera!);
  }

  private update(time: number) {
    time *= 0.001;
  }

  private resize() {
    const domApp = this._divContainer;
    const width = domApp.clientWidth;
    const height = domApp.clientHeight;

    const camera = this.camera;
    if (camera) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    this.renderer.setSize(width, height);
  }
}
