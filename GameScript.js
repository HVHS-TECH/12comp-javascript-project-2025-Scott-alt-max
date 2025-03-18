// TODO 
// Remember that the maze coordinates are flipped!!!!!!!!!!!!!!!!!!
// Change NumberOfVerticalWalls to NumberOfSquaresWide or something similar
// Fix all other variable names to naming conventions
// Create a function that initalises the maze based off of the dimentions
// Create a function that once the trail finishes its walk, it adds the trail to the maze
// Loop over the 
// Draw the finished maze
// Change the way the draw function works so the coordinates match the maze coordinates
// Actually turn it into a playable game

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
    Maze[SquareY][SquareX] = 6;
    console.log("Maze initailisation square at " + SquareX + ", " + SquareY);
}

function RandomWalk() {
    // Create a 2D array that stores the array co-ordinates of the squares in the random walk
    var RandomWalkCoordinates = [];

    // Start at a random square
    var SquareX = Math.floor(Math.random() * (NumberOfVerticalWalls + 1)) * 2 + 1;
    var SquareY = Math.floor(Math.random() * (NumberOfHorisontalWalls + 1)) * 2 + 1;

    // If the starting co-ordinates are already a part of the maze, keep trying until you find one that isnt
    while(Maze[SquareY][SquareX] == 6) {
        SquareX = Math.floor(Math.random() * (NumberOfVerticalWalls + 1)) * 2 + 1;
        SquareY = Math.floor(Math.random() * (NumberOfHorisontalWalls + 1)) * 2 + 1;
    }
    Maze[SquareY][SquareX] = 5;
    RandomWalkCoordinates.push([SquareX, SquareY]);

    console.log("Starting coordinates at " + RandomWalkCoordinates[0]);
    
    var ReachedTheMaze = false;
    // Pick a random direction
    while(!ReachedTheMaze) {
        switch (Math.floor(Math.random() * 4)) {
            case 0:
                console.log("Up");
                // Go up

                // See if next wall is edge wall, if it is, restart with another direction
                if (IsNextWallAnEdge(SquareX, (SquareY - 1))) { break; }

                // See if next square is part of trail, if it is, backtrack until it gets back to the square and move back to that square
                else if (IsNextSquarePartOfTrail(SquareX, (SquareY - 2))) {
                    Backtrack(SquareX, (SquareY - 2));
                    SquareY -= 2;
                }

                // See if next square is part of maze
                else if(isNextSquarePartOfMaze(SquareX, (SquareY - 2))) {
                    // If next square is a part of the maze, add the co-ordinates to the random walk and break the while loop
                    RandomWalkCoordinates.push([SquareX, SquareY - 2]);
                    ReachedTheMaze = true;
                }

                // See if none are true
                else {
                    // If none are true, change the coordinates to the new square, and add the co-ordinates to the random walk;
                    SquareY -= 2;
                    Maze[SquareY][SquareX] = 5;
                    RandomWalkCoordinates.push([SquareX, SquareY]);
                }
                break;
            case 1:
                console.log("Right");
                // Go right

                // See if next wall is edge wall, if it is, restart with another direction
                if (IsNextWallAnEdge((SquareX + 1), SquareY)) { break; }

                // See if next square is part of trail, if it is, backtrack until it gets back to the square and move back to that square
                else if (IsNextSquarePartOfTrail((SquareX + 2), SquareY)) {
                    Backtrack((SquareX + 2), SquareY);
                    SquareX += 2;
                }

                // See if next square is part of maze
                else if(isNextSquarePartOfMaze((SquareX + 2), SquareY)) {
                    // If next square is a part of the maze, add the co-ordinates to the random walk and break the while loop
                    RandomWalkCoordinates.push([(SquareX + 2), SquareY]);
                    ReachedTheMaze = true;
                }

                // See if none are true
                else {
                    // If none are true, change the coordinates to the new square, and add the co-ordinates to the random walk;
                    SquareX += 2;
                    Maze[SquareY][SquareX] = 5;
                    RandomWalkCoordinates.push([SquareX, SquareY]);
                }
                break;
            case 2:
                console.log("Down");
                // Go down                
                 
                // See if next wall is edge wall, if it is, restart with another direction
                if (IsNextWallAnEdge(SquareX, (SquareY + 1))) { break; }

                // See if next square is part of trail, if it is, backtrack until it gets back to the square and move back to that square
                else if (IsNextSquarePartOfTrail(SquareX, (SquareY + 2))) {
                    Backtrack(SquareX, (SquareY + 2));
                    SquareY += 2;
                }

                // See if next square is part of maze
                else if(isNextSquarePartOfMaze(SquareX, (SquareY + 2))) {
                    // If next square is a part of the maze, add the co-ordinates to the random walk and break the while loop
                    RandomWalkCoordinates.push([SquareX, SquareY + 2]);
                    ReachedTheMaze = true;
                }

                // See if none are true
                else {
                    // If none are true, change the coordinates to the new square, and add the co-ordinates to the random walk;
                    SquareY += 2;
                    Maze[SquareY][SquareX] = 5;
                    RandomWalkCoordinates.push([SquareX, SquareY]);
                }
                break;
            case 3:
                console.log("Left");
                // Go left

                // See if next wall is edge wall, if it is, restart with another direction
                if (IsNextWallAnEdge((SquareX - 1), SquareY)) { break; }

                // See if next square is part of trail, if it is, backtrack until it gets back to the square and move back to that square
                else if (IsNextSquarePartOfTrail((SquareX - 2), SquareY)) {
                    Backtrack((SquareX - 2), SquareY);
                    SquareX -= 2;
                }

                // See if next square is part of maze
                else if(isNextSquarePartOfMaze((SquareX - 2), SquareY)) {
                    // If next square is a part of the maze, add the co-ordinates to the random walk and break the while loop
                    RandomWalkCoordinates.push([(SquareX - 2), SquareY]);
                    ReachedTheMaze = true;
                }

                // See if none are true
                else {
                    // If none are true, change the coordinates to the new square, and add the co-ordinates to the random walk;
                    SquareX -= 2;
                    Maze[SquareY][SquareX] = 5;
                    RandomWalkCoordinates.push([SquareX, SquareY]);
                }
        }
    }
    console.log(RandomWalkCoordinates);

    function Backtrack(targetX, targetY) {
        // Backtrack through the random walk coordinates array, removing all items as it goes, until it reaches the target
        // Also change those coordinates to not be a part of the trail anymore
        while(( RandomWalkCoordinates[RandomWalkCoordinates.length - 1][0] != targetX) || 
                RandomWalkCoordinates[RandomWalkCoordinates.length - 1][1] != targetY) {
            console.log("Backtracking");
            Maze[RandomWalkCoordinates[RandomWalkCoordinates.length - 1][1]][RandomWalkCoordinates[RandomWalkCoordinates.length - 1][0]] = 4;
            RandomWalkCoordinates.pop();
        }
    }
}

function IsNextWallAnEdge(wallX, wallY) {
    if (Maze[wallY][wallX] == 3) {
        console.log("Reached an edge");
        return true;
    } else {
        return false;
    }
}
function IsNextSquarePartOfTrail(squareX, squareY) {
    if (Maze[squareY][squareX] == 5) {
        console.log("Gone back to the trail");
        return true;
    } else {
        return false;
    }
}
function isNextSquarePartOfMaze(squareX, squareY) {
    if (Maze[squareY][squareX] == 6) {
        console.log("Reached the a part of the maze");
        return true;
    } else {
        return false;
    }
}

//console.log(Maze);
InitaliseRandomMazeSquare();
RandomWalk();
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