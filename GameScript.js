// Consts and Variables
const GameWidth = 800;
const GameHeight = 800;
const MazeWallsColor = "Black";
const MazeWallWidth = 10;
const NumberOfVerticalWalls = 3;
const NumberOfHorisontalWalls = 3;

var MazeWalls;
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
    MakeWall(7,7,7,9);

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