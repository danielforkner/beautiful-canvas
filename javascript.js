

populateGrid(10);

// nav buttons
let colorBtn = document.querySelector('.colorBtn');

colorBtn.addEventListener("click", function() {
    document.querySelector('#colorSlider').classList.toggle('disabled');
})


// size is the number of rows & columns e.g. '25' == 25x25
function populateGrid(size) {
    let grid = document.querySelector('.grid');
    let pixel;

    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    // loop to create sizeXsize pixels
    let count = size * size;
    for (let i = 0; i < count; i++) {
        pixel = document.createElement('div');
        pixel.classList.add('pixel');
        // change color when mouse over
        pixel.addEventListener('mouseenter', function(event) {
            let pickedColor = getComputedStyle(document.documentElement).getPropertyValue('--selectedColor');
            event.target.style.backgroundColor = pickedColor;
        })
        grid.append(pixel);
    }
}

// color picker nav item
let colorPicker = new iro.ColorPicker('#colorSlider', {
    color: "rgb(255, 0, 0)",
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
    document.documentElement.style.setProperty('--selectedColor', color.hexString);
})
