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
let startContainer = document.getElementById('container5');
let replayContainer = document.getElementById('container4');
let easyButton = document.getElementById('easy-button');
let mediumButton = document.getElementById('medium-button');
let hardButton = document.getElementById('hard-button');
let easyButton2 = document.getElementById('easy-button2');
let mediumButton2 = document.getElementById('medium-button2');
let hardButton2 = document.getElementById('hard-button2');


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

let dogCount = 0;
let catCount = 0;
let puppyNumber = 0;
let kittenNumber = 0;
let minTieScore = 3;
let tilePlayCount;

let heading = document.getElementById('heading');
let scoreRow = document.getElementById('score-row');
let dogScore = document.getElementById('dog-score');
let catScore = document.getElementById('cat-score');
let backdrop = document.getElementById('container');
let ruleTable = document.getElementById('rule-table');
let gameLost = document.getElementById('container2');
let gameWon = document.getElementById('container3');
// let gameReplay = document.getElementById('replay-button');
// let gameStart = document.getElementById('start-button');
// Creates array of tile image variables
let tileArray = [tileImage1, tileImage2, tileImage3, tileImage4, tileImage5, tileImage6, tileImage7, tileImage8, tileImage9, tileImage10, tileImage11, 
    tileImage12, tileImage13, tileImage14, tileImage15, tileImage16];

// Creates empty array to be populated with random dog, cat, and rat images
let playArray = [];

// Iterates through the tileArray, running tileClick on each tile and setting each tile.src image to the tilePath
let tileSetter = (tileArray) => {
    for (let i = 0; i < tileArray.length; i ++) {
        tileClick(tileArray[i]);
        tileArray[i].src = tilePath;
    }
};

/*Populates the playArray by running randomPathGenerator on each index of the tileArray and iterates through each 
item in playArray and if a puppyPath adds 1 to the puppyNumber. If the next puppy is more than
3, then the index is switched to a ratPath. This repeats for a kittenPath. The playArray is shuffled*/
let clickImageSetter = () => {
    playArray = tileArray.map(tile => randomPathGenerator());
    for (let i = 0; i < playArray.length; i ++) {
        if (playArray[i] === puppyPath) {
            puppyNumber ++;
            if(puppyNumber > 3) {
                playArray[i] = ratPath;
            }
        }
        else if (playArray[i] === kittenPath) {
            kittenNumber ++;
            if(kittenNumber > 3) {
                playArray[i] = ratPath;
            }
        }
    }
    for (let i = playArray.length -1; i > 0; i --) {
        let j = Math.floor(Math.random() * (i + 1));
        [playArray[i], playArray[j]] = [playArray[j], playArray[i]];
    }
};

// Randomly returns either a puppyPath or kittenPath
let randomPathGenerator = () => {
    let tileImage = Math.floor(Math.random() * 2);
    switch(tileImage) {
        case 0:
            return puppyPath;
            break;
        case 1:
            return kittenPath;
            break;
    }
};

// Tallies number of cats and dogs that are clicked
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

/*Sets isClicked to false, and then on click sets the tile.src image to the one popped off of the 
shuffled playArray. The score fxn runs to tally whether a dog or cat, the tilePlayCount is decreased
by 1, the gameOver fxn is called, and the audio file associated with the animal that is clicked plays.
IsClicked is set to true so the tile is not clickable a second time since the onclick fxn only runs if 
isClicked is false.*/
let tileClick = (tile) => {
    let isClicked = false;
    tile.onclick = () => {
        if(!isClicked) {
            tilePlayCount --;
            newTileImage = playArray.pop();
            tile.src = newTileImage;
            score(newTileImage);
            gameOver();
            if (newTileImage === puppyPath) {
                playDog();
            }
            else if (newTileImage === kittenPath) {
                playKitten();
            }
            else if (newTileImage === ratPath) {
                playRat();
            }
            isClicked = true;
        }
    }
};

// Fxns to play the audio files
const playDog = () => { puppyBark.play(); };
const playKitten = () => { kittenMeow.play(); };
const playRat = () => { ratSqueak.play(); };
const playWin = () => { winHarp.play(); };
const playLoss = () => { loseLaugh.play(); };

/*Changes size of heading and scoreRow margin, hides the tile grid, shows the won image with replay button
and plays the win audio file.*/
let winGame = () => {
    heading.style.fontSize = '6vw';
    scoreRow.style.marginTop = '15px';
    backdrop.style.display = 'none';
    gameWon.style.display = 'block';
    replayContainer.style.display = 'block';
    playWin();
};

/*Changes size of heading and scoreRow margin, hides the tile grid, shows the loss image with replay button
and plays the loss audio file.*/
let loseGame = () => {
    heading.style.fontSize = '6vw';
    scoreRow.style.marginTop = '10px';
    backdrop.style.display = 'none';
    gameLost.style.display = 'block'; 
    replayContainer.style.display = 'block';
    playLoss();
};

// Calls either the winGame or loseGame fxns at setTimeout
let gameOver = () => {
    if (catCount === dogCount && catCount === minTieScore) {
        setTimeout(winGame, 400);
    }
    else if (tilePlayCount === 0) {
        setTimeout(loseGame, 400);
    }
};

/*Changes size of heading and margins, shows scoreRow and tile grid, hides ruleTable and start button, and runs the
clickImageSetter and tileSetter fxns.*/
let startGame = () => {
    // tilePlayCount = 12;
    startContainer.style.display = 'none';
    heading.style.fontSize = '6vw';
    heading.style.marginTop = '5px';
    heading.style.marginBottom = '10px';
    scoreRow.style.display = 'flex';
    scoreRow.style.marginTop = '5px';
    backdrop.style.display = 'flex';
    ruleTable.style.display = 'none';
    clickImageSetter();
    tileSetter(tileArray);
};

/*Hides the gameWon or gameLost images and replay button, shows the tile grid, resets
tilePlayCount/dogCount/catCount/puppyNumber/kittenNumber/innerHTML, and runs the clickImageSetter and tileSetter fxns.*/
let replayGame = () => {
    // tilePlayCount = 12;
    backdrop.style.display = 'flex';
    gameWon.style.display = 'none';
    gameLost.style.display = 'none';
    replayContainer.style.display = 'none';
    catCount = 0;
    dogCount = 0;
    puppyNumber = 0;
    kittenNumber = 0;
    catScore.innerHTML = 'Cats: 0';
    dogScore.innerHTML = 'Dogs: 0';
    tileSetter(tileArray);
    clickImageSetter();
};

// These functions set the tilePlayCount for the difficulty level and run startGame()
function startGameEasy() {
    tilePlayCount = 16;
    startGame();
}
function startGameMedium() {
    tilePlayCount = 13;
    startGame();
};
function startGameHard() {
    tilePlayCount = 10;
    startGame();
};
// These functions set the tilePlayCount for the difficulty level and run replayGame()
function replayGameEasy() {
    tilePlayCount = 16;
    replayGame();
};
function replayGameMedium() {
    tilePlayCount = 13;
    replayGame();
};
function replayGameHard() {
    tilePlayCount = 10;
    replayGame();
};

// Runs startGame fxn on level button click
easyButton.addEventListener('click', startGameEasy);
mediumButton.addEventListener('click', startGameMedium);
hardButton.addEventListener('click', startGameHard);

// Runs replayGame fxn on replay level button click
easyButton2.addEventListener('click', replayGameEasy);
mediumButton2.addEventListener('click', replayGameMedium);
hardButton2.addEventListener('click', replayGameHard);
