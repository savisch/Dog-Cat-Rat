let tileImage1 = document.getElementById('tile1');
let tileImage2 = document.getElementById('tile2');
let tileImage3 = document.getElementById('tile3');
let tileImage4 = document.getElementById('tile4');
let tileImage5 = document.getElementById('tile5');
let tileImage6 = document.getElementById('tile6');
let tileImage7 = document.getElementById('tile7');
let tileImage8 = document.getElementById('tile8');
let tileImage9 = document.getElementById('tile9');
let tileImage10 = document.getElementById('tile10');
let tileImage11= document.getElementById('tile11');
let tileImage12 = document.getElementById('tile12');
let tileImage13 = document.getElementById('tile13');
let tileImage14 = document.getElementById('tile14');
let tileImage15 = document.getElementById('tile15');
let tileImage16 = document.getElementById('tile16');

const puppyPath = "./resources/media/puppy.jpg";
const kittenPath = "./resources/media/kitten.jpg";
const ratPath = "./resources/media/rat.jpg";
const pkPath = "./resources/media/pk.jpg";
const tilePath = "./resources/media/tile.jpg";
const puppyBark = new Audio("./resources/media/puppy.mp3");
const kittenMeow = new Audio("./resources/media/kitten.mp3");
const ratSqueak = new Audio("./resources/media/rat.mp3");
const winHarp = new Audio("./resources/media/harp.wav");
const loseLaugh = new Audio("./resources/media/laugh.mp3");

let newTileImage; 
let dogCount = 0;
let catCount = 0;
let minTieScore = 3;
let tileCount = 16;

let heading = document.getElementById('heading');
let scoreRow = document.getElementById('score-row');
let dogScore = document.getElementById('dog-score');
let catScore = document.getElementById('cat-score');
let backdrop = document.getElementById('container');
let ruleTable = document.getElementById('rule-table');
let gameLost = document.getElementById('container2');
let gameWon = document.getElementById('container3');
let gameReplay = document.getElementById('replay-button');
let gameStart = document.getElementById('start-button');

// Randomly assigns the puppy, kitten, or rat paths to newTileImage.
let randomPathGenerator = () => {
    let tileImage = Math.floor(Math.random() * 3);
    switch(tileImage) {
        case 0:
            newTileImage = puppyPath;
            break;
        case 1:
            newTileImage = kittenPath;
            break;
        case 2:
            newTileImage = ratPath;
            break;
    };
};

// Tallys number of cats and dogs that turn up
let score = (tile) => {
    if(tile === kittenPath) {
        catCount ++;
        catScore.innerHTML = `Cats: ${catCount} `;
    }
    else if(tile === puppyPath) {
        dogCount ++;
        dogScore.innerHTML = `Dogs: ${dogCount}`;
    }
};

/*Sets clicked state to false, and then runs event handler for a mouse click on the tile. 
On click, the randomPathGenerator fxn is called and the tile.src image is assigned to the one pulled
up by the randomPathGenerator (newTileImage). The score fxn tallies a dog or cat, he tile count is decreased by one 
with each click, the gameOver fxn is called, and depending on which animal is pulled, a bark, meow 
or squeak audio plays. If it is the last tile clicked (status is 'over') the audio does not play. 
IsClicked is set to true so the tile cannot be reclicked.*/
let tileClick = (tile) => {
    let isClicked = false;
    tile.onclick = () => {
        if(!isClicked) {
            randomPathGenerator();
            score(newTileImage);
            tile.src = newTileImage;
            tileCount --;
            gameOver();
            if (newTileImage === puppyPath && tileCount > 0 && status != 'over') {
                playDog();
            }
            else if (newTileImage === kittenPath && tileCount > 0 && status != 'over') {
                playKitten();
            }
            else if (newTileImage === ratPath && tileCount > 0 && status != 'over') {
                playRat();
            }
            isClicked = true;
        }
    } 
};

