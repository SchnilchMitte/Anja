// === Class-Based Flower System ===
let flower;
let flowerTypes = {};
let currentType = 'Lilly';
let flowerSelect;

function setup() {
  canvas = createCanvas(700, 700, WEBGL);
  canvas.id('canvas');
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  // Dropdown to switch flower type
  flowerSelect = createSelect();
  flowerSelect.position(10, 10);
  flowerSelect.class("DropDown");
  
  flowerSelect.option('Lilly');
  flowerSelect.option('LillyColored');
  flowerSelect.option('Camellia');
  flowerSelect.option('Dahlia');
  flowerSelect.option('Lotus');
  flowerSelect.option('Rose');
  flowerSelect.option('Zinnia');
  //flowerSelect.option('your favorite ❤️');
  flowerSelect.changed(onFlowerChange);

  // Register flower classes
  /*flowerTypes['Lilly'] = new Lilly();
  flowerTypes['Lilly colored'] = new LillyColored();
  flowerTypes['Rose'] = new Rose();
  flowerTypes['your favorite ❤️'] = new Dahlia();*/
  console.log("all,", flowerSelect.elt.options);
  flowerSelect.elt.options.forEach( (name)=>{
    console.log("flowert Trick", name.value);
    flowerTypes[name.value] = new window[name.value](); // Assumes each flower class exists globally
  })

  flower = flowerTypes[currentType];
  //flower.createSliders();

  flowerSelect.selected('Lilly');  // Set default
  onFlowerChange();                // Trigger initial load
}

function draw() {
  clear();
  orbitControl(flower.controlls);
  //rotateX(60);
  flower.updateParams();
  flower.display();
  flower.showSliders();
}

function onFlowerChange() {
  currentType = flowerSelect.value();
  flower = flowerTypes[currentType];
  for (let f in flowerTypes){ 
    //flowerTypes[f].hideSliders();
    flowerTypes[f].deleteSliders();
  } 
  flower.setup(); 
  flower.createSliders();
  
}


