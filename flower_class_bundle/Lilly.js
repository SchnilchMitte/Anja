class Lilly extends BaseFlower {
  myPicker; 
  setup(){
    push();
    angleMode(DEGREES);
    colorMode(HSB);

    this.myPicker = createColorPicker('#df7c7c');
    this.myPicker.position(730, 100);
    console.log("creted");
    //stroke(71, 26, 92);
  
    strokeWeight(4);
    pop();
  }

  createSliders() {
    //remove those were for testing purposes only
    /*this.createSlider('Petals', 1, 20, 5);
    this.createSlider('Diameter', 20, 250, 200);
    this.createSlider('Length', 0, 300, 60);
    this.createSlider('Sharpness', 0.0, 10.0, 0.4, 0.1);
    this.showSliders();*/
  }

  updateParams() {
    /*this.p = this.get('Petals');
    this.d = this.get('Diameter');
    this.l = this.get('Length');
    this.s = this.get('Sharpness');*/
  }

  deleteSliders(){
    //super().deleteSliders();
    console.log("wants to delete");
    if(this.myPicker){
      this.myPicker.elt.remove();
    }
  }

  display() {
    //background(75, 79, 52);
    // clear();
    //orbitControl(4, 4);//3D mouse control
    push();
    rotateX(60);
    stroke(this.myPicker.color());
    for(let theta = 0; theta < 60; theta += 1){
      beginShape(POINTS);
        for(let phi = 0; phi < 360; phi += 2){
          let r = (70*pow(abs(sin(phi*3)),1)+225)*theta/60;
          let x = r * cos(phi);
          let y = r * sin(phi);

          let z = vShape(350, r/100, 0.8, 0.15)-200 +
          perturbation(1.5, r/100, 12, phi);

          vertex(x, y, z);
        }
      endShape();
    }
    pop();
  }
  
}

window.Lilly = Lilly;

function vShape(A, r, a, b){
  return A*pow(Math.E, -b * pow(abs(r), 1.5))*pow(abs(r), a);
}

function perturbation(A, r, p, angle){
  return 1 + A * pow(r, 2) * sin(p*angle);
}