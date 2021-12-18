# Ironhack - Module 1 - Final Project
## Minesweeper Clone

Minesweeper made its first appearance in the 1960s, however it became very popular when Microsoft introduced it in Windows 3.1 version in 1992. I chose to make my version for this project, as it was one of the first games I learned to play when I was a little kid, and I thought it would be fun to apply Javascript, HTML and CSS concepts while developing it.


## Rules of the game

The rules are fairly simple. The board is made of square tiles, and there is a certain amount of bombs hidden under them, which will vary depending on the level you choose. The goal is to reveal all the tiles with no bombs in them. With a left click, you reveal what is hidden in that tile. If a number appears, it indicates how many bombs can be found in the 8 tiles sorrounding it. You win the game when you have revealed all the tiles and no bombs have been hit.


## Development - JS Logic

The logic was applied with DOM manipulation and it was divided into the following parts:
- Drawing the board after the game level (easy, medium, hard) was chosen;
- Clicking events: 
    - when the player chooses a level
    - each tile is clicked (left or right click) revealing the sorrounding tiles that do not contain a bomb (for that, recursion was applied)
    - or "Refresh" button is clicked
- Starting the timer when the level is chosen and stopping it when the game ends;
- Incrementing Flags counter every time the player right-clicks a tile; or decreasing it when a flag is removed;
- Checking win: when all the tiles have been revealed correctly without hitting any bombs, and Win message is displayed;
- Check game over: if a bomb is hit, a Game Over message is displayed.


## Playing the game

You can play this game either by cloning this repo and opening the 'index.html' file in your browser or by accessing it directly on Github Pages: https://kellymorelatti.github.io/ironhack_module_1_final_project/

Enjoy! 😄


