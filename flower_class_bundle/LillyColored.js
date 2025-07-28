class LillyColored extends BaseFlower {
  v = [];
  rows = 30; //60
  cols = 60; //120
  controlls = 4;
  explain = false;

  btn_Elements = [];
  setup(){
    push();
    colorMode(HSB, 360, 100, 100);
    angleMode(DEGREES);
    noStroke();
    
    pop();
  }
  createSliders() {    
    this.createSlider('cols', 1, 60, 60, 1);
    this.createSlider('rows', 1, 120, 360, 1);

    this.createSlider('pNumSlider', 1, 20, 5, 1);
    
    
    this.createSlider('diameterSlider', 20, 250, 200, 10);

    
    this.createSlider('pLenSlider', 0, 300, 60, 10);
    

    
    this.createSlider('pSharpSlider', 0.0, 10.0, 0.4, 0.1);
    

    
    this.createSlider('heightSlider', 0, 600, 300, 10);
    

    
    this.createSlider('curvatureSlider1', 0.0, 4.0, 0.8, 0.1);

    this.createSlider('curvatureSlider2', 0.0, 1.0, 0.2, 0.05);

    
    this.createSlider('bumpSlider', 0.0, 5.0, 2.5, 0.5);
  

  
    this.createSlider('bumpNumSlider', 0, 20, 10, 1);

    this.createSlider("Hue", 0,360, 340,0.1 );

    this.createSlider("Saturation", 0,360, 100, 0.1 );

    this.createSlider("Brightness", 0,150, 100, 0.1 );

    let explainBox = createButton("Explain Mode");
    explainBox.class("btn-class-name");

    let backBtn = document.createElement("span");
    
    backBtn.className = "back";
    console.log(backBtn);
    let frontBtn = document.createElement("span");
    frontBtn.className = "front";
    
    explainBox.elt.appendChild(backBtn);
    explainBox.elt.appendChild(frontBtn);
    this.btn_Elements.push(explainBox,backBtn,frontBtn);
    explainBox.mousePressed(()=>{
      this.explain = !this.explain;
      console.log(this.explain);
    })
    this.showSliders();
  }

  deleteSliders(){
    super.deleteSliders();
    this.btn_Elements.forEach((btn)=>{
      btn.remove(); 
    })
  }

  updateParams() {
    this.pNum = this.get("pNumSlider");
    this.fD = this.get("diameterSlider");
    this.pLen = this.get("pLenSlider");
    this.pSharp = this.get("pSharpSlider");

    this.fHeight = this.get("heightSlider");
    this.curve1 = this.get("curvatureSlider1");
    this.curve2 = this.get("curvatureSlider2");

    this.b = this.get("bumpSlider");
    this.bNum = this.get("bumpNumSlider");
    
    this.cols = this.get("cols");
    this.rows = this.get("rows");

    this.colorPicker1 = this.get("Hue");
    this.colorPicker2 = this.get("Saturation");
    this.colorPicker3 = this.get("Brightness");
  }

  display() {
    clear();
    //orbitControl(4, 4);
    push();
    rotateX(60);
     
    for(let theta = 0; theta < this.rows; theta += 1){
      if(!this.explain){beginShape(POINTS); stroke(71, 26, 92);}
      this.v.push([]);
      for(let phi = 0; phi < this.cols; phi += 1){
        let r = (this.pLen*pow(abs(sin(this.pNum/2*phi*360/this.cols)),this.pSharp)+this.fD) * theta/this.rows;
        let x = r * cos(phi*360/this.cols);
        let y = r * sin(phi*360/this.cols);
        let z = vShapeLC(this.fHeight, r/100, this.curve1, this.curve2, 1.5) - 200+
          bumpinessLC(this.b, r/100, this.bNum, phi*360/this.cols);

          let pos = createVector(x, y, z);
          vertex(x,y,z);
          this.v[theta].push(pos);
      }
      if(!this.explain){endShape();}
    }
    if(this.explain){
      for(let theta = 0; theta < this.v.length; theta++){
        fill(this.colorPicker1, this.colorPicker2-theta, this.colorPicker3);
        for(let phi = 0; phi < this.v[theta].length; phi++){
          if(theta < this.v.length-1 && phi < this.v[theta].length-1){
            beginShape();
            vertex(this.v[theta][phi].x, this.v[theta][phi].y, this.v[theta][phi].z);
            vertex(this.v[theta+1][phi].x, this.v[theta+1][phi].y, this.v[theta+1][phi].z);
            vertex(this.v[theta+1][phi+1].x, this.v[theta+1][phi+1].y, this.v[theta+1][phi+1].z);
            vertex(this.v[theta][phi+1].x, this.v[theta][phi+1].y, this.v[theta][phi+1].z);
            endShape(CLOSE);
          }else if(theta < this.v.length-1 && phi == this.v[theta].length-1){
            beginShape();
            vertex(this.v[theta][phi].x, this.v[theta][phi].y, this.v[theta][phi].z);
            vertex(this.v[theta][0].x, this.v[theta][0].y, this.v[theta][0].z);
            vertex(this.v[theta+1][0].x, this.v[theta+1][0].y, this.v[theta+1][0].z);
            vertex(this.v[theta+1][phi].x, this.v[theta+1][phi].y, this.v[theta+1][phi].z);
            endShape(CLOSE);
          }
        }
      }
    }  
      this.v = [];
    pop();
  }

  
}

window.LillyColored = LillyColored;

function vShapeLC(A, r, a, b, c){
  return A*pow(Math.E, -b*pow(abs(r), c))*pow(abs(r), a);
}

function bumpinessLC(A, r, f, angle){
  return 1 + A * pow(r, 2) * sin(f * angle);
}