function colorChooser (heat, maxHeat) {
    var percentile = heat / maxHeat;
    if (percentile < 1/800) {
        return ("rgb(0, 0, 0)");
    } else if (percentile < 1/12) {
        return ("rgb(99, 17, 0)");
    } else if (percentile < 2/12) {
        return ("rgb(153, 33, 0)");
    } else if (percentile < 3/12) {
        return ("rgb(198, 14, 0)");
    } else if (percentile < 4/12) {
        return ("rgb(252, 66, 0)");
    } else if (percentile < 5/12) {
        return ("rgb(252, 79, 0)");
    } else if (percentile < 6/12) {
        return ("rgb(252, 92, 0)");
    } else if (percentile < 7/12) {
        return ("rgb(252, 102, 0)");
    } else if (percentile < 8/12) {
        return ("rgb(252, 113, 0)");
    } else if (percentile < 9/12) {
        return ("rgb(252, 148, 0)");
    } else if (percentile < 10/12) {
        return ("rgb(252, 183, 0)");
    } else if (percentile < 11/12) {
        return ("rgb(252, 207, 0)");
    } else {
        return ("rgb(252, 228, 0)");
    }
}

function colorChooserText (heat, maxHeat) {
    var percentile = heat / maxHeat;
    if (percentile < 2/3) {
        return ("rgb(255, 255, 255)");
    } else {
        return ("rgb(0, 0, 0)");
    }
}

function sizeChecked(size) {
    //var sizeRadio = document.getElementById("gridSize");
    //console.log(sizeRadio);
    gridSize = size;
    if(size === 17) {
        maxHeat = 70;
    } else if (size === 13) {
        maxHeat = 42.5;
    } else if (size === 11) {
        maxHeat = 31;
    } else if (size === 7) {
        maxHeat = 13.3;
    } else if (size === 5) {
        maxHeat = 7.1;
    } else if (size === 3) {
        maxHeat = 2.7;
    } else {
        console.log ("sizeChecked: invalid size");
    }
    initializeGridHTML(gridSize);
    initializeGridData(gridSize);
}

function speedChanged() {
    var speed = document.getElementById("intervalSpeed");
    //console.log(speed.value);
    intervalRate = speed.value;
}

function cellClicked (row, column) {
    grid[row][column].selected = !grid[row][column].selected;
    //console.log(row, column, grid[row][column].selected);

    // change the border for that cell
    var cellID = 'r' + row + '-' + column;
    //console.log(cellID);
    var cell = document.getElementById(cellID);

    if (grid[row][column].selected) {
        cell.style.borderColor = "red";
    } else {
        cell.style.borderColor = "black";
    }
}

function initializeGridHTML(size) {
    var grid = document.getElementById("grid");

    var gridHTML = "";

    for (var i = 1; i <= size; i++) {
        gridHTML += '<div class=\"row\">';

        for (var j = 1; j <= size; j++) {
            gridHTML += '<div class=\"cell\" id="r' + i + '-' + j + '\" onclick=\"cellClicked(' + i + ', ' + j + ')\">0</div>';
        }
        gridHTML += "</div>";
    }

    grid.style.width = (size * 30) + "px";
    grid.style.height = (size * 30) + "px";

    //console.log(gridHTML);
    grid.innerHTML = gridHTML;
}

function initializeGridData(size) {
    // initialize a 2-dimensional array
    grid = new Array(gridSize + 1);
    for (var i=0; i <= gridSize + 1; i++) {
        grid[i] = new Array(gridSize + 1);
    }

// the grid is going to go from 0 to gridsize+1.
// The 0 row and column and gridsize+1 row and column will have temperature 0, and never change.
    for (i=0; i <= gridSize + 1; i++) {
        for (var j=0; j <= gridSize + 1; j++) {
            grid[i][j] = new Object();
            grid[i][j].temperature = 0;
            grid[i][j].lasttemp = 0;
            grid[i][j].selected = false;     // should start off
        }
    }
}

function heatInterval(size) {
    for (var i = 1; i <= size; i++) {
        for (var j = 1; j <= size; j++) {
            // First, increase temperature for all selected by 1 degree.
            if (grid[i][j].selected) {
                grid[i][j].temperature += heatIncrease;
            }
            // Then, save a copy of the temperatures so we can do averages based on them.
            grid[i][j].lasttemp = grid[i][j].temperature;
        }
    }

    // Now set new temperatures based on the average of your temperature and the cell on each side of you.
    // Note: cells on the edge and on the corners have invisible cells off the grid whose temp is always 0.
    for (i = 1; i <= size; i++) {
        for (j = 1; j <= size; j++) {
            grid[i][j].temperature = (
                grid[i-1][j-1].lasttemp +
                grid[i-1][j].lasttemp +
                grid[i-1][j+1].lasttemp +
                grid[i][j-1].lasttemp +
                grid[i][j].lasttemp +
                grid[i][j+1].lasttemp +
                grid[i+1][j-1].lasttemp +
                grid[i+1][j].lasttemp +
                grid[i+1][j+1].lasttemp
            ) / 9;
            var color = colorChooser(grid[i][j].temperature, maxHeat);
            var textColor = colorChooserText(grid[i][j].temperature, maxHeat);
            var cellID = "r" + i + "-" + j;
            //console.log(cellID);
            var cell = document.getElementById(cellID);
            cell.style.backgroundColor = color;
            cell.style.color = textColor;
        }
    }
}

function updateGridHTML(size) {
    var totalHeat = 0;
    for (var i = 1; i <= size; i++) {
        for (var j = 1; j <= size; j++) {
            totalHeat += grid[i][j].temperature;
            var cell = document.getElementById("r" + i + "-" + j);
            cell.innerHTML = Math.round(grid[i][j].temperature*10)/10;
        }
    }
    document.getElementById("totalHeat").innerHTML = (Math.round(totalHeat*10)/10).toLocaleString(undefined,
        {"minimumFractionDigits":1,"maximumFractionDigits":1});

    // Set the time for the next update.
    window.setTimeout(function(){
        heatInterval(gridSize);
        updateGridHTML(gridSize);
    }, 1000 / intervalRate);
}

function turnAllOn() {
    for (var i = 1; i <= gridSize; i++) {
        for (var j = 1; j <= gridSize; j++) {
            if (!grid[i][j].selected) {
                //grid[i][j].selected = true;
                cellClicked(i, j);
            }
        }
    }
}

function turnAllOff() {
    for (var i = 1; i <= gridSize; i++) {
        for (var j = 1; j <= gridSize; j++) {
            if (grid[i][j].selected) {
                //grid[i][j].selected = false;
                cellClicked(i, j);
            }
        }
    }
}

// MAIN ROUTINE HERE

var gridSize = 11;
var heatIncrease = 1;
var intervalRate = 5;
var maxHeat = 31;
var grid = "";

initializeGridHTML(gridSize);
initializeGridData(gridSize);

// set the first setTimeout. Each subsequent one gets set in the updateGridHTML function.
window.setTimeout(function(){
    heatInterval(gridSize);
    updateGridHTML(gridSize);
}, 1000 / intervalRate);
