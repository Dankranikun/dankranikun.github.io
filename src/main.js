import './style.css'
import * as THREE from 'three';

// Escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Plano para el mapa (textura temporal)
const geometry = new THREE.PlaneGeometry(50, 50);
const material = new THREE.MeshBasicMaterial({ color: 0x228B22, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = Math.PI / 2;
scene.add(plane);

// Cámara inicial
camera.position.set(0, 20, 20);
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();