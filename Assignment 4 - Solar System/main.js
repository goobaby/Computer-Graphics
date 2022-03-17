var gl;

var near;
var D;

var fovy;
var aspect;

var earthDay = 1;
zoom = 1000;

function init() {

    var zoomHTML =  document.getElementById("zoom").value
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
   
    // Add your sphere creation and configuration code here

    //Sun
    Sun = new Sphere();
    Sun.color = vec4(1, 1, 0, 1.0);
    Sun.radius = 10;
    Sun.rotation = 0;

    //Earth
    Earth = new Sphere();
    Earth.radius = 1;
    Earth.distance = 25;
    Earth.orbit = 2137.20975731;
    Earth.color = vec4(0, 1, 1, 1.0);

    //Moon
    Moon = new Sphere();
    Moon.radius = .25;
    Moon.orbit = 0.552640911;
    Moon.distance = 2;
    Moon.color = vec4(1, 1, 1, 1.0)

    //Saturn the ball part
    Saturn = new Sphere();
    Saturn.radius = 2;
    Saturn.distance = 40;
    Saturn.color = vec4(.234, 214, .184, 1.0);

    //Saturn Disk
    saturnDisk = new Disk(100, 1.25);
    saturnDisk.radius = 4;
    saturnDisk.distance = 40;
    saturnDisk.color = vec4(.101,.95,.69, 1.0);

    //zoom = zoomHTML.value

    near = 1;
    D = 2 * (zoom + Earth.distance + Moon.distance + Saturn.distance + Saturn.radius); //Idk why but the 2000 is nescessary


    angle = Math.asin((D/2) / (near + (D/2)));
    fovy = 2 * angle;
    aspect = canvas.clientWidth/canvas.clientHeight

    var far = near + D

    saturnDisk.P = Saturn.P = Sun.P = Earth.P = Moon.P = perspective(fovy, aspect, near, far);

    requestAnimationFrame(render);
}

function render() {

    // Update your motion variables here
    earthDay += 1
    Sun.rotation = (earthDay/27);
    Earth.rotation = earthDay;
    Earth.year = earthDay/2;
    Moon.rotation = earthDay;

    Saturn.year = earthDay/3;
    //365 is too slow
    //console.log(Sun.rotation);

    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    
    // Add your rendering sequence here

    ms = new MatrixStack();

    var V = translate(0.0, 0.0, -0.5*( near + (near + D))); // far = near + D

    ms.load(V);

    ms.push();
    ms.scale(Sun.radius);
    ms.rotate(Sun.rotation, [1,0,0]);
    // set up other parameters required to draw Sun
    Sun.MV = ms.current();
    Sun.render();
    ms.pop();

    //Earth and its Moon
    ms.push();
    ms.rotate(Earth.year, [0,50,0]); //year
    ms.translate(Earth.distance, 0, 0);
    ms.push(); //Save for moon
    ms.rotate(Earth.rotation, [1,0,0]); //day
    ms.scale(Earth.radius);
    Earth.MV = ms.current();
    Earth.render();
    ms.pop();
    //Moon
    ms.rotate(Moon.rotation, [0,20,0]); //Moon go around earth
    ms.translate(Moon.distance, 0, 0);
    ms.rotate(Moon.rotation, [1, 0,0]); //Dark side of the moon
    ms.scale(Moon.radius);
    Moon.MV = ms.current();
    Moon.render();
    ms.pop();

    //Saturn
    ms.push();
    ms.rotate(Saturn.year, [0, 90, 0]);
    ms.translate(Saturn.distance, 0, 0);
    ms.push(); //Ring 1
    ms.scale(Saturn.radius);
    Saturn.MV = ms.current();
    Saturn.render();
    ms.pop();
    //Sat Ring
    ms.rotate(27, [1,0,0]);
    //ms.rotate(Saturn.ring, [1,0,0]);
    ms.scale(saturnDisk.radius);
    saturnDisk.MV = ms.current();
    saturnDisk.render();
    ms.pop();

    requestAnimationFrame(render);
}

window.onload = init;