var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xB7B7B7);

var geometry = new THREE.PlaneGeometry(5, 7);
var material = new THREE.MeshPhongMaterial({color:0xeeeeee,side:THREE.DoubleSide});
var planes = [];

var directionalLight = new THREE.DirectionalLight( 15953704, 1.5 );
directionalLight.position.set( 0, 1, 0 );
scene.add( directionalLight );

var directionalLight2 = new THREE.DirectionalLight( 15953704, 0.5 );
directionalLight2.position.set( 1, 1, 1 );
scene.add( directionalLight2 );

var light = new THREE.PointLight(15953704,2.8,140);
//light.position.set(0,0,100);
//scene.add(light);

THREE.Mesh.prototype.move = function(){
  this.position.x += this.xSpeed;
  this.position.y += this.ySpeed;
  //this.rotation.y += this.yRotation;
};

function getPlane() {
  var plane = new THREE.Mesh(geometry, material);
  plane.xSpeed = Math.random();
  plane.ySpeed = Math.random();
  plane.rotation.x = Math.random()*5.5;
  plane.rotation.y = Math.random()*5.5;
  plane.position.set(
    (Math.random() - 1) * 150 ,
    (Math.random() - 1) * 90,
    (Math.random() - 1) * 90
  );
  return plane
}
for (var i = 0; i < 155; i++) {
  var plane = getPlane();
  scene.add(plane);
  planes.push(plane);
}


camera.position.z = 100;

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  for (var i = 0; i < planes.length; i++) {
    planes[i].move();
  }
}

render();
