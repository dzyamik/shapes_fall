var SceneController = function SceneController(sceneView, sceneModel) {
    var self = this;
    this.sceneView = sceneView;
    this.sceneModel = sceneModel;
    this.newScene = {};

    this.ticker = new PIXI.ticker.Ticker();

    this.update = function Update() {
        var deltaTime = this.ticker.elapsedMS / 1000;

        this.newScene = this.sceneModel.updateModel(deltaTime);
        this.sceneView.updateView(this.newScene);
    }

    var acceleration = this.sceneModel.setAcceleration(true, true);
    var numberOfShapes = this.sceneModel.setNumOfShapes(true, true);

    this.sceneView.setGravity(acceleration);
    this.sceneView.setShapesPerSec(numberOfShapes);

    this.sceneView.sendRequestToDestroy = this.destroyElement.bind(this);
    this.sceneView.sendRequestToCreate = this.createElement.bind(this);

    this.sceneView.updateGravity = this.updateGravity.bind(this);
    this.sceneView.updateNumberOfShapes = this.updateSPS.bind(this);
    // window.onresize = this.sceneView.resize;
    window.addEventListener('resize', function() {
        self.sceneView.resize();
    });
    this.sceneView.resize();

    this.ticker.add(this.update, this);
}

SceneController.prototype.initialize = function initialize() {
    this.ticker.start();
};

/*
SceneController.prototype.countElements = function CountElements(sceneObject) {
    var count = 0;
    for (var prop in sceneObject) {
        if (sceneObject.hasOwnProperty(prop))
        {
            ++count;
        }
    }
    this.sceneView.setNumberShapes(count);
}
*/

SceneController.prototype.destroyElement = function DestroyElement(elementIndex) {
    this.sceneModel.destroyElement(elementIndex);
}

SceneController.prototype.createElement = function CreateElement(coords) {
    this.sceneModel.setCreateElementFlag(coords);
}

SceneController.prototype.updateGravity = function UpdateGravity(toIncrease) {
    var acceleration = this.sceneModel.setAcceleration(toIncrease, false);
    this.sceneView.setGravity(acceleration);
}
SceneController.prototype.updateSPS = function UpdateSPS(toIncrease) {
    var numberOfShapes = this.sceneModel.setNumOfShapes(toIncrease, false);
    this.sceneView.setShapesPerSec(numberOfShapes);
}