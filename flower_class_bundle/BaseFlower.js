class BaseFlower {
  constructor() {
    this.sliders = {};
  }

  createSlider(name, min, max, val, step = 1) {
    let wrapper = createDiv();
    wrapper.class('valueDisplay');

    let slider = createSlider(min, max, val, step);
    slider.class('Slider');

    //wrapper.child(slider);
    this.sliders[name] = { wrapper, slider };
    wrapper.html(name + ": " + slider.value());

    slider.input(() => {
    wrapper.html(name + ": " + slider.value());
    });
  }

  deleteSliders(){
    for (let name in this.sliders) {
      this.sliders[name].wrapper.remove(); // removes from DOM
      this.sliders[name].slider.remove();
    } 
    this.sliders = {}; // reset
  }

  get(name) {
    return this.sliders[name].slider.value();
  }

  hideSliders() {
    for (let name in this.sliders) {
      this.sliders[name]["slider"].hide();
      this.sliders[name]["wrapper"].hide();
    }
  }

  showSliders() {
    let y = 80;
    for (let name in this.sliders) {
      let elem = this.sliders[name];
      
      elem.wrapper.position(10, y);
      elem.slider.position(10, y+15);
      elem.wrapper.show();
      y += 40;
    }
  }

  setup(){
    
  }
}

window.BaseFlower = BaseFlower;

//opening_.html("Flower opening: " + opening.value());