"use strict";

var gl;

var NumTimesToSubdivide = 7;

function addTriangle(points, a, b, c) {
    points.push(a, b, c);
}

function buildGasket(points, a, b, c, depth) {
    if (depth == 0) {
        addTriangle(points, a, b, c);
        return;
    }

    // console.log(a, b, c);
    var ab = mix(a, b, 0.5);
    var ac = mix(a, c, 0.5);
    var bc = mix(b, c, 0.5);
    buildGasket(points, a, ab, ac, depth - 1);
    buildGasket(points, ab, b, bc, depth - 1);
    buildGasket(points, ac, bc, c, depth - 1);
}

window.onload = function init() {
    var vertices2 = [
        vec2(-1, -1),
        vec2(0, 1),
        vec2(1, -1),
    ];

    var points = []
    buildGasket(points, vertices2[0], vertices2[1], vertices2[2], NumTimesToSubdivide);
    // console.log(points);

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

    render(points.length);
}

function render(numVertices) {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, numVertices);
}
