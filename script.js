let DEFAULT_GRID_SIZE = 16
let currentGridSize = DEFAULT_GRID_SIZE;
let isMouseDown = false;
let isEraserModeActive = false;


document.addEventListener('DOMContentLoaded', init)


function init() {
    create(DEFAULT_GRID_SIZE); // create default 16x16 grid on initial load


    const container = document.getElementById("grid-container");

    container.addEventListener("mousedown", (event) => {
        if (event.button === 0 && event.target !== container) {
            isMouseDown = true;
            fillDiv(event.target);
        }
    });

    container.addEventListener("mouseover", (event) => {
        if (isMouseDown && event.target !== container) {
            fillDiv(event.target);
        }
    });

    document.addEventListener("mouseup", (event) => {
        if (event.button === 0) {
            isMouseDown = false;
        }
    });
}


/**
 * Clears all the child div elements in the grid-container to create a blank slate.
 *
 * Then prompts the user to input a grid size.
 */
function setGridSize() {
    document.getElementById("grid-container").replaceChildren();

    let isValid = false;

    while (!isValid) {
        currentGridSize = prompt("Please enter desired square grid size:");

        if (isNaN(currentGridSize) || currentGridSize.trim() === "") {
            alert("Please enter a valid integer between 1 and 100 inclusive");
            continue;
        }

        currentGridSize = parseInt(currentGridSize);

        // Check if it's positive and within reasonable bounds
        if (currentGridSize < 1) {
            alert("Grid size must be at least 1");
            continue;
        }

        if (currentGridSize > 100) {
            alert("Grid size cannot exceed 100");
            continue;
        }

        isValid = true;
    }

    create(currentGridSize);
}

/**
 * Redraw the previous grid resetting the users drawing.
 */
function redrawPreviousGrid() {
    document.getElementById("grid-container").replaceChildren();
    create(currentGridSize);
}

function fillDiv(div) {
    if (isEraserModeActive) {
        div.style.backgroundColor = "";
    } else {
        div.style.backgroundColor = "cyan";
    }
}


/**
 * Create a square div grid of size n x n (where squareGridSize = n)
 * @param squareGridSize
 */
function create(squareGridSize) {
    const container = document.getElementById("grid-container");
    const itemWidth = (100 / squareGridSize) + "%";

    // Set CSS variable on container
    container.style.setProperty("--item-width", itemWidth);

    for (let i = 1; i <= squareGridSize; i++) {
        for (let j = 1; j <= squareGridSize; j++) {
            const div = document.createElement("div");
            container.appendChild(div);
        }
    }
}


function toggleDrawMode() {
    isEraserModeActive = !isEraserModeActive;

    if (isEraserModeActive) {
        document.getElementById("grid-container").style.cursor = "url('bomb-icon.png'), auto";
    } else {
        document.getElementById("grid-container").style.cursor = "auto";
    }

    document.getElementById("eraser-button").textContent = isEraserModeActive ? "Eraser Mode Active" : "Draw Mode Active";
}