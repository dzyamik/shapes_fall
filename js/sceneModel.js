var SceneModel = function SceneModel() {
    var self = this;
    this.counterToCreate = 0;
    this.acceleration = 5;
    this.numberOfShapes = 1;
    this.createNewElementCoords = null;
    this.indexToDestroy = null;
    var normalRadius = 50;
    this.fieldSize = {
        width: 800,
        height: 600
    }
    this.allowedStartCoords = {
        minX: normalRadius,
        maxX: self.fieldSize.width - normalRadius,
        minY: -4 * normalRadius,
        maxY: -5 * normalRadius
    }

    this.pool = new ShapesPool();

    this.destroyElement = function DestroyElement(elementIndex) {
        this.indexToDestroy = elementIndex;
    }

    this.setCreateElementFlag = function SetCreateElementFlag(coords) {
        this.createNewElementCoords = coords;
    }

    this.setAcceleration = function SetAcceleration(toIncreace, justGetCurrent) {
        if (justGetCurrent)
        {
            return this.acceleration;
        }
        if (toIncreace) {
            this.acceleration++;
        } else {
            this.acceleration = this.acceleration > 1 ? this.acceleration - 1 : 1;
        }

        return this.acceleration;
    }

    this.setNumOfShapes = function SetNumOfShapes(toIncreace, justGetCurrent) {
        if (justGetCurrent)
        {
            return this.numberOfShapes;
        }
        if (toIncreace) {
            this.numberOfShapes = this.numberOfShapes < 500 ? this.numberOfShapes + 1 : 500;
        } else {
            this.numberOfShapes = this.numberOfShapes > 1 ? this.numberOfShapes - 1 : 1;
        }

        return this.numberOfShapes;
    }

    this.newScene = {};


    this.createRandomElement = function CreateRandomElement(coordinates, isInitial) {
        var newElement = {
            distance: 0,
            speed: 0
        };
        var element;

        var elementIndexName = 'shape' + Math.floor(Math.random() * 1000);
        while ( this.newScene[elementIndexName] ) {
            elementIndexName = 'shape' + Math.floor(Math.random() * 1000);
        }
        newElement.index = elementIndexName;


        element = this.pool.borrowShape();
        // set new coords
        element.x = coordinates.x;
        element.y = coordinates.y;
        if (isInitial) {
            newElement.distance = coordinates.y - element.height;
        } else {
            newElement.distance = coordinates.y;
        }

        newElement.element = element;

        return newElement;
    }

    this.getStartCoords = function GetStartCoords() {
        var x = Math.round( this.allowedStartCoords.minX + Math.random() * (this.allowedStartCoords.maxX - this.allowedStartCoords.minX) );
        var y = 0;

         return {x: x, y: y};
    }
}


SceneModel.prototype.updateModel = function UpdateModel(deltaTime) {

    // self.newScene = null;
    // self.newScene = {};

    for (var index in this.newScene) {
        // get info from view
        if (this.newScene[index].distance > this.fieldSize.height + this.newScene[index].element.height) {
            this.pool.returnShape(this.newScene[index].element);
            delete this.newScene[index];
            // this.newScene[index] = null;

        } else {
            this.newScene[index].speed += deltaTime * this.acceleration;
            this.newScene[index].distance += this.newScene[index].speed + this.acceleration * deltaTime * deltaTime / 2;
        }
    }


    if (this.counterToCreate > 1 / this.numberOfShapes) {
        var element = this.createRandomElement(this.getStartCoords(), true);
        this.newScene[element.index] = element;
        this.counterToCreate = 0;
    } else {
        this.counterToCreate += deltaTime;
    }

    if (this.createNewElementCoords != null) {
        var element = this.createRandomElement(this.createNewElementCoords);
        this.newScene[element.index] = element;
        this.createNewElementCoords = null;
    }

    if (this.indexToDestroy != null && this.newScene[this.indexToDestroy]) {
        this.pool.returnShape(this.newScene[this.indexToDestroy].element);
        delete this.newScene[this.indexToDestroy];
        this.indexToDestroy = null;
    }

     return this.newScene;
}