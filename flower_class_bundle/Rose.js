class Rose extends BaseFlower {
  v = [];
  cols = 400; 
  rows = 20; //600 30

  t_D = 180*15 / this.cols;
  r_D =  1 / this.rows;

  setup(){
    
    noStroke();
    
  }

  createSliders() {
    
    
    
    this.createSlider('opening', 1, 10, 2, 0.1);
    

    
    
    this.createSlider('vDensity', 1, 20, 8, 0.1);
    

    
    this.createSlider('pAlign', 0, 6, 3.6, 0.05);
    
    this.createSlider('curve1', -6, 6, 2, 0.1);
    
    this.createSlider('curve2', 0.5, 1.5, 1.3, 0.1);
    
    this.createSlider('colsS', 0, 600, 400, 1);
    
    this.createSlider('rowsS', 0, 30, 20, 0.01);
    
    this.createSlider('Hue', 0,360, 340, 0.1);
    this.createSlider('Saturation', 0,100, 100, 0.1);


    this.showSliders();
  }

  updateParams() {
    this.opening = this.get('opening');
    this.vDensity = this.get('vDensity');
    this.pAlign = this.get('pAlign');
    this.curve1 = this.get('curve1');
    this.curve2 = this.get('curve2');
    this.colsS = this.get('colsS');
    this.rowsS = this.get('rowsS');
    this.Hue = this.get('Hue');
    this.Saturation = this.get('Saturation');
  }

  display() {
    push();
    this.cols = this.colsS;
    this.rows = this.rowsS;

    this.t_D = 180*15 / this.cols;
    this.r_D =  1 / this.rows;  
    rotateX(-30);
    fill(200, 80, 90);
    for(let r = 0; r <= this.rows; r++){
    this.v.push([]);
      for(let theta = 0; theta <= this.cols; theta++){
        let phi = (180/this.opening)*Math.exp(-theta*this.t_D/(this.vDensity*180));
        let petalCut = 1 - (1/2) * pow((5/4)*pow(1-((this.pAlign*theta*this.t_D%360)/180), 2)-1/4, 2);
        let hangDown = this.curve1*pow(r*this.r_D, 2)*pow(this.curve2*r*this.r_D-1, 2)*sin(phi);

        let pX = 260 * petalCut * (r*this.r_D * sin(phi)+hangDown*cos(phi)) * sin(theta*this.t_D);
        let pY = -260 * petalCut * (r*this.r_D * cos(phi)-hangDown*sin(phi));
        let pZ = 260 * petalCut * (r*this.r_D * sin(phi)+hangDown*cos(phi)) * cos(theta*this.t_D);
        let pos = createVector(pX, pY, pZ);
        this.v[r].push(pos);
      }
    }


    for(let r = 0; r < this.v.length; r++){
    fill(this.Hue, this.Saturation, -20+r*this.r_D*120);
      for(let theta = 0; theta < this.v[r].length; theta++){
        if(r < this.v.length-1 && theta < this.v[r].length-1){
          beginShape();
          vertex(this.v[r][theta].x, this.v[r][theta].y, this.v[r][theta].z);
          vertex(this.v[r+1][theta].x, this.v[r+1][theta].y, this.v[r+1][theta].z);
          vertex(this.v[r+1][theta+1].x, this.v[r+1][theta+1].y, this.v[r+1][theta+1].z);
          vertex(this.v[r][theta+1].x, this.v[r][theta+1].y, this.v[r][theta+1].z);
          endShape(CLOSE);
        }
      }
    } 


    this.v = [];
    pop();
  }
}

window.Rose = Rose;