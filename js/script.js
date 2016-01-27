var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    75,           // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    1,            // Near clipping plane
    10000         // Far clipping plane
);
// Distance camera from the center of the scene.
camera.position.z = 4;

// Rotate
camera.rotation.x = 0.4;
const planeMaterial = new THREE.MeshPhongMaterial({
    specular: 0xfb8717,         // Specular color of the material (light)
    color: 0xFF4E50,            // Geometry color in hexadecimal
    emissive: 0xFF4E50,         // Emissive color of the material (dark)
    shininess: 30,              // How shiny the specular highlight is
    shading: THREE.FlatShading  // NoShading, FlatShading or SmoothShading
});
const planeGeometry = new THREE.PlaneGeometry(30, 60, 60, 120);
planeGeometry.vertices.map(function (vertex) {
    vertex.x += -.5 + Math.random() / 10;
    vertex.y += -.5 + Math.random() / 10;
    vertex.z = -.5 + Math.random() / 5;
    return vertex;
});

// Update geometry.
planeGeometry.computeFaceNormals();
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

// Create a wireframe
const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0xFF4E50,
    wireframe: true
});
const wireframe = new THREE.Mesh(planeGeometry, wireframeMaterial);
scene.add(wireframe);
scene.add(plane);

var light = new THREE.DirectionalLight(0xffffff, 0.3);
light.position.set(1, 1, 1);
scene.add(light);

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


function render() {
    requestAnimationFrame(render);
    light.position.x = -1 + (mouseX / window.innerWidth) * 2;
    light.position.y = 1 - (mouseY / window.innerHeight) * 2;
    renderer.render(scene, camera);
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);
render();
var mouseX = 0;
var mouseY = 0;
function onMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}
window.addEventListener('mousemove', onMouseMove, false);