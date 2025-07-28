class Camellia extends BaseFlower {
  v = [];
  rows = 30; //60
  cols = 60; //120
  controlls = 4;
  myPicker;
  setup(){
    push();
    colorMode(HSB, 360, 100, 100);
    angleMode(DEGREES);
    noStroke();

  

    pop();
  }
  createSliders() {    
    this.createSlider("Color", 0,360, 335, 1);
    this.createSlider("Saturation", -100,20, 5, 0.1);
  }

  updateParams() {
    this.color = this.get("Color");
    this.Saturation = this.get("Saturation");
    
  }

  display() {
    clear();
    //orbitControl(4, 4);
    push();
    rotateX(-60);
    
    for(let r = 0; r <= 1; r += 0.02){
    beginShape(POINTS);
    stroke(this.color, -r*this.Saturation+10, r*50+50);
    for(let theta = 0; theta <= 180*20; theta += 1.5){
      let phi = (180/2.5)*Math.exp(-theta/(16*180));
      let petalCut = 0.75+abs(asin(sin(2.75*theta))+80*sin(2.75*theta))/480;
      let hangDown = 1.4*pow(r, 2)*pow(1.0*r-1, 2)*sin(phi);

      if(0 < petalCut * (r * sin(phi)+hangDown*cos(phi))){
        let pX = 300 * (1-theta/6000) * petalCut * (r * sin(phi)+hangDown*cos(phi)) * sin(theta);
        let pY = -300 * (1-theta/6000) * petalCut * (r * cos(phi)-hangDown*sin(phi));
        let pZ = 300 * (1-theta/6000) * petalCut * (r * sin(phi)+hangDown*cos(phi)) * cos(theta);
        vertex(pX, pY, pZ);
      }
    }
    endShape();
  }
  pop();
  } 

  
}


window.Camellia = Camellia;