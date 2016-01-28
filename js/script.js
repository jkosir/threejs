const planeMaterial = new THREE.MeshPhongMaterial({
    specular: 0xF8D4B0,         // Specular color of the material (light)
    color: 0x2B2F3B,            // Geometry color in hexadecimal
    emissive: 0x111111,         // Emissive color of the material (dark)
    shininess: 5,              // How shiny the specular highlight is
    side: THREE.DoubleSide,
    shading: THREE.FlatShading  // NoShading, FlatShading or SmoothShading
});
var scene, camera, renderer;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.01;

function init() {
    scene = new THREE.Scene();

    initMesh();
    initCamera();
    initLights();
    initRenderer();
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;

    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(0,0,2.5);
    camera.lookAt(scene.position);
}


function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
}

function initLights() {
    var light = new THREE.PointLight( 0xffffff, 1.2, 100 );
    light.position.set( 0,0,3 );
    scene.add( light );

}

var mesh = null;
function initMesh() {
    var loader = new THREE.JSONLoader();
    loader.load('models/untitled7.json', function(geometry) {
        mesh = new THREE.Mesh(geometry, planeMaterial);
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.75;
        mesh.translation = THREE.GeometryUtils.center(geometry);
        scene.add(mesh);
    });
}


function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

init();
render();
