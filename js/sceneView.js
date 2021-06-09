var SceneView = function SceneView(width, height) {
    var self = this;
    this.width = width;
    this.height = height;
    this.totalArea = 0;
    this.currentWidth = width;
    this.currentHeight = height;
    this.scale = 1;

    document.getElementById("decSPS").addEventListener("click", function() {
        self.updateNumberOfShapes(false);
    });

    document.getElementById("incSPS").addEventListener("click", function() {
        self.updateNumberOfShapes(true);
    });

    document.getElementById("decGravity").addEventListener("click", function() {
        self.updateGravity(false);
    });

    document.getElementById("incGravity").addEventListener("click", function() {
        self.updateGravity(true);
    });


    PIXI.utils.skipHello();
    this.app = new PIXI.Application(width, height, {forceCanvas: PIXI.utils.isMobile.any});
    document.getElementById("gameArea").appendChild(this.app.view);


    this.graphics = new PIXI.Graphics();
    this.countElements = 0;
    this.BACKGROUND_COLOR = 0x598FD4;

    this.graphics.beginFill(this.BACKGROUND_COLOR, 1);
    this.graphics.drawRect(0, 0, width, height);

    this.app.stage.addChild(this.graphics);

    this.sendRequestToCreate = null;

    function areaReaction(coords) {
        self.sendRequestToCreate(coords);
    }

    this.graphics.interactive = true;
    this.graphics.buttonMode = true;
    this.graphics.on('pointerdown', function(e) {
        var pos = e.data.getLocalPosition(self.app.stage);
        areaReaction({
            x: Math.round(pos.x),
            y: Math.round(pos.y)
        });
    });

    this.elements = [];
}

SceneView.prototype.resize = function Resize() {
    var scale = 1;
    var windowParam = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    var top = document.getElementsByClassName("topInfo")[0].getBoundingClientRect().top;
    var buttonsRect = document.getElementsByClassName("bottomInfo")[0].getBoundingClientRect();
    var bottom = buttonsRect.top + buttonsRect.height;
    var realHeight = bottom - top;

    var additionalHeight = realHeight - this.currentHeight;
    if (windowParam.height < 800) {
        additionalHeight = 120 * this.height / this.currentHeight;
    }
    var width = this.width;
    var height = this.height + additionalHeight;

    var scaleX = 1;
    var scaleY = 1;
    scaleX = windowParam.width / width;
    scaleY = windowParam.height / height;
    scale = (scaleY < scaleX) ? scaleY : scaleX;

    this.currentWidth = this.width * scale > this.width ? this.width : this.width * scale;
    this.currentHeight = this.height * scale > this.height ? this.height : this.height * scale;

    this.app.view.style.width = this.currentWidth + 'px';
    this.app.view.style.height = this.currentHeight + 'px';
}

SceneView.prototype.updateNumberOfShapes = function UpdateNumberOfShapes(toIncrease) {
    return toIncrease;
}

SceneView.prototype.updateGravity = function UpdateGravity(toIncrease) {
    return toIncrease;
}

SceneView.prototype.setNumberShapes = function SetNumberShapes(num) {
    document.getElementById("numberOfShapes").innerHTML = num;
}

SceneView.prototype.setShapesSurface = function SetShapesSurface(num) {
    document.getElementById("surfaceOfShapes").innerHTML = num;
}

SceneView.prototype.setShapesPerSec = function SetShapesPerSec(num) {
    document.getElementById("shapesPerSec").innerHTML = num;
}

SceneView.prototype.setGravity = function SetGravity(num) {
    document.getElementById("gravity").innerHTML = num;
}

SceneView.prototype.sendRequestToDestroy = function SendRequestToDestroy(elementIndex) {
    return elementIndex;
}

SceneView.prototype.sendRequestToCreate = function SendRequestToCreate() {
    return true;
}


SceneView.prototype.countSurface = function CountSurface() {
    // var length = 0;
    // var dataURL = this.app.renderer.plugins.extract.image(this.app.stage).src;

    // var dataURL = this.app.view.toDataURL('image/png');
    // dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    // var length = window.atob(dataURL).length - 9704;
    // var length = getNotBlackCountBase64(window.atob(dataURL));
    // this.setShapesSurface(Math.floor(this.app.renderer.plugins.extract.pixels(this.app.view).length / 3) - 640000);
    // this.setShapesSurface(getNotBlackCount(this.context.getImageData(0, 0, this.height, this.width).data));
    // var data = this.context.getImageData(0, 0, this.height, this.width).data;
    // this.setShapesSurface(window.atob(this.app.view.toDataURL().replace(/^data:image\/(png|jpg);base64,/, "")).length - 9704);
    // this.setShapesSurface(this.app.renderer.extract.pixels(this.app.stage).src.replace(/^data:image\/(png|jpg);base64,/, "").length - 12940);
    //this.app.view.toDataURL()
    // length = getCountPixels(this.app.renderer.extract.pixels(this.)) - 640000;
    this.setShapesSurface(this.totalArea);
}




SceneView.prototype.createElement = function CreateElement(elementParameters) {
    var self = this;

    function buttonReaction() {
        self.sendRequestToDestroy(this.index);
    }

    var element = elementParameters.element;

    element.interactive = true;
    element.buttonMode = true;
    element.index = elementParameters.index;
    element.on('pointerdown', buttonReaction);
    this.elements[elementParameters.index] = element;
    this.app.stage.addChild(element);

    // console.log(getCountPixels(this.app.renderer.extract.pixels(element)), Math.floor(element.getLocalBounds().width * element.getLocalBounds().height));
    // TODO: fix this
    if (!element.area) {
        element.area = getCountPixels(this.app.renderer.extract.pixels(element));
    }
    this.totalArea += element.area;
}

SceneView.prototype.updateView = function UpdateView(newScene) {
    for (var index in newScene) {
        if (!this.elements[index]) {
            // create
            this.createElement(newScene[index])
        }
    }

    for (var index in this.elements) {
        if (newScene[index]) {
            // update
            this.elements[index].y = newScene[index].distance;

            // TODO: make it more accure
            // console.log(this.elements[index].y, this.elements[index].getBounds(false).height);
            if (this.elements[index].y + this.elements[index].height > 10) {
                this.countElements++;
            }
        } else {
            // destroy
            this.app.stage.removeChild(this.elements[index]);
            this.totalArea -= this.elements[index].area;
            delete this.elements[index];
        }
    }
    this.setNumberShapes(this.countElements);
    this.countElements = 0;

    this.countSurface();
}