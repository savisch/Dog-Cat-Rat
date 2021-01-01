# General Info #

* This is a tile game called "Dog-Cat-Rat"
* It was written for my 11 year old daughter
* It is played in a web browser

# Game Play #

* There are 16 tiles
* Under each tile there is an image of a dog, cat, or rat
* The dog barks, the cat meows, and the rat squeaks
* The game begins by clicking a difficulty level (setting a number of allowed clicks)
* Played commences by clicking on tiles to reveal the animal beneath
* Choosing an equal number of dogs and cats wins the game with a minimum of 3 matches
* If all of the allowed tile clicks are used up without a match, the game is lost
* A won game results in an image of a puppy and kitten together with harp music
* A lost game results in an image of a rat laughing an evil laugh
* On game completion there is the option to replay

# Under the Hood #

* When the game play is commenced, an array of 16 images is created
* It is populated with conditions to make sure there are a minimum of 3 dogs and 3 cats (so the game can be won)
* The array is shuffled to a random order 
* The tiles are set with the images from the shuffled array
* The number of allowed tile clicks dictates difficulty level (Hard=10, Medium=13, Easy=10)
* On replay a new array is created with a fresh screen of tiles

# Technologies #

* HTML
* CSS
* JavaScript
* DOM

