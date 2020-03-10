// "use strict";

var gl;

var NumPoints = 500000;
window.onload = function init() {
    var vertices2 = [
        vec2(-1, -1),
        vec2(0, 1),
        vec2(1, -1),
    ];

    var u = mix(vertices2[0], vertices2[1], 0.5);
    var v = mix(vertices2[0], vertices2[2], 0.5);
    var p = mix(u, v, 0.5);

    var points = [p]

    for (var i = 0; i+1 < NumPoints; i++) {
        var j = Math.floor(Math.random() * 3);

        var q = mix(points[i], vertices2[j], 0.5);
        points.push(q)
    }

    var canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition")
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(vPosition);

    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, NumPoints);
}
