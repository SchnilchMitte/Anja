class Lotus extends BaseFlower {
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
   /* this.createSlider('cols', 1, 60, 60, 1);
    this.createSlider('rows', 1, 120, 120, 1);

    this.createSlider('pNumSlider', 1, 20, 5, 1);
    
    
    this.createSlider('diameterSlider', 20, 250, 200, 10);

    
    this.createSlider('pLenSlider', 0, 300, 60, 10);
    

    
    this.createSlider('pSharpSlider', 0.0, 10.0, 0.4, 0.1);
    

    
    this.createSlider('heightSlider', 0, 600, 300, 10);
    

    
    this.createSlider('curvatureSlider1', 0.0, 4.0, 0.8, 0.1);

    this.createSlider('curvatureSlider2', 0.0, 1.0, 0.2, 0.05);

    
    this.createSlider('bumpSlider', 0.0, 5.0, 2.5, 0.5);
  

  
    this.createSlider('bumpNumSlider', 0, 20, 10, 1);

    
    this.showSliders();*/
  }

  updateParams() {
    /*this.pNum = this.get("pNumSlider");
    this.fD = this.get("diameterSlider");
    this.pLen = this.get("pLenSlider");
    this.pSharp = this.get("pSharpSlider");

    this.fHeight = this.get("heightSlider");
    this.curve1 = this.get("curvatureSlider1");
    this.curve2 = this.get("curvatureSlider2");

    this.b = this.get("bumpSlider");
    this.bNum = this.get("bumpNumSlider");
    
    this.cols = this.get("cols");
    this.rows = this.get("rows");*/
  }

  display() {
    clear();
    //orbitControl(4, 4);
    push();
    rotateX(-60);

    for(let r = 0; r <= 1; r += 0.02){
    beginShape(POINTS);
    stroke(310, (r*50-30)*3+5, 100);
    for(let theta = 0; theta <= 180*8; theta += 1.5){
      let phi = (180/2.5)*Math.exp(-theta/(6.5*180));
      let petalCut = 0.5+abs(asin(sin(2.25*theta))+120*sin(2.25*theta))/360;
      let hangDown = 2.3*pow(r, 2)*pow(0.8*r-1, 2)*sin(phi);

      if(0 < petalCut * (r * sin(phi)+hangDown*cos(phi))){
        let pX = 300 * (1-theta/10000) * petalCut * (r * sin(phi)+hangDown*cos(phi)) * sin(theta);
        let pY = -300 * (1-theta/10000) * petalCut * (r * cos(phi)-hangDown*sin(phi));
        let pZ = 300 * (1-theta/10000) * petalCut * (r * sin(phi)+hangDown*cos(phi)) * cos(theta);
        vertex(pX, pY, pZ);

      }
    }
    endShape();
    }
    pop();
    }

  
}

window.Lotus = Lotus;