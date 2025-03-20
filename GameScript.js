// TODO 
// Remember that the maze coordinates are flipped!!!!!!!!!!!!!!!!!!
// Change NumberOfVerticalWalls to NumberOfSquaresWide or something similar
// Fix all other variable names to naming conventions
// Create a function that initalises the maze based off of the dimentions
// Loop over the maze until all squares are a part of the maze
// Draw the finished maze
// Change the way the draw function works so the coordinates match the maze coordinates
// Actually turn it into a playable game

// Consts and Variables
const GameWidth = 800;
const GameHeight = 800;
const MazeWallsColor = "Black";
const MazeWallWidth = 10;
const SQUARESWIDE = 15;
const SQUARESTALL = 15;

var MazeWalls;

// For the middle squares of the maze, a 6 means part of the maze, a 5 means a part of the trail, and a 4 means not part of the maze or trail, 
// and for the walls, a 3 means an edge wall, a 2 means a wall, a 1 means a gap, and a 0 mean a corner
// Example 4 by 4 maze:
/* var Maze =  [[0, 3, 0, 3, 0, 3, 0, 3, 0],
                [3, 4, 2, 4, 2, 4, 2, 4, 3],
                [0, 2, 0, 2, 0, 2, 0, 2, 0],
                [3, 4, 2, 4, 2, 4, 2, 4, 3],
                [0, 2, 0, 2, 0, 2, 0, 2, 0],
                [3, 4, 2, 4, 2, 4, 2, 4, 3],
                [0, 2, 0, 2, 0, 2, 0, 2, 0],
                [3, 4, 2, 4, 2, 4, 2, 4, 3],
                [0, 3, 0, 3, 0, 3, 0, 3, 0]];*/

// Functions to create the inital template of the maze, pictured above
var Maze = [];
function InitialiseMaze() {
    Maze.push(CreateWallRow(true));
    Maze.push(CreateSquareRow());
    for (var i = 0; i < SQUARESTALL - 1; i++) {
        Maze.push(CreateWallRow(false));
        Maze.push(CreateSquareRow());
    }
    Maze.push(CreateWallRow(true));
}
function CreateWallRow(IsTopOrBottomWall) {
    var MazeRow = [];
    for (var i = 0; i < SQUARESWIDE; i++) {
        MazeRow.push(0);
        if (IsTopOrBottomWall) {
            MazeRow.push(3);
        } else {
            MazeRow.push(2);
        }
    }
    MazeRow.push(0);
    return MazeRow;
}
function CreateSquareRow() {
    var MazeRow = [];
    MazeRow.push(3);
    MazeRow.push(4);
    for (var i = 0; i < SQUARESWIDE - 1; i++) {
        MazeRow.push(2);
        MazeRow.push(4);
    }
    MazeRow.push(3);
    return MazeRow;
}

