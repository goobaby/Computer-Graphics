import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()


const loader = new GLTFLoader()




const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('./assests/globe/basic.jpg')
        //map: new THREE.TextureLoader().load('./assests/lasagna/textures/Lasagna_baseColor.png')
        
    })
)

scene.add(sphere)

// loader.load('assests/burger.glb', function(glb){
//     console.log(glb)
//     const root = glb.scene;
//     root.scale.set(0.1, 0.1, 0.1)

//     scene.add(root);
// }, function(xhr){
//     console.log((xhr.loaded/xhr.total * 100) + "% loaded")
// }, function(error){
//     console.log('An error occured')
// })

loader.load('assests/garfield/scene.gltf', function(gltf){
    console.log(gltf)
    const garf = gltf.scene;
    garf.scale.set(1, 1, 1)
    garf.rotation.y = 10
    garf.position.set(-2,-10,-10)
    scene.add(garf);
}, function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + "% loaded")
}, function(error){
    console.log('An error occured')
})

// loader.load('assests/eldgarf/scene.gltf', function(gltf){
//     console.log(gltf)
//     const eldgarf = gltf.scene;
//     eldgarf.scale.set(0.1, 0.1, 0.1)
//     eldgarf.rotation.y = 360
//     eldgarf.position.set(-1,.5,.1)
//     scene.add(eldgarf);
// }, function(xhr){
//     console.log((xhr.loaded/xhr.total * 100) + "% loaded")
// }, function(error){
//     console.log('An error occured')
// })





// const light = new THREE.DirectionalLight(0xffffff, 1)
// light.position.set(2,2,5)
// scene.add(light)


// const geometry = new THREE.BoxGeometry(1,1,1)
// const material = new THREE.MeshBasicMaterial({
//     color: 'red'
// })
// const boxMesh = new THREE.Mesh(geometry, material)
// scene.add(boxMesh)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(150, sizes.width / sizes.height, 0.1, 100000000)
camera.position.set(0,0,15)

const controls = new OrbitControls(camera, canvas)
controls.enableZoom = true;
controls.enableDamping = true


scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
//renderer.outputEncoding.enabled = true
renderer.render(scene, camera)

function animate(){
    requestAnimationFrame(animate);

    sphere.rotation.y += 0.01

    renderer.render(scene, camera);
}
animate()