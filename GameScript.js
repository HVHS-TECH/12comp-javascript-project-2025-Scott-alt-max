// Consts and Variables
const GameWidth = 800;
const GameHeight = 800;
const MazeWallsColor = "Black";
const MazeWallWidth = 10;
const NumberOfVerticalWalls = 3;
const NumberOfHorisontalWalls = 3;

var MazeWalls;
// For the middle squares of the maze, a 4 means part of the maze, a 3 means not part of the maze, 
// and for the walls, a 2 means an edge wall, a 1 means a wall, a zero means a gap, and a -1 mean a corner
var Maze = [[-1,  2, -1,  2, -1,  2, -1,  2, -1],
            [ 2,  3,  1,  3,  1,  3,  1,  3,  2],
            [-1,  1, -1,  1, -1,  1, -1,  1, -1],
            [ 2,  3,  1,  3,  1,  3,  1,  3,  2],
            [-1,  1, -1,  1, -1,  1, -1,  1, -1],
            [ 2,  3,  1,  3,  1,  3,  1,  3,  2],
            [-1,  1, -1,  1, -1,  1, -1,  1, -1],
            [ 2,  3,  1,  3,  1,  3,  1,  3,  2],
            [-1,  2, -1,  2, -1,  2, -1,  2, -1]];

function InitaliseRandomMazeSquare() {
    var SquareX = Math.floor(Math.random() * (NumberOfVerticalWalls + 1)) * 2 + 1;
    var SquareY = Math.floor(Math.random() * (NumberOfHorisontalWalls + 1)) * 2 + 1;
    Maze[SquareX][SquareY] = 4;
}

function RandomWalk() {
    // Create a 2D array that stores the array co-ordinates of the squares in the random walk

    // Start at a random square
    var SquareX = Math.floor(Math.random() * (NumberOfVerticalWalls + 1)) * 2 + 1;
    var SquareY = Math.floor(Math.random() * (NumberOfHorisontalWalls + 1)) * 2 + 1;
    if (Maze[SquareX][SquareY] == 4) {
        console.log("Staring square of the random walk was already part of the maze");
        return
    }

    // Pick a random direction
    var Direction = (Math.floor(Math.random() * 2)) - 1;
    if (Math.random > 0.5) {
        // If the wall is a edge wall, go back
        if (Maze[SquareX][SquareY + Direction] == 2) {
            console.log("The next square is a edge wall");
        }
    } else {
        if (Maze[SquareX + Direction][SquareY == 2]){
            console.log("The next square is a edge wall");
        }
    }

    // If not, go to the next square

    // If the next square is part of the trail, retrack and delete those square from the trail until you get back to that square

    // If the next square is not part of the trail, add it to the trail, then repeat from a random direction

    // If the next square is part of the maze (NextSquare ==  4) add the trail to the maze by making all of the walls between the square 0 instead of 1

    // Repeat until all square are a part of the maze
}

console.log(Maze);
InitaliseRandomMazeSquare();
console.log(Maze);

// Setup function
function setup() {
    console.log("Setup started");

    cnw = new Canvas(GameWidth, GameWidth);
    world.gravity.y = 10;

    //Player = new Sprite(500, 200, 100, 50, "d");

    MazeWalls = new Group();
    for (var i = 0; i <= NumberOfVerticalWalls + 2; i++) {
        for (var j = 0; j <= NumberOfHorisontalWalls + 2; j++) {
            MakeWall(i, j, i, j);
            //alert(i + " " + j + " " + i + " " + j + " ");
        }
    }

    // Make the walls
    MakeWall(0, 0, NumberOfVerticalWalls + 1, 0);
    MakeWall(NumberOfVerticalWalls + 1, 0, NumberOfVerticalWalls + 1, NumberOfHorisontalWalls + 1);
    MakeWall(0, 0, 0, NumberOfHorisontalWalls + 1);
    MakeWall(0, NumberOfHorisontalWalls + 1, NumberOfVerticalWalls + 1, NumberOfVerticalWalls + 1);

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
    var HorisontalWallGap = GameWidth / (NumberOfVerticalWalls + 1);
    var VerticalWallGap = GameHeight / (NumberOfHorisontalWalls + 1);

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