// Functions to create the trails in the maze
function InitaliseRandomMazeSquare() {
    var SquareX = Math.floor(Math.random() * SQUARESWIDE) * 2 + 1;
    var SquareY = Math.floor(Math.random() * SQUARESTALL) * 2 + 1;
    Maze[SquareY][SquareX] = 6;
    console.log("Maze initailisation square at " + SquareX + ", " + SquareY);

    // Return the number of squares added to the maze (1)
    return 1;
}
function RandomWalk() {
    // Create a 2D array that stores the array co-ordinates of the squares in the random walk
    var RandomWalkCoordinates = [];

    // Start at a random square
    var SquareX = Math.floor(Math.random() * SQUARESWIDE) * 2 + 1;
    var SquareY = Math.floor(Math.random() * SQUARESTALL) * 2 + 1;

    // If the starting co-ordinates are already a part of the maze, keep trying until you find one that isnt
    while (Maze[SquareY][SquareX] == 6) {
        SquareX = Math.floor(Math.random() * SQUARESWIDE) * 2 + 1;
        SquareY = Math.floor(Math.random() * SQUARESTALL) * 2 + 1;
    }
    Maze[SquareY][SquareX] = 5;
    RandomWalkCoordinates.push([SquareX, SquareY]);

    console.log("Starting coordinates for the random walk at " + RandomWalkCoordinates[0]);
    
    var ReachedTheMaze = false;
    // Pick a random direction
    while (!ReachedTheMaze) {
        switch (Math.floor(Math.random() * 4)) {
            case 0:
                // Go up

                // See if next wall is edge wall, if it is, restart with another direction
                if (IsNextWallAnEdge(SquareX, (SquareY - 1))) { break; }

                // See if next square is part of trail, if it is, backtrack until it gets back to the square
                if (IsNextSquarePartOfTrail(SquareX, (SquareY - 2))) { Backtrack(SquareX, (SquareY - 2)); }

                // See if next square is part of maze, if it is, break the while loop
                if (isNextSquarePartOfMaze(SquareX, (SquareY - 2))) { ReachedTheMaze = true; }

                // Move, add the direction to the random walk array, mark the new square as part of the trail
                // and add the new coordinates to the random walk array
                SquareY -= 2;
                Maze[SquareY][SquareX] = 5;
                RandomWalkCoordinates.push([SquareX, SquareY]);
                break;
            case 1:
                // Go right

                if (IsNextWallAnEdge((SquareX + 1), SquareY)) { break; }
                if (IsNextSquarePartOfTrail((SquareX + 2), SquareY)) { Backtrack((SquareX + 2), SquareY); }
                if (isNextSquarePartOfMaze((SquareX + 2), SquareY)) { ReachedTheMaze = true; }

                SquareX += 2;
                Maze[SquareY][SquareX] = 5;
                RandomWalkCoordinates.push([SquareX, SquareY]);
                break;
            case 2:
                // Go down   
                
                if (IsNextWallAnEdge(SquareX, (SquareY + 1))) { break; }
                if (IsNextSquarePartOfTrail(SquareX, (SquareY + 2))) { Backtrack(SquareX, (SquareY + 2)); }
                if (isNextSquarePartOfMaze(SquareX, (SquareY + 2))) { ReachedTheMaze = true; }

                SquareY += 2;
                Maze[SquareY][SquareX] = 5;
                RandomWalkCoordinates.push([SquareX, SquareY]);
                break;
            case 3:
                // Go left

                if (IsNextWallAnEdge((SquareX - 1), SquareY)) { break; }
                if (IsNextSquarePartOfTrail((SquareX - 2), SquareY)) { Backtrack((SquareX - 2), SquareY); }
                if (isNextSquarePartOfMaze((SquareX - 2), SquareY)) {  ReachedTheMaze = true; }
                
                SquareX -= 2;
                Maze[SquareY][SquareX] = 5;
                RandomWalkCoordinates.push([SquareX, SquareY]);
        }
    }
    console.log(RandomWalkCoordinates);
    
    // Iterate over the random walk array and change each square to part of the maze, 
    // and each wall to a gap by taking the average co-ordinates of two adjacent parts of the trail
    var NumberOfSquaresAddedToMaze = 0;
    for (var i = 0; i < RandomWalkCoordinates.length - 1; i++) {
        NumberOfSquaresAddedToMaze++;
        var MazeX = RandomWalkCoordinates[i][0];
        var MazeY = RandomWalkCoordinates[i][1];

        var NextMazeX = RandomWalkCoordinates[i + 1][0];
        var NextMazeY = RandomWalkCoordinates[i + 1][1];

        Maze[MazeY][MazeX] = 6;
        Maze[(MazeY + NextMazeY) / 2][(MazeX + NextMazeX) / 2] = 1;
    }
    Maze[SquareY][SquareX] = 6;
    
    // Return the number of squares added to the maze
    return NumberOfSquaresAddedToMaze;

    function Backtrack(targetX, targetY) {
        // Backtrack through the random walk coordinates array, removing all items as it goes, until it reaches the target
        // Also change those coordinates to not be a part of the trail anymore
        while ((RandomWalkCoordinates[RandomWalkCoordinates.length - 1][0] != targetX) || 
                RandomWalkCoordinates[RandomWalkCoordinates.length - 1][1] != targetY) {
            Maze[RandomWalkCoordinates[RandomWalkCoordinates.length - 1][1]][RandomWalkCoordinates[RandomWalkCoordinates.length - 1][0]] = 4;
            RandomWalkCoordinates.pop();
        }
        // Delete the co-ordinates that the trail is currently on, and add them back in the same logic as for just moving up
        RandomWalkCoordinates.pop();
    }
}
function IsNextWallAnEdge(wallX, wallY) {
    if (Maze[wallY][wallX] == 3) {
        // console.log("Reached an edge");
        return true;
    } else {
        return false;
    }
}
function IsNextSquarePartOfTrail(squareX, squareY) {
    if (Maze[squareY][squareX] == 5) {
        // console.log("Gone back to the trail");
        return true;
    } else {
        return false;
    }
}
function isNextSquarePartOfMaze(squareX, squareY) {
    if (Maze[squareY][squareX] == 6) {
        // console.log("Reached the a part of the maze");
        return true;
    } else {
        return false;
    }
}
function CreateMaze() {
    // While there are still squares not part of the maze, keep doing the random walk function until the maze is finished
    var NumberOfSquaresAddedToMaze = 0;
    var NumberOfSquaresInMaze = SQUARESTALL * SQUARESWIDE;
    InitialiseMaze();
    NumberOfSquaresAddedToMaze += InitaliseRandomMazeSquare();
    while (NumberOfSquaresAddedToMaze < NumberOfSquaresInMaze) {
        NumberOfSquaresAddedToMaze += RandomWalk();
    }
}
CreateMaze();
console.log(Maze);

