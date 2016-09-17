var walkers = []; //hold all the walkers in an array
var num_walkers; //keep track of the total number of walkers
var strength;
var scale;
var bg;
var s_dist;
var f_dist;

var stroke_a;
var fill_a;

var starting;
var starting_w;

function setup() {
  colorMode(HSB, 100, 100, 100, 100);
  createCanvas(600, 600);
  strength = random(40);
  scale = random(30);
  starting_w = random(100);
  starting = {x: (width/2), y: height/2, m: random(3)}
  num_walkers = random(2, 100);
  s_dist = random(20);
  f_dist = random(20);
  for(var i = 0; i < num_walkers; i++){
    walkers.push(new Walker(starting.x + starting_w, starting.y + (i + starting.m), strength, scale)); 
    walkers.push(new Walker(starting.x + starting_w, starting.y + (i + starting.m), strength, scale)); 
  }

  stroke_a = random(20);
  fill_a = random(20);
  bg = random(50);
  background(bg, 20, 100, 50);
}

function draw() {
  stroke((bg + f_dist + s_dist) % 100, 100, 100, 10);
  fill((bg + f_dist) % 100, 30, 100, 5);
  beginShape();
  for(var i = 0; i < walkers.length-1; i+=2){ //update and display the walkers
    walkers[i].update();
    walkers[i+1].update();
    vertex(walkers[i].loc.x, walkers[i].loc.y);
    vertex(walkers[i+1].loc.x, walkers[i+1].loc.y);
  }
  endShape();
  if(frameCount == 500){
    save();
    noLoop();
  }
}

var Walker = function(x, y, s, sc){
  this.loc = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.scale = sc; 
  this.strength = s;

  this.update = function(){
    this.angle = noise(map(this.loc.x, 0, width, 0, this.scale), map(this.loc.y, 0, height, 0, this.scale)) * this.strength;
    this.acc = createVector(cos(this.angle), sin(this.angle));
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.vel.mult(0.1);
  }

  this.display = function(){
    stroke(200, 1);
    ellipse(this.loc.x, this.loc.y, 1, 1);
  }
}

function mouseClicked(){
  walkers = [];
  setup(); 
}

function keyPressed(){
  if(keyCode == ENTER){
    save();
  }
}
