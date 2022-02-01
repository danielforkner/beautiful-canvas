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
    document.querySelector('.navSubMenu').classList.toggle('disabled');
    document.querySelector('#colorOptions').classList.remove('disabled');
    document.querySelector('.gridOptions').classList.add('disabled');
    document.querySelector('.paintOptions').classList.add('disabled');
}
function toggleGrid() {
    document.querySelector('.navSubMenu').classList.toggle('disabled');
    document.querySelector('#colorOptions').classList.add('disabled');
    document.querySelector('.gridOptions').classList.remove('disabled');
    document.querySelector('.paintOptions').classList.add('disabled');
}
function togglePaint() {
    document.querySelector('.navSubMenu').classList.toggle('disabled');
    document.querySelector('#colorOptions').classList.add('disabled');
    document.querySelector('.gridOptions').classList.add('disabled');
    document.querySelector('.paintOptions').classList.remove('disabled');
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
        document.documentElement.style.setProperty('--oppositeSpotlight', 'rgba(255,255,255,0.5)');
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
        document.documentElement.style.setProperty('--oppositeSpotlight', 'rgba(0,0,0,0.5)');
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
    closeMenu();
});
mdSmBtn.addEventListener("click", () => {
    populateGrid(32);
    closeMenu();
});
mdLrgBtn.addEventListener("click", () => {
    populateGrid(64);
    closeMenu();
});
lrgBtn.addEventListener("click", () => {
    populateGrid(100);
    closeMenu();
});

function closeMenu() {
    let subMenu = document.querySelector('.navSubMenu');
    setTimeout(() => {
        subMenu.classList.toggle('disabled');
    }, 300);
}

// paint options
let lightShowBtn = document.querySelector('.lightShowBtn');
let normalShowBtn = document.querySelector('.normalShowBtn');

lightShowBtn.addEventListener("click", () => {
    changeClass('lightShow', 'normal');
    closeMenu();
});
normalShowBtn.addEventListener("click", () => {
    changeClass('normal', 'lightShow');
    closeMenu();
})

function changeClass(add, remove) {
    let nodesList = document.querySelectorAll('.pixel');
    nodesList.forEach(function(pixel) {
        pixel.classList.remove(remove);
        pixel.classList.add(add);
    })  
}

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
                
            } else if (event.target.classList.contains('lightShow')) {
                event.target.style.backgroundColor = randomColor();
            } else {
                let pickedColor = getComputedStyle(document.documentElement).getPropertyValue('--selectedColor');
                event.target.style.backgroundColor = pickedColor;
                console.log(event.target.style.backgroundColor)
            }            
        })
        grid.append(pixel);
    }
}

function randomColor() {
    let r, g, b;
    r = Math.floor(Math.random() * 255)
    g = Math.floor(Math.random() * 255)
    b = Math.floor(Math.random() * 255)
    return `rgb(${r}, ${g}, ${b})`;
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
