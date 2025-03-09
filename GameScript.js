// Consts and Variables
const GameWidth = 800;
const GameHeight = 800;
const MazeWallsColor = "Black";
const MazeWallWidth = 2;
const NumberOfVerticalWalls = 5;
const NumberOfHorisontalWalls = 5;

var MazeWalls;
// Setup function

function setup() {
    console.log("Setup started");

    cnw = new Canvas(GameWidth, GameWidth);
    world.gravity.y = 10;

    //Player = new Sprite(500, 200, 100, 50, "d");

    WallGroup = new Group();
	Wall_Left = new Sprite(GameWidth + 10, 0, 20, GameHeight * 2, 'k');
	WallGroup.add(Wall_Left);
	Wall_Right = new Sprite(-10, 0, 20, GameHeight * 2, 'k');
	WallGroup.add(Wall_Right);
	Wall_Top = new Sprite(0, -10, GameWidth * 2, 20, 'k');
	WallGroup.add(Wall_Top);
	Wall_Bottom = new Sprite(0, GameHeight + 10, GameWidth * 2, 20, 'k');
	WallGroup.add(Wall_Bottom);

    console.log("Setup finished");
    MazeWalls = new Group();
    MakeWall(0, 1, 1, 1);
    MakeWall(1, 1, 1, 1);
    MakeWall(2, 1, 1, 1);
    MakeWall(3, 1, 1, 1);
    MakeWall(4, 1, 1, 1);
    MakeWall(5, 1, 1, 1);
    MakeWall(6, 1, 1, 1);
}

function MakeWall(StartingX, StartingY, EndingX, EndingY) {
    // Function that takes in two co-ordinates and make a wall between them
    // Make the grid a 21 by 21 square, and pass in points to that square
    // This should make it quicker to create the maze, and it hopefully will give me excellence

    // Check for ArgumentOutOfBounds


    // Create new sprite
    var WallX = GameWidth / (NumberOfVerticalWalls + 1) * StartingX - (MazeWallWidth / 2);
    var WallY = GameHeight / (NumberOfHorisontalWalls + 1) * StartingY - (MazeWallWidth / 2);
    var WallEndX = GameWidth / (NumberOfVerticalWalls + 1) * EndingX - GameWidth / (NumberOfVerticalWalls + 1) * StartingX + MazeWallWidth;
    var WallEndY = GameHeight / (NumberOfHorisontalWalls + 1) * EndingY - GameHeight / (NumberOfHorisontalWalls + 1) * StartingY + MazeWallWidth;
    MazeWall = new Sprite(WallX, WallY, WallEndX, WallEndY, "k");
    MazeWalls.add(MazeWall);
}


function draw() {
    background("blue");
}