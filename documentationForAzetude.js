/* 
Further progress updates will be written here (much like what I did for my Frogger game)

extra: trying to connect this app to heroku to deploy online

6-22-24 made some final changes to main game music loop and stopping. recorded video demonstration. next step
is to upload to youtube and post on website/linkedin/etc.  I'm happy to say that this project is officially finished :).
BIG thank you to Rania (my partner for this game project) who helped out with designing all the sprites, backgrounds, and giving suggestions
for the games music.  It inspired me to learn to make my own sprites and backgrounds for my next game.  Meanwhile I did 
all the work on the coding side (the paddles, the ball, the buttons, generating
leaderboard, user initials input, etc.) and implemented the songs into the game as well as setting up the game to work in the browser with
WAMP.net.  Also thank you to the music artists for providing the songs in the game as well as the creators of the fonts
used for this game, I have included credits for them in the game and in some text files in the project folder.


6-20-24 updated some comments, tested out the game with the player winning one match and the AI winning another match, all graphics and music and mechanics seem to be working
properly.  Next step is to record a video demonstration.

6-18-24 Tested the audio buttons which work correctly, then implemented a new credits background made by me (Carlos Castillo).  Last thing to do is test the game
out in various test runs then publish this to GitHub, linkedin, and any other page.  Also will record a youtube video demonstration of the game.

6-13-24 implemented mute and unmute buttons, must test them out to make sure they don't cause audio problems in other scenes of the game.


6-11-24
Successfully managed to implement the title screen music which plays throughout option and credits screens too.  When the user enters the game scene, the title music ends,
but if the user decides to go back to the title screen (Effectively resetting the azetude game) then the title music is played once again from the beginning.  The user
can still hear the title music playing as they explore the options and credit scenes as before.  Started working on the options screen MUTE and UNMUTE buttons.


6-6-24
added a click anywhere screen that preceeds the title screen, the idea is that once the user clicks on this black screen with text, then music will start playing on the title screen immediately.
before this, the user had to click somewhere on the title screen to trigger the background music which is not normal.
Added an event that detects when user presses pointer on the game background and causes title screen to start


6-4-24
removed all prior sounds in the title screen then activate the mp3 music sound for the title game scene
this order ensures that every time the user returns from the options and credits scenes then the music
in the the title screen wont play repeatedly over itself.  added a click anywhere scene which will bridge
gap between preload and title screen for audio purposes.


6-2-24 Implemented proper credits screen, and started implementing music into the title screen.  The title screen music
should continue playing when user goes to credits and options.  The music should stop completely when the user starts
the actual game.  Must continue working on STOPPING the music from starting all over again (therefore creating duplicates)
when you are coming back from the credits scene to the title scene.

6-1-24 took a week long hiatus due to work and family matters, tested the game more this time today and compared it
to the early designs of the game to ensure I've implemented all the main screens.  I still have
to implement the credits scene and options scene.  The final thing to implement will be
the screen that allows for user to choose between single player or local multiplayer.
In order for local multiplayer to work properly, keyboard support for a second person will
need to be added.  When either player wins, then the victory screen should display the winners name
and high score screen should display the winners name with the other scores only.


5-24-24 Successfully implemented the high score table in the high score screen, which has an array that sorts all the players and their scores
in descending order.

5-12-24 Finished the placement of elements on the victory screen, then started working on the high score screen.
Came up with an algorithm to sort the scores of the players into descending order, must continue working on implementing it.

EXTRA NOTE: MAKE SURE TO CHECK WHEN EITHER REACHES 10 THEN END THE GAME AND GO TO VICTORY SCREEN.
THIS IS LOCATED UNDER THE GAME CLASS IN THE UPDATE METHOD.

5-8-24 Continued working on victory screen and high score screen. Figured out that DREAM MMA font only works
with lower case letters, otherwise capital letters will display in a generic font.  Changed the background of
the victory screen.  Figured out the logic for user initials input (limit it to a certain number of characters
and allow them to backspace if they want to enter a different name).

5-7-24 after taking a break from development, I am resuming work on the game.  I implemented a victory screen
and then transition to high score screen. The victory screen features the winners name, and their score.  The user can input
their initials to be saved with their score in the high score screen.

5-2-24 Successfully implemented a basic pause button and resume button functionalities into the game via
two buttons.  Will improve this with better looking images for the buttons and a better spot to position them.

4-30 to 5-1: Trying to figure out how to pause game correctly (my way)

4-29-24 Managed to translate the main game codes paradigm over to OOP style and implemented a title menu scene
which preceeds the game. Added a button in the title screen to enable the user to go to the game when they press the button.
Downloaded more asset images from the Google Drive folder made by Rania, she also resized the images to fit
the dimensions of the game properly, thank you Rania . Added option scene, credit scene, and high score scene later in the day.


4-28 and 4-27 
stuck trying to convert the game over to object oriented programming...


4-23-24 further optimized the collision and velocity upon the ball hitting the player or enemy paddles,
now the ball will take into account the upper, center, and lower portions of each paddle. Still have to improve this.

4-22-24
tried new music tracks for the game and adjusted physics collision between paddes and ball.
keep working on collision code...


4-19-24
Added custom background images, custom paddles sprites, added copyright-free music audio, added
custom font for score counters displays. 

4-18-24
added score counters for each player and changed player and AI collision code for when they collide with the ball.

4-17-24
Worked on enemy AI paddle game logic (how it responds when the ball comes near its goal)
and also worked on what happens to the ball once it hits the boundaries of the left or right
walls. Built custom functions for random number generation and what should happen when collision between ball and player occurs.


4-13-24 
This is the Phaser Javascript code for the Pong clone created by Carls and Radon. I started
by creating the main window for the game (black background at present) and one paddle.  */