// Runs tileClick on each tile
tileClick(tileImage1);
tileClick(tileImage2);
tileClick(tileImage3);
tileClick(tileImage4);
tileClick(tileImage5);
tileClick(tileImage6);
tileClick(tileImage7);
tileClick(tileImage8);
tileClick(tileImage9);
tileClick(tileImage10);
tileClick(tileImage11);
tileClick(tileImage12);
tileClick(tileImage13);
tileClick(tileImage14);
tileClick(tileImage15);
tileClick(tileImage16);

const playDog = () => {
    puppyBark.play();
}
const playKitten = () => {
    kittenMeow.play();
}
const playRat = () => {
    ratSqueak.play();
}
const playWin = () => {
    winHarp.play();
}
const playLoss = () => {
    loseLaugh.play();
}

let status = 'playing';

/*Checks to see if the cat and dog counts are equal and satisfy the minimum tie score. If so,
the win screen comes up and if the tile count is 0 (clicks used up) and the dog and cat counts are
not equal, the lose screen comes up. Audo files play for each screen and the status is set to 'over'.*/
let gameOver = () => {
    if (catCount === dogCount && catCount >= minTieScore) {
        status = 'over';
        heading.style.fontSize = '6vw';
        scoreRow.style.marginTop = '15px';
        backdrop.style.display = 'none';
        ruleTable.style.display = 'none';
        gameWon.style.display = 'block';
        gameReplay.style.display = 'block';
        playWin();
    }
    else if (tileCount === 0 && catCount != dogCount) {
        status = 'over';
        heading.style.fontSize = '6vw';
        scoreRow.style.marginTop = '10px';
        backdrop.style.display = 'none';
        ruleTable.style.display = 'none';
        gameLost.style.display = 'block'; 
        gameReplay.style.display = 'block';
        playLoss();
    }
};

/* Hides start button and rules, changes the size of the heading and margins, and shows the
tile grid and scoring row*/
let startGame = () => {
    gameStart.style.display = 'none';
    heading.style.fontSize = '6vw';
    heading.style.marginTop = '5px';
    heading.style.marginBottom = '10px';
    scoreRow.style.display = 'flex';
    scoreRow.style.marginTop = '5px';
    backdrop.style.display = 'flex';
    ruleTable.style.display = 'none';

}

/*Hides the game over screen image and replay button, shows the the tile grid, resets the 
tile count to 16 and the dog and cat counts to 0 as well as inner HTML. Sets tile images all
back to the tilePath and runs tileClick on all of the tiles to make them clickable again. Status
is reset to 'playing'.*/
let replayGame = () => {
    backdrop.style.display = 'flex';
    gameWon.style.display = 'none';
    gameLost.style.display = 'none';
    gameReplay.style.display = 'none';
    tileCount = 16;
    catCount = 0;
    dogCount = 0;
    catScore.innerHTML = 'Cats: 0';
    dogScore.innerHTML = 'Dogs: 0';
    tileImage1.src = tilePath;
    tileImage2.src = tilePath;
    tileImage3.src = tilePath;
    tileImage4.src = tilePath;
    tileImage5.src = tilePath;
    tileImage6.src = tilePath;
    tileImage7.src = tilePath;
    tileImage8.src = tilePath;
    tileImage9.src = tilePath;
    tileImage10.src = tilePath;
    tileImage11.src = tilePath;
    tileImage12.src = tilePath;
    tileImage13.src = tilePath;
    tileImage14.src = tilePath;
    tileImage15.src = tilePath;
    tileImage16.src = tilePath;
    tileClick(tileImage1);
    tileClick(tileImage2);
    tileClick(tileImage3);
    tileClick(tileImage4);
    tileClick(tileImage5);
    tileClick(tileImage6);
    tileClick(tileImage7);
    tileClick(tileImage8);
    tileClick(tileImage9);
    tileClick(tileImage10);
    tileClick(tileImage11);
    tileClick(tileImage12);
    tileClick(tileImage13);
    tileClick(tileImage14);
    tileClick(tileImage15);
    tileClick(tileImage16);
    status = 'playing';
};

// Calls the startGame function on the start button click
gameStart.onclick = startGame;

// Calls the replayGame function on the replay button click
gameReplay.onclick = replayGame;




