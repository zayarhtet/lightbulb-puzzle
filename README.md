# LightBulb Placement Game
## Web-programming - JavaScript home assignment
Once upon a time, King Unnamed of Nowhereland was both smiling and crying at the same time. He was smiling because his enormous brand-new palace with many spacious rooms and corridors has just been finished. He is also crying as these rooms need to be illuminated and kept warm, but the ongoing increase of utility costs affect him as well. So now it's time to think about the placement of the palace's light bulbs. We need to place them so that everything is properly lit, but we cannot install any unnecessary bulbs.

## Game Decription
* The king's palace has rooms with square shaped floors that consist of black and white tiles only.
* Light bulbs can only be placed above white tiles.
* The light from the light bulbs does not spread diagonally, only straight along the given row and column.
* The black tiles have objects placed on them, which block the propagation of light.
* Black cells can optionally contain an integer from 0 to 4. This indicates how many adjacent (bottom, top, right, left) cells contain light bulbs. If there is such a number, the puzzle must be solved accordingly!
* Two light bulbs can NEVER illuminate each other!
* The goal of the game is to place the light bulbs so that all the white tiles are illuminated.
* The game is played by one player until he solves the puzzle, so there is no need to manage multiple players at the same time or divide into rounds.

---

## Project Description

This project is done with __HTML__, __CSS__ and __Vanila JavaScript DOM__, and constructed with multilayer architecture. __Model-View-Controller__ Architecture is used and the business logic, view control, and the model are properly splitted and organized.

LocalStorage is used to store the data for three purposes:

* Map - `boards:Object`
* Saved Game - `savedGame:Object`
* Score Board - `scoreBoard:Array`

__Bootstrap Grid__ is used in this project for the organized and responsive UI.

---

## Publishment
The project is deployed in __Netlify__ and can be accessible <https://lightbulbpuzzle.netlify.app>.

---

## Solution Correctness - ELTE
#### Zayar Htet
#### DRCVG2
This solution was submitted by the stundent named above for a Web-programming assignment.
Hereby, I declare that the solution is my own work. I did not copy or use solutions from a third party. I did not share this solution with fellow students, and I did not publish it. 
According to the Academic Regulations for Students (Eötvös Loránd University Organisational and Operational Regulations – Volume 2, Section 74/C), a student purporting the intellectual property of others as their own purpose is committing a disciplinary offence.
The worst result of a disciplinary offence can be the expulsion of the student.

### Minimum requirements (must be completed, 8 pts)

[X] Other: the `README.md` file from the *Other requirements* section is filled with your data and included with your solution (0 pts) <br>
[X] Game board: the elements of a map are shown properly (1 pt) <br>
[X] Game board: light bulbs can be placed on the white tiles by clicking (1 pt) <br>
[X] Game board: the placed light bulb can be removed by clicking again (1 pt) <br>
[X] Game board: light bulbs cannot be placed on the black tiles (1 pt) <br>
[X] Game board: the game detects (either automatically or by the click of a button) if the solution is correct (3 pts) <br>
[X] Game board: the game can be restarted after solving without reloading the page (1 pt)

Basic tasks (12 pts)

[X] Map selector: at least three different maps can be selected and started correctly (1 pt) <br>
[X] Map selector: the player's name can be entered which is shown during the game and on the scoreboard (1 pt) <br>
[X] Game board: the elapsed time is always shown and updated (1 pt) <br>
[X] Game board: all illuminated tiles (including the tiles containing the light bulbs) get yellow background colour (1 pt) <br>
[ ] Game board: the propagation of light is animated, the yellow background colour spreads from the light source after it has been placed (1 pt)<br>
[X] Game board: show with a different style (e.g. green text colour) if a black tile is surrounded by the correct number of light bulbs (1 pt)<br>
[ ] Game board: show with a different style (e.g. red colour or icon) if two light bulbs illuminate each other (1 pt) <br>
[X] Game board: the game can be interrupted and saved (1 pt) <br>
[X] Map selector: the latest results can be seen - player's name, map name, time elapsed (1 pt)<br>
[X] Map selector: the latest results are stored persistently after the page is closed (1 pt)<br>
[X] Map selector: the saved game is shown and can be loaded properly (1 pt)<br>
[X] Other: nice design (1 pt)

Extra tasks (extra 5 pts)

[X] Map editor: custom maps can be created with any dimension and starting tiles (3 pts) <br>
[X] Map editor: the custom maps are stored persistently in localStorage (1 pt) <br>
[X] Map editor: the custom maps can be reopened for editing and saved again (1 pt) <br>