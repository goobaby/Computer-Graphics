//
//  main.js
//
angle = 0;

function init()
{
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST)
    dragon = new Dragon(gl);
    render();
}

function render()
{

    var canvas;

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //motion var
    angle += 1;

    R = rotate(angle, [1,1,1]);

    //var width = canvas.clientWidth, height = canvas.clientHeight;

    //gl.viewport(0, 0,width, height);

    //aspect = width, height;

    P = perspective(60, 1, 10, 100)

    dragon.mv = R;

    dragon.p = P;

    dragon.render();

    requestAnimationFrame(render);
}



window.onload = init;