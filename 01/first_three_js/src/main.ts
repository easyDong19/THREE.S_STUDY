import './style.css';
import * as THREE from 'three';

class App {
  private renderer: THREE.WebGLRenderer;
  private domApp: Element;
  private scene: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private cube?: THREE.Mesh;
  constructor() {
    console.log('hello three.js');
    // 안티엘리어싱 사용
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // 현재 모니터의 픽셀 비율을 얻는 코드
    // 2보다 작게 해도 사람의 눈으로 구분하기 어렵고, 연산량만 잡아먹음
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

    // Null이 절대로 아니어야 함
    this.domApp = document.querySelector('#app')!;
    // canvas 객체 타입의 domElement
    this.domApp.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    // 카메라, 광원, 모델 관련 메서드 정의
    this.setupCamera();
    this.setupLight();
    this.setupModels();

    // 이벤트 메서드 정의
    this.setupEvents();
  }
  private setupCamera() {
    const width = this.domApp.clientWidth;
    const height = this.domApp.clientHeight;

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    this.camera.position.z = 2;
  }
  private setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);

    this.scene.add(light);
  }
  private setupModels() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  private setupEvents() {
    // 윈도우 사이즈가 변경되면 이벤트 호출
    window.onresize = this.resize.bind(this);
    this.resize();
    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  private resize() {
    const width = this.domApp.clientWidth;
    const height = this.domApp.clientHeight;

    const camera = this.camera;
    if (camera) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    this.renderer.setSize(width, height);
  }

  private update(time: number) {
    time *= 0.001;

    const cube = this.cube;
    if (cube) {
      cube.rotation.x = time;
      cube.rotation.y = time;
    }
  }

  private render(time: number) {
    this.update(time);
    this.renderer.render(this.scene, this.camera!);
  }
}

new App();
