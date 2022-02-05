//
//  main.js
//

function init()
{
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    gl.clearColor(0.0, 0.5, 0.0, 0.0);
    cone = new Cone(gl, 20);
    render();
}

function render()
{
    gl.clear(gl.DEPTH_BUFFER_BIT);
    cone.render();
}



window.onload = init;