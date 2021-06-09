function Factory() {
    var normalRadius = 50;

    var initialCoords = {
        x: 0,
        y: 0
    };


    this.getCircle = function() {
        var funcParams = [{
            name: 'drawCircle',
            parameters: [initialCoords.x, initialCoords.y]
        }];
        var radius = normalRadius;
        var randomRadius = Math.round((1 + Math.random()) * radius);
        funcParams[0].parameters.push(randomRadius);

        return funcParams;
    }

    this.getEllipse = function() {
        var funcParams = [{
            name: 'drawEllipse',
            parameters: [initialCoords.x, initialCoords.y]
        }];
        var radius = normalRadius;
        var widthRadius = Math.round((1 + Math.random()) * radius);
        var heightRadius = Math.round((1 + Math.random()) * radius);
        funcParams[0].parameters.push(widthRadius);
        funcParams[0].parameters.push(heightRadius);

        return funcParams;
    }

    this.getNSide = function() {
        var funcParams = [{
            name: 'moveTo',
            parameters: [initialCoords.x, initialCoords.y]
        }];

        var N = 3 + Math.floor(Math.random() * 4);
        var alpha = 2 * Math.PI / N;
        var coords = new Array();
        var radius = normalRadius * 2;
        var initCoords = {
            x: initialCoords.x,
            y: initialCoords.y
        };
        coords.push({
            x: initialCoords.x,
            y: initialCoords.y
        });

        for (var n = 1; n < N; n++) {
            var angle = alpha * n;
            var rand = radius * Math.sin(alpha / 2) * (Math.random() - 0.5);
            var newX = Math.round(coords[n - 1].x + radius * Math.cos(angle) + rand);
            var newY = Math.round(coords[n - 1].y + radius * Math.sin(angle) + rand);
            coords.push(
                {
                    x: newX,
                    y: newY
                }
            );

            funcParams.push({
                name: 'lineTo',
                parameters: [newX, newY]
            });
        }
        funcParams.push({
            name: 'lineTo',
            parameters: [initCoords.x, initCoords.y]
        });
        funcParams.push({
            name: 'endFill',
            parameters: null
        });

        return funcParams;
    }

    this.getNSideArc = function() {
        var funcParams = [{
            name: 'moveTo',
            parameters: [initialCoords.x, initialCoords.y]
        }];

        var N = 4 + Math.floor(Math.random() * 4);
        var alpha = 2 * Math.PI / N;
        var coords = new Array();
        var radius = normalRadius * 2;
        var initCoords = {
            x: initialCoords.x,
            y: initialCoords.y
        };
        coords.push({
            x: initialCoords.x,
            y: initialCoords.y
        });


        for (var n = 1; n < N; n++) {
            var angle = alpha * n;
            var rand = 2 * radius * Math.sin(alpha / 2) * (Math.random() - 0.5);
            var exactX = Math.round(coords[n - 1].x + radius * Math.cos(angle));
            var exactY = Math.round(coords[n - 1].y + radius * Math.sin(angle));
            var newX = Math.round(coords[n - 1].x + radius * Math.cos(angle) + rand);
            var newY = Math.round(coords[n - 1].y + radius * Math.sin(angle) + rand);
            coords.push(
                {
                    x: newX,
                    y: newY
                }
            );

            funcParams.push({
                name: 'bezierCurveTo',
                parameters: [coords[n - 1].x, coords[n - 1].y, exactX, exactY, newX, newY]
            });
        }
        funcParams.push({
            name: 'bezierCurveTo',
            parameters: [coords[N - 1].x, coords[N - 1].y, exactX, exactY, initCoords.x, initCoords.y]
        });
        funcParams.push({
            name: 'endFill',
            parameters: null
        });

        return funcParams;
    }
};
