

var sceneView = new SceneView(800, 600);

var sceneModel = new SceneModel();

var sceneController = new SceneController(sceneView, sceneModel);

sceneController.initialize();

