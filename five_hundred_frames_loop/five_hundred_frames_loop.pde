Walker[] walkers;

float strength, scale, cluster_width, cluster_height;


void setup(){
  colorMode(HSB, 100, 100, 100, 100);
  size(700, 700);
  strength = random(40);
  scale = random(30);
  cluster_width = random(100);
  cluster_height = random(100);
  walkers = new Walker[int(random(1, 50)) * 2];
  for(int i = 0; i < walkers.length - 1; i+=2){
    walkers[i] = new Walker((width/2) - (cluster_width/2),
                            (height/2) - (cluster_height/2) + map(i, 0, walkers.length, 0, cluster_height),
                            strength,
                            scale);
    walkers[i + 1] = new Walker((width/2) + (cluster_width/2),
                                (height/2) - (cluster_height/2) + map(i, 0, walkers.length, 0, cluster_height),
                                strength,
                                scale);
  }

  float base_hue = random(100);
  background(100, 0, 100);
  stroke((base_hue + random(25, 75)) % 100, random(10, 70), 100, random(15));
  fill((base_hue + random(25, 75)) % 100, random(10, 70), 100, random(15));
}

void draw(){
  beginShape();
  for(int i = 0; i < walkers.length - 1; i+=2){
    walkers[i].move();
    walkers[i+1].move();
    vertex(walkers[i].loc.x, walkers[i].loc.y);
    vertex(walkers[i+1].loc.x, walkers[i+1].loc.y);
  }
  endShape(CLOSE);
  if(frameCount%500 == 0){
    setup();
  }
}


class Walker{
  PVector loc;
  PVector vel;
  PVector acc;
  float strength;
  float scale;

  Walker(float _x, float _y, float _strength, float _scale){
    loc = new PVector(_x, _y);
    vel = new PVector(0, 0);
    acc = new PVector(0, 0);
    strength = _strength;
    scale = _scale;
  }

  void move(){
    float angle = noise(map(loc.x, 0, width, 0, scale), 
                        map(loc.y, 0, height, 0, scale)) * strength;

    acc = new PVector(cos(angle), sin(angle));
    vel.add(acc);
    loc.add(vel);
    vel.mult(0.1);
  }
}

void mouseClicked(){
  setup();
}
