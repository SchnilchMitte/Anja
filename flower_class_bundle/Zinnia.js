class Zinnia extends BaseFlower {
  v = [];
  rows = 30; //60
  cols = 60; //120
  controlls = 4;
  setup(){
    colorMode(HSB, 360, 100, 100);
    angleMode(DEGREES);
    noStroke();
  }
  createSliders() {    
   
  }

  updateParams() {
    
  }

  display() {
    clear();
    //orbitControl(4, 4);
    push(); 
    rotateX(-30);
    
    for(let r = 0; r <= 1; r += 0.02){
    beginShape(POINTS);
    stroke(335, -r*40+100, r*50+50);
    for(let theta = -2*180; theta <= 180*15; theta += 1.5){
      let phi = (180/2)*Math.exp(-theta/(16*180));
      let petalCut = 1 - (1/2) * pow((5/4)*pow(1-((10.4*theta%360)/180), 2)-1/12, 2);
      let hangDown = 1.3*pow(r, 2)*pow(1.25*r-1, 2)*sin(phi);

      if(0 < petalCut * (r * sin(phi)+hangDown*cos(phi))){
        let pX = 300 * (1-theta/6500) * petalCut * (r * sin(phi)+hangDown*cos(phi)) * sin(theta);
        let pY = -300 * (1-theta/6500) * petalCut * (r * cos(phi)-hangDown*sin(phi));
        let pZ = 300 * (1-theta/6500) * petalCut * (r * sin(phi)+hangDown*cos(phi)) * cos(theta);
        vertex(pX, pY, pZ);
      }
    }
    endShape();
  }
  pop();
  }

  
}

window.Zinnia = Zinnia;