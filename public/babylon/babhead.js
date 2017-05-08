
  // Get the canvas element from our HTML above
  var canvas = document.getElementById("renderCanvas");

  // Load the BABYLON 3D engine
  var engine = new BABYLON.Engine(canvas, true);

  // Now create a basic Babylon Scene object 
var scene = new BABYLON.Scene(engine);
var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
	
var shadowGenerator = new BABYLON.ShadowGenerator(2048, light);
// This begins the creation of a function that we will 'call' just after it's built
  var createScene = function () {
    // Now create a basic Babylon Scene object 
    //var scene = new BABYLON.Scene(engine);
    // Change the scene background color to green.
    scene.clearColor = new BABYLON.Color3(0.2, 0.2, 0.5);
    /*
    // This creates and positions a free camera
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 6, -12), scene);
//var camera = new BABYLON.TouchCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, false);
*/
// NEW CAMERA
	var camera = new BABYLON.ArcRotateCamera("Camera", 1, 2.8, 45, BABYLON.Vector3.Zero(), scene);
	camera.lowerBetaLimit = 0.1;
	camera.upperBetaLimit = (Math.PI / 2) * 0.9;
	camera.lowerRadiusLimit = 30;
	camera.upperRadiusLimit = 150;
	camera.attachControl(canvas, true);
    // This creates a light, aiming 0,1,0 - to the sky.
    // light1
	light.position = new BABYLON.Vector3(20, 40, 20);
	light.intensity = 0.8;

    
    shadowGenerator.blurScale = 8;
   // shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.usePoissonSampling = true;
    
// Objects
    // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;
    shadowGenerator.getShadowMap().renderList.push(sphere);

//JOHANS  
  makeBoxesGrid();

    // Let's try our built-in 'ground' shape.  Params: name, width, depth, subdivisions, scene
    var ground = BABYLON.Mesh.CreateGround("ground1", 16, 16, 2, scene);
    ground.receiveShadows = true;

    
    // Leave this function
    return scene;

  };  // End of createScene function

  /*
a Babylon Scene object
a camera that has been attached
a light that has been aimed
a sphere that has been placed at position 0,1,0 (we moved it upward +y)
a ground plane that has been placed at position 0,0,0 (default position)
  */


  // Now, call the createScene function that you just finished creating
  var scene = createScene();

  // Register a render loop to repeatedly render the scene
  engine.runRenderLoop(function () {
    scene.render();
  });

  // Watch for browser/canvas resize events
  window.addEventListener("resize", function () {
    engine.resize();
  });


function makeBoxesGrid(){
      var i;
      var boxesGrid = [];
      var materialSphere1 = new BABYLON.StandardMaterial("texture1", scene);
      materialSphere1.alpha = 1.0;
      materialSphere1.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.7);
      materialSphere1.diffuseTexture = new BABYLON.Texture("../img/1.png", scene);
      materialSphere1.emissiveColor = new BABYLON.Color3(1, .2, .7);

      for (i = 0; i < 5; i ++){
          var boxi = BABYLON.Mesh.CreateBox("box", 0.85, scene);
          boxi.position.x = -1 + i;
          boxi.position.y = 1 + i;
          boxi.material = materialSphere1;
          shadowGenerator.getShadowMap().renderList.push(boxi);
          boxesGrid.push(boxi);
      }
    console.log("number of boxes = " + boxesGrid.length);
  };