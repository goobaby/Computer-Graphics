const DefaultNumSides = 8;

function Cube(gl) {

  var program = initShaders(gl, "Cube-vertex-shader", "Cube-fragment-shader");

  var positions = [
    // Front face
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,

    // Top face
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,

    // Right face
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0,
  ];

  var indices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,   // left
  ];

  var edges = [
    0, 1,  // "Front" face edges
    1, 2,
    2, 3,
    3, 0,
    4, 5,  // "Back" face edges
    5, 6,
    6, 7,
    7, 4,
    0, 4,  // "Side" edges
    1, 5,
    2, 6,
    3, 7
];
  positions.numComponents = 3;

  positions.buffer = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
  gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW );

  indices.buffer = gl.createBuffer();
  gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
  gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW );

  edges.buffer = gl.createBuffer();
  gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, edges.buffer );
  gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(edges), gl.STATIC_DRAW );
  
  positions.aPosition = gl.getAttribLocation( program, "aPosition" );
  gl.enableVertexAttribArray( positions.aPosition );

  var MV = gl.getUniformLocation(program, "MV");

  var P = gl.getUniformLocation(program, "P")

  this.mv = mat4();

  this.p = mat4();

  this.render = function () {
      gl.useProgram( program );

      gl.uniformMatrix4fv(MV, false, flatten(this.mv));

      gl.uniformMatrix4fv(P, false, flatten(this.p));

      gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
      gl.vertexAttribPointer( positions.aPosition, positions.numComponents,
          gl.FLOAT, false, 0, 0 );
      
      // // Render the wireframe version of the cube
      // gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, edges.buffer );
      // gl.drawElements( gl.LINES, edges.length, gl.UNSIGNED_SHORT, 0 );
      
      gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
      gl.drawElements( gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0 );
  }
};
