// TODO remember that the maze coordinates are flipped
// finish the isNextSquarePartOfMaze function

// Consts and Variables
const GameWidth = 800;
const GameHeight = 800;
const MazeWallsColor = "Black";
const MazeWallWidth = 10;
const NumberOfVerticalWalls = 3;
const NumberOfHorisontalWalls = 3;

var MazeWalls;
// For the middle squares of the maze, a 6 means part of the maze, a 5 means a part of the trail, and a 4 means not part of the maze or trail, 
// and for the walls, a 3 means an edge wall, a 2 means a wall, a 1 means a gap, and a 0 mean a corner
var Maze = [[0, 3, 0, 3, 0, 3, 0, 3, 0],
            [3, 4, 2, 4, 2, 4, 2, 4, 3],
            [0, 2, 0, 2, 0, 2, 0, 2, 0],
            [3, 4, 2, 4, 2, 4, 2, 4, 3],
            [0, 2, 0, 2, 0, 2, 0, 2, 0],
            [3, 4, 2, 4, 2, 4, 2, 4, 3],
            [0, 2, 0, 2, 0, 2, 0, 2, 0],
            [3, 4, 2, 4, 2, 4, 2, 4, 3],
            [0, 3, 0, 3, 0, 3, 0, 3, 0]];

function InitaliseRandomMazeSquare() {
    var SquareX = Math.floor(Math.random() * (NumberOfVerticalWalls + 1)) * 2 + 1;
    var SquareY = Math.floor(Math.random() * (NumberOfHorisontalWalls + 1)) * 2 + 1;
    Maze[SquareX][SquareY] = 6;
}

function RandomWalk() {
    // Create a 2D array that stores the array co-ordinates of the squares in the random walk
    var RandomWalkCoordinates = [];

    // Start at a random square
    while(true) {
        var SquareX = Math.floor(Math.random() * (NumberOfVerticalWalls + 1)) * 2 + 1;
        var SquareY = Math.floor(Math.random() * (NumberOfHorisontalWalls + 1)) * 2 + 1;
        if (Maze[SquareX][SquareY] == 6) {
            console.log("Staring square of the random walk was already part of the maze");
        }
        else {
            Maze[SquareX][SquareY] = 5;
            RandomWalkCoordinates.push([SquareX, SquareY]);
            break;
        }
    }
    
    var onAFreeSquare = true;
    // Pick a random direction
    while(onAFreeSquare) {
        switch (Math.floor(Math.random() * 4)) {
            case 0:
                // Go up

                // See if next wall is edge wall
                if(IsNextWallAnEdge(SquareX, (SquareY - 1))) {
                    // If it is, go back
                    break;
                }
                // See if next square is part of trail
                if(IsNextSquarePartOfTrail(SquareX, (SquareY - 2))) {
                    // Backtrack through the Random Walk Coordinates until it reaches the square it is on now
                    while(( RandomWalkCoordinates[RandomWalkCoordinates.length() - 1][0] != SquareX) && 
                            RandomWalkCoordinates[RandomWalkCoordinates.length() - 1][1] != (SquareY - 2)) {
                        RandomWalkCoordinates.pop();
                    }
                    
                    console.log("Gone back to a square that is already part of the trail")
                    // Change the square y to the new coordinates
                    SquareY -= 2;
                }
                // See if next square is part of maze
                if(isNextSquarePartOfMaze()) {
                    onAFreeSquare = false;
                }
                // See if none are true
                else {
                    // If non are true, change the coordinates to the new square;
                    SquareY -= 2;
                    Maze[SquareY][SquareX] = 5;
                }
            case 1:
                // Go right
            case 2:
                // Go down

                // See if next wall is edge wall
                if(IsNextWallAnEdge(SquareX, (SquareY + 1))) {
                    // If it is, go back
                    break;
                }
                // See if next square is part of trail
                if(IsNextSquarePartOfTrail(SquareX, (SquareY - 2))) {
                    // Backtrack through the Random Walk Coordinates until it reaches the square it is on now
                    while(( RandomWalkCoordinates[RandomWalkCoordinates.length() - 1][0] != SquareX) && 
                            RandomWalkCoordinates[RandomWalkCoordinates.length() - 1][1] != (SquareY - 2)) {
                        RandomWalkCoordinates.pop();
                    }
                    
                    console.log("Gone back to a square that is already part of the trail")
                    // Change the square y to the new coordinates
                    SquareY -= 2;
                }
                // See if next square is part of maze
                // See if none are true
                else {
                    // If non are true, change the coordinates to the new square;
                    SquareY -= 2;
                    Maze[SquareY][SquareX] = 5;
                }
            case 3:
                // Go left
        }

        /*var Direction = (Math.floor(Math.random() * 2)) - 1;
        if (Math.random > 0.5) {
            // If the wall is a edge wall, go back
            if (Maze[SquareX][SquareY + Direction] == 2) {
                console.log("The next square is a edge wall");
                break;
            }
            
        } else {
            if (Maze[SquareX + Direction][SquareY == 2]){
                console.log("The next square is a edge wall");
                break;
            }
            
        }*/
    }

    console.log(RandomWalkCoordinates);

    // If not, go to the next square

    // If the next square is part of the trail, retrack and delete those square from the trail until you get back to that square

    // If the next square is not part of the trail, add it to the trail, then repeat from a random direction

    // If the next square is part of the maze (NextSquare ==  5) add the trail to the maze by making all of the walls between the square 0 instead of 1

    // Repeat until all square are a part of the maze
}

function IsNextWallAnEdge(WallX, WallY) {
    if (Maze[WallY][WallX] == 3) {
        return true;
    } else {
        return false;
    }
}
function IsNextSquarePartOfTrail(squareX, squareY) {
    if (Maze[squareY][squareX] == 5) {
        return true;
    } else {
        return false;
    }
}

//console.log(Maze);
InitaliseRandomMazeSquare();
console.log(Maze);
RandomWalk();

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