// Setup function
function setup() {
    console.log("Setup started");

    cnw = new Canvas(GameWidth, GameWidth);
    world.gravity.y = 10;

    //Player = new Sprite(500, 200, 100, 50, "d");

    MazeWalls = new Group();
    for (var i = 0; i < SQUARESWIDE; i++) {
        for (var j = 0; j < SQUARESTALL; j++) {
            MakeWall(i, j, i, j);
            //alert(i + " " + j + " " + i + " " + j + " ");
        }
    }

    // Make the walls
    MakeWall(0, 0, SQUARESWIDE, 0);
    MakeWall(SQUARESWIDE, 0, SQUARESWIDE, SQUARESTALL);
    MakeWall(0, 0, 0, SQUARESTALL);
    MakeWall(0, SQUARESTALL, SQUARESWIDE, SQUARESWIDE);

    MakeWall(3, 0, 3, 2);
    MakeWall(1, 1, 3, 1);
    MakeWall(1, 2, 1, 3);
    MakeWall(0, 2, 2, 2);
    MakeWall(2, 2, 2, 3);
    MakeWall(2, 3, 3, 3);

    console.log("Setup finished");
}

function MakeWall(StartingX, StartingY, EndingX, EndingY) {
    // Function that takes in two co-ordinates and make a wall between them
    // Make the grid a 21 by 21 square, and pass in points to that square

    // Check for ArgumentOutOfBounds
    // Check for Ending being below the starting coordinates


    // Create new sprite
    var HorisontalWallGap = GameWidth / SQUARESWIDE;
    var VerticalWallGap = GameHeight / SQUARESTALL;

    var WallX = HorisontalWallGap * StartingX + (HorisontalWallGap * EndingX - HorisontalWallGap * StartingX) / 2;
    var WallY = VerticalWallGap * StartingY + (VerticalWallGap * EndingY - VerticalWallGap * StartingY) / 2;
    var WallEndX = HorisontalWallGap * EndingX - HorisontalWallGap * StartingX + MazeWallWidth;
    var WallEndY = VerticalWallGap * EndingY - VerticalWallGap * StartingY + MazeWallWidth;
    MazeWall = new Sprite(WallX, WallY, WallEndX, WallEndY, "k");
    MazeWall.color = "#6B5C7D";

    MazeWalls.add(MazeWall);
}


function draw() {
    background("#355C7D");
}