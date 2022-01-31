populateGrid(100);


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
        grid.append(pixel);
    }
}