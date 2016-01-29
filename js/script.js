const planeMaterial = new THREE.MeshPhongMaterial({
    specular: 0x454237,         // Specular color of the material (light)
    color: 0x1D242A,            // Geometry color in hexadecimal
    shininess: 5,              // How shiny the specular highlight is
    side: THREE.DoubleSide,
    shading: THREE.FlatShading,  // NoShading, FlatShading or SmoothShading
    metal: true
});
var backgroundMaterial = new THREE.MeshPhongMaterial({
    specular: 0x76A1B8,         // Specular color of the material (light)
    color: 0x618898,            // Geometry color in hexadecimal
    side: THREE.FrontSide,
    shininess: 1,
    shading: THREE.FlatShading  // NoShading, FlatShading or SmoothShading
});

var mouseX = 0;
var mouseY = 0;

var scene = new THREE.Scene();
var bgScene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.05, 20);
var bgCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.05, 20);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.autoClear = false;

document.getElementById('container').appendChild(renderer.domElement);

camera.position.set(2, 0.6, -0.6);
camera.rotation.set(-2.4, 1.2, 2.4);
bgCamera.position.set(1, 0, 0);
bgCamera.rotation.set(0,1.5,0);


// Lights
var light = new THREE.PointLight(0xffffff, 1.2, 100);
light.position.set(6, 5, 5.5);
scene.add(light);

var light2 = new THREE.PointLight(0xffffff, 0.3, 100);
light2.position.set(3, 2, -2.5);
scene.add(light2);

var bgLight = new THREE.PointLight(0xffffff, 1.1, 100);
bgLight.position.set(3, 2, -2.5);
bgScene.add(bgLight);


var g = new THREE.PlaneGeometry(25, 25, 60, 60);
g.vertices.map(function (vertex) {
    vertex.x += -1 + Math.random() / 5;
    vertex.y += -1 + Math.random() / 5;
    vertex.z = -.5 + Math.random() / 5;
    return vertex;
});
var plane = new THREE.Mesh(g, backgroundMaterial);
plane.position.set(-5, 0, 0);
plane.rotation.y = Math.PI / 2;
bgScene.add(plane);
var loader = new THREE.JSONLoader();
loader.load('models/loHrib.json', function (geometry) {
    var mesh = new THREE.Mesh(geometry, planeMaterial);
    mesh.position.y = -0.3;
    scene.add(mesh);
});

function render() {
    requestAnimationFrame(render);
    bgCamera.position.z = -0.5 + mouseX/window.innerWidth;
    bgCamera.position.y = -0.5 + mouseY/window.innerHeight;
    renderer.render(bgScene, bgCamera);
    renderer.render(scene,camera);
}
render();
document.addEventListener('mousemove', function(event){
    mouseX = event.clientX;
    mouseY = event.clientY;
});