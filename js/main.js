
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight, false);
document.body.appendChild(renderer.domElement);

renderer.setClearColor(0x8B837E, 1);

function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const light = new THREE.AmbientLight(0xffffff); 
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.castShadow = true
scene.add(directionalLight)
directionalLight.position.set(0, 1, 1)

const loader = new THREE.GLTFLoader();

class Hand {
	constructor() {
		loader.load("../models/arm/scene.gltf", (gltf) => {
			scene.add(gltf.scene);
			gltf.scene.scale.set(0.03, 0.03, 0.03);
			gltf.scene.position.set(1.1, -1, 3.7);
			gltf.scene.rotation.y = -3.1;
			this.hand = gltf.scene;
		})
	}
}
 const hand = new Hand();

 class Vr {
	constructor() {
		loader.load("../models/vr/scene.gltf", (gltf) => {
			gltf.scene.scale.set(0.4, 0.4, 0.4);
			gltf.scene.position.set(0.011, 0.3, 3.6);
			gltf.scene.rotation.y = -1;
			scene.add(gltf.scene);
			this.vr = gltf.scene;

			this.vrInfo= {
				positionZ: 3.6,
				velocity: 0
			}
		})
	}
		run(){
			this.vrInfo.velocity = 0.05;
		}

		updateVR(){
			this.vrInfo.positionZ += this.vrInfo.velocity;
			this.vr.position.z = this.vrInfo.positionZ; 
		}
	
}
const vr = new Vr();

camera.position.z = 5;

async function animate() {
	requestAnimationFrame(animate);

	
	vr.updateVR();

	renderer.render(scene, camera);
};

animate();





window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener("wheel", ()=>{
	vr.run();
})