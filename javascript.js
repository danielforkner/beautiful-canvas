populateGrid(25);

// nav buttons
let themeBtn = document.querySelector('.themeBtn');
let gridBtn = document.querySelector('.gridBtn');
let colorBtn = document.querySelector('.colorBtn');
let paintBtn = document.querySelector('.paintBtn');


colorBtn.addEventListener("click", toggleColor);
gridBtn.addEventListener("click", toggleGrid);
paintBtn.addEventListener("click", togglePaint);
themeBtn.addEventListener("click", toggleTheme);

// open the nav item selected, and close all others
function toggleColor() {
    document.querySelector('#colorOptions').classList.toggle('disabled');
    document.querySelector('.gridOptions').classList.add('disabled');
    document.querySelector('.paintOptions').classList.add('disabled');
}
function toggleGrid() {
    document.querySelector('#colorOptions').classList.add('disabled');
    document.querySelector('.gridOptions').classList.toggle('disabled');
    document.querySelector('.paintOptions').classList.add('disabled');
}
function togglePaint() {
    document.querySelector('#colorOptions').classList.add('disabled');
    document.querySelector('.gridOptions').classList.add('disabled');
    document.querySelector('.paintOptions').classList.toggle('disabled');
}
function toggleTheme() {
    let themeBtn = document.querySelector('.themeBtn');
    if (themeBtn.classList.contains('lightTheme')) {
        themeBtn.classList.remove('lightTheme');
        themeBtn.classList.add('darkTheme');
        themeBtn.innerHTML = '<i class="far fa-lightbulb"></i>';
        document.documentElement.style.setProperty('--themeColor', 'black');
        document.documentElement.style.setProperty('--oppositeTheme', 'white');
        document.documentElement.style.setProperty('--shadowSize', '12px');
        document.documentElement.style.setProperty('--themeHover', 'purple');
        document.documentElement.style.setProperty('--shadowHue', '#39FF14');
        document.documentElement.style.setProperty('--themeFont', "'Sedgwick Ave', sans-serif");
        document.querySelector('.darkTitle').classList.toggle('alive');
        document.querySelector('.darkTitle').classList.toggle('disabled');
        document.querySelector('title').innerText = 'DARK CANVAS';
    } else {
        themeBtn.classList.remove('darkTheme');
        themeBtn.classList.add('lightTheme');
        themeBtn.innerHTML = '<i class="fas fa-lightbulb"></i>';
        document.documentElement.style.setProperty('--themeColor', 'white');
        document.documentElement.style.setProperty('--oppositeTheme', 'black');
        document.documentElement.style.setProperty('--shadowSize', '1px');
        document.documentElement.style.setProperty('--themeHover', 'yellow');
        document.documentElement.style.setProperty('--shadowHue', 'black');
        document.documentElement.style.setProperty('--themeFont', 'sans-serif');
        document.querySelector('.darkTitle').classList.toggle('alive');
        document.querySelector('.darkTitle').classList.toggle('disabled');
        document.querySelector('title').innerText = 'Beautiful Canvas';
    }
}

// grid options
let smBtn = document.querySelector('.small');
let mdSmBtn = document.querySelector('.medium-small');
let mdLrgBtn = document.querySelector('.medium-large');
let lrgBtn = document.querySelector('.large');

smBtn.addEventListener("click", () => {
    populateGrid(16);
});
mdSmBtn.addEventListener("click", () => {
    populateGrid(32);
});
mdLrgBtn.addEventListener("click", () => {
    populateGrid(64);
});
lrgBtn.addEventListener("click", () => {
    populateGrid(100);
});


// paint options

// size is the number of rows & columns e.g. '25' == 25x25
function populateGrid(size) {
    let grid = document.querySelector('.grid');
    let pixel;

    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    removeDivs('.grid');

    // loop to create sizeXsize pixels
    let count = size * size;
    for (let i = 0; i < count; i++) {
        pixel = document.createElement('div');
        pixel.classList.add('pixel');
        // change color when mouse over
        pixel.addEventListener('mouseenter', function(event) {
            if (event.target.classList.contains('shadeOn')) {
                
            } else if (event.target.classList.contains('randomColor')) {

            } else {
                let pickedColor = getComputedStyle(document.documentElement).getPropertyValue('--selectedColor');
                event.target.style.backgroundColor = pickedColor;
                console.log(event.target.style.backgroundColor)
            }            
        })
        grid.append(pixel);
    }
}

function removeDivs(container) {
    let parent = document.querySelector(container);
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};
























// color picker nav item
let colorPicker = new iro.ColorPicker('#colorOptions', {
    color: "hsl(241, 100%, 50%)",
    borderWidth: 1,
    borderColor: "#fff",
    layoutDirection: 'horizontal',
    layout: [
        {
          component: iro.ui.Slider,
          options: {
            sliderType: 'hue',
          }
        },
        {
           component: iro.ui.Slider,
           options: {
            sliderType: 'value',
            }
        },
        {
           component: iro.ui.Slider,
           options: {
            sliderType: 'saturation',
            }
        },
      ]
});

colorPicker.on('color:change', function(color) {
    document.documentElement.style.setProperty('--selectedColor', color.hslString);
})
