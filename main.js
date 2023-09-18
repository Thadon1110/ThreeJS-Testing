import './style.css';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const globeTexture = new THREE.TextureLoader().load('./globe.jpg');

const geometry = new THREE.SphereGeometry(3, 32, 32);
const material = new THREE.MeshStandardMaterial({ map: globeTexture });
const globe = new THREE.Mesh(geometry, material);

scene.add(globe);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	const star = new THREE.Mesh(geometry, material);

	const [x, y, z] = Array(3)
		.fill()
		.map(() => THREE.MathUtils.randFloatSpread(100));

	star.position.set(x, y, z);
	scene.add(star);
}

Array(200).fill().forEach(addStar);

// const spaceTexture = new THREE.TextureLoader().load('space1.jpg');
const loader = new THREE.CubeTextureLoader();
loader.setPath('');

const spaceTexture = loader.load(['./space1.jpg', './space1.jpg', './space1.jpg', './space1.jpg', './space1.jpg', './space1.jpg']);
scene.background = spaceTexture;

function animate() {
	requestAnimationFrame(animate);

	// globe.rotation.x += 0.01;
	globe.rotation.y += 0.001;
	// globe.rotation.z += 0.001;

	controls.update();

	renderer.render(scene, camera);
}

animate();
