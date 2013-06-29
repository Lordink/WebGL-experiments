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
	

	
	var pointLight = new THREE.PointLight( 0xFFFFFF );
	
	// set its position
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;
	
	texture = "../Ruins Map/Media/SquaredConcrete1.jpg";
	
	BasicUniforms = { //U SHUD REWRITE ALL TIS SHIT
		texture: { type: "t", value: THREE.ImageUtils.loadTexture(diffuse_texture) },
		
		u_DirLightColor: { type: "v3", value: new THREE.Vector3(1,1,0) },
		u_AmbientLightColor: { type: "v3", value: new THREE.Vector3(0, 1, 0) },
		u_DirLightIntensity: { type: "f", value: this.DirLight.intensity},
		u_DirLightDirection:{ type: "v3", value: Lightdir_XZYtoXYZ(this.DirLight.position) }, //Might not work
		
		u_SpotLightDirection: {type: "v3", value: this.SpotLightDirection },
		u_SpotLightPosition: { type: "v3", value: new THREE.Vector3(this.SpotLight.position.x, this.SpotLight.position.y, this.SpotLight.position.z) },
		u_SpotLightColor: { type: "v3", value: new THREE.Vector3(this.SpotLight.color.r, this.SpotLight.color.g, this.SpotLight.color.b) },
		u_SpotLightExp: { type: "f", value: this.SpotLight.exponent},
		u_SpotLightAngle: { type: "f", value: this.SpotLight.angle},
		u_SpotLightDistance: { type: "f", value: this.SpotLight.distance },
		
		fogColor:{ type: "v3", value: new THREE.Vector3(this.Scene.fog.color.r, this.Scene.fog.color.g, this.Scene.fog.color.b) },
		fogNear:{ type: "f", value: this.Scene.fog.near },
		fogFar:{ type: "f", value: this.Scene.fog.far },
	};
	
	
	var BasicLight = new THREE.ShaderMaterial({
		uniforms: BasicUniforms,
		vertexShader: $('#shader-vs')[0].textContent,
		fragmentShader: $('#shader-fs')[0].textContent,
		transparent: false
	});
	
	// add to the scene
	Scene.add(pointLight);
	
	
	Cube = new THREE.Mesh
	(
	new THREE.CubeGeometry(10, 10, 10, 1,1,1),
	BasicLight
	);
	
	Scene.add(Cube);
	
	Update();
});

function Update(){
	Renderer.setClearColorHex(0x000000, 1.0);
	Renderer.clear(true);
	
	Cube.rotation.x += 0.01;
	
	Renderer.render(Scene, Camera);
	requestAnimationFrame(Update)
}
