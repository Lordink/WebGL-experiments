var WIDTH = window.innerWidth / 2,
   HEIGHT = window.innerHeight;

var mouse = 
{
	down: false,
	prevY: 0,
	prevX: 0
}

var MouseSens = 0.005;

var Cube = null;

var Renderer = null;
var Scene = null;
var Camera = null;

var diffuse_texture = null;

$(function(){
	var VIEW_ANGLE = 50,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 0.1,
	FAR = 100000;
	
	var $container = $('#container');
	
	//Create cam, renderer and scene
	Renderer = new THREE.WebGLRenderer({antialias:true});
	Camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
	Scene = new THREE.Scene();
	Camera.position.z = 50;
	
	
	Renderer.setSize(WIDTH, HEIGHT); //Start renderer
	
	$container.append(Renderer.domElement);
	

	var dl_intensity = 0.4;
	var dirlight = new THREE.DirectionalLight(0xFFFFFF, dl_intensity);
	dirlight.position.set(1,1,0);
	/*
    var pointLight = new THREE.PointLight( 0xFFFFFF );
	// set its position
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;
	Scene.add(pointLight);
	*/
	texture = "../Ruins Map/Media/SquaredConcrete1.jpg";
	
	
	BasicUniforms = { 
		texture: { type: "t", value: THREE.ImageUtils.loadTexture(diffuse_texture) },
		u_DirLightColor: { type: "v3", value: new THREE.Vector3(dirlight.color.r, dirlight.color.g, dirlight.color.b) },
		u_AmbientLightColor: { type: "v3", value: new THREE.Vector3(0, 1, 0) },
		u_DirLightIntensity: { type: "f", value: dl_intensity},
		u_DirLightDirection:{ type: "v3", value: new THREE.Vector3(1,0,0) },
	};
	
	
	var BasicLight = new THREE.ShaderMaterial({
		uniforms: BasicUniforms,
		vertexShader: $('#shader-vs')[0].textContent,
		fragmentShader: $('#shader-fs')[0].textContent,
		transparent: false
	});
	
	// add to the scene
    Scene.add(dirlight);
	
	
	Cube = new THREE.Mesh
	(
	new THREE.CubeGeometry(10, 10, 10, 1,1,1),
	//BasicLight
	new THREE.MeshLambertMaterial({ color: 0xFF00F0 })
	);
	
	Scene.add(Cube);
	
	Update();
});

function Update(){
	Renderer.setClearColorHex(0xffffff, 1.0);
	Renderer.clear(true);
	
	Cube.rotation.y += 0.01;
	Cube.rotation.x += 0.01;
	Cube.rotation.z += 0.01;
	
	Renderer.render(Scene, Camera);
	requestAnimationFrame(Update)
}
