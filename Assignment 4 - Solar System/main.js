var gl;

var near;
var D;

var fovy;
var aspect;

function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
   
    // Add your sphere creation and configuration code here

    //Sun
    Sun = new Sphere();
    Sun.color = vec4(1, 1, 0, 1.0);
    Sun.radius = 1;
    Sun.rotation = 0;
    Sun.P = perspective()

    //Earth
    Earth = new Sphere();
    Earth.radius = 0.009157785004;
    Earth.orbit = 2137.20975731;

    //Moon
    Moon = new Sphere();
    Moon.radius = 0.00249740949;
    Moon.orbit = 0.552640911;

    near = 10;
    D = 2 * (Earth.orbit + Moon.orbit + Moon.radius);

    angle = Math.atan((D/2) / (near + (D/2)));
    fovy = 2 * Math.atan(angle);
    aspect = canvas.clientWidth/canvas.clientHeight

    var far = near + D

    Sun.P = Earth.P = Moon.P = perspective(fovy, aspect, near, far);

    requestAnimationFrame(render);
}

function render() {

    // Update your motion variables here

    Sun.rotation += (1/27);
    //console.log(Sun.rotation);

    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    
    // Add your rendering sequence here

    ms = new MatrixStack();

    var V = translate(0.0, 0.0, -0.5*( near + (near + D))); // far = near + D

    ms.load(V);

    ms.push();
    ms.scale(Sun.radius);
    ms.rotate(Sun.rotation, [1,1,1]);
    // set up other parameters required to draw Sun
    Sun.MV = ms.current();
    Sun.render();

    ms.pop();



    requestAnimationFrame(render);
}

window.onload = init;