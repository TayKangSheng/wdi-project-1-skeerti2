<!-- [How to write readme - Markdown CheatSheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)  
[How to write a good readme for github repo!](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2) -->

# Pup Target
<!---
Read Me Contents
-->
The aim of the game is to catch as many puppies as possible by clicking on them when they appear. In the event of successful click, the pup count will increment and the pup will disappear.

## Instructions
There are 2 levels in this game.
##### Level 1
The level 1 game starts within 3 seconds on clicking "Let's Play" button in the [first page.](https://wdi-sg.github.io/wdi-project-1-skeerti2/index.html) To unlock level 1, the player has to catch more than 2 puppies, else hit the restart button to retry.

##### Level 2
Once level 1 finishes, the player enters level 2 within 3 seconds of hitting 'Next Level' button. The duration of this level is 50 seconds. Watch out for Sniper the fox here, as clicking on the fox will decrement the pups caught.

The game is best experienced in Google Chrome.

## Implementation
The game was built with the help of jQuery. Instructions of the game are listed out in 'index.html' which redirects to the main game page in 'index2.html' on clicking the "Let's Play" button.

Initially, the variable `Level` is assigned to 1, `time` is set to 10 along with default (0) values for `pupsSaved` & `totalPuppies`.
The functions used to build the game are listed below:

`startGame():`
* This function is called within 3 seconds of index2.html load. It performs the function of both game Start and Restart.
* It checks for the levels and then sets interval on both `randomizeLevel1()`, `randomizeLevel2()`,`updateTimeLevel1()`, `updateTimeLevel2()` functions accordingly.
* Display of all 3 boxes: 'Pups Caught:', 'Time:' and 'Level:' is reset here.
* An `('.box').off()` functionality on the event listeners of box is made so that none of them are active at the time of start/restart.
*  It is important to have an empty grid (or no puppy/fox) image at the beginning of the game. Hence,

`$('.box.puppy').removeClass('.puppy')`

`updateTimeLevel1():`
* This function decrements the time of the game every time it is evoked in `setInterval()`.
* One of the most important tasks of this game is to check if the time is 0 and
1. `clearInterval` on `timerIdGameClock` & `timerIdPuppyChange`.
2. remove: event listeners on box, & puppy images on the box.
3. Control display of Modals on end game.
4. If the player does not catch 2 puppies, `level` is reset to 1 and game is replayed on restart click.
5. If more than 2 puppies are caught, the `level` is set to 2 and startGame is called within 3 seconds using `setInterval()`









## Instructions
