function ShapesPool() {
    this.elementFactory = new Factory();
    this.createShapes();
    // console.log(this.shapes[1]);
}

ShapesPool.prototype.borrowShape = function() {
  return this.shapes.shift();
};

ShapesPool.prototype.returnShape = function(shape) {
  this.shapes.push(shape);
};

ShapesPool.prototype.createShapes = function() {
    this.shapes = [];

    this.addShapes(250, 0);
    this.addShapes(250, 1);
    this.addShapes(250, 2);
    this.addShapes(250, 3);

    this.shuffle(this.shapes);
};

ShapesPool.prototype.addShapes = function(amount, type) {
    var elementParameters;
    for (var i = 0; i < amount; i++) {
        switch (type) {
            case 0:
                elementParameters = this.elementFactory.getCircle();
            break;
            case 1:
                elementParameters = this.elementFactory.getEllipse();
            break;
            case 2:
                elementParameters = this.elementFactory.getNSide();
            break;
            case 3:
                elementParameters = this.elementFactory.getNSideArc();
            break;
        }

        var element = new PIXI.Graphics();
        element.lineStyle(1, 0x000000, 1);
        element.beginFill(getRandomColor());
        for (var j = 0; j < elementParameters.length; j++)
        {
            var param = elementParameters[j];
            element[param.name].apply(element, param.parameters != null ? param.parameters : null );
        }

        //  element.interactive = true;

        this.shapes.push(element);
    }
};


ShapesPool.prototype.shuffle = function(array) {
    var len = array.length;
    var shuffles = len * 3;
    for (var i = 0; i < shuffles; i++) {
        var poolSlice = array.pop();
        var pos = Math.floor(Math.random() * (len-1));
        array.splice(pos, 0, poolSlice);
    }
};

