function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '0x';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

function getCountPixels(arrRGB) {
    var len = arrRGB.length / 3;
    var res = 0;
    for (var i = 0; i < len; i++) {
        res += (arrRGB[i * 3] || arrRGB[i * 3 + 1] || arrRGB[i * 3 + 2]) ? 1 : 0;
    }

    return res;
}

