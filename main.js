/* 
Further progress updates will be written here (much like what I did for my Frogger game)

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
the dimensions of the game properly, thank you bby girl. Added option scene, credit scene, and high score scene later in the day.


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



class ButtonComponent extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene);
        this.config = config;
        this.spawnButton();
    }

    spawnButton() {
        this.x = this.config.x;
        this.y = this.config.y;
        this.scale = this.config.scale;

        // this is for the title screen and option screen buttons
        //this.setScale(0.3,0.3);

        // this is for the game scene
        //this.setScale(0.2,0.2);

        this.background = this.scene.add.image(0, 0, this.config.background);

        this.background.setInteractive();

        this.background.on('pointerdown', this.onPush, this);
        this.background.on('pointerup', this.onPull, this);
        this.background.on('pointerout', this.onOut, this);

        this.text = this.scene.add.text(0, 0, 'test', {
            fontSize: 120 * this.scene.game.scaleHeight * 3,
            fontFamily: 'Tahoma',
            padding: 10,
            lineSpacing: 20,
            align: 'center',
            fill: '#ffffff',
            wordWrap: {
                width: this.background.displayWidth - 10,
            }
        });

        this.firstScale = this.background.scale;

        this.add(this.background);
        this.add(this.text);
        this.scene.add.existing(this);
    }

    destroy(fromScene) {
        super.destroy(fromScene);
    }

    onPush() {
        this.tweenObject('push');
    }

    onPull() {
        if (typeof this.config.onPush === "function") {
            this.config.onPush();
            //this.scene.scene.start('Game');
        }
        this.tweenObject('pull');
    }

    onOut() {
        this.tweenObject('pull');
    }

    tweenObject(status) {
        const pressure = (status === "push" ? 0.9 : 1);
        if (typeof this.text !== "undefined") {
            this.config.scene.tweens.add({
                targets: this.text,
                scale: this.firstScale * pressure,
                ease: 'Linear',
                duration: 100,
            });
        }
        this.scene.tweens.add({
            targets: this.background,
            scale: this.firstScale * pressure,
            ease: 'Linear',
            duration: 100,
        });
    }
}


class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    create() {
        console.log('Boot.create');

        this.scene.start('Preloader');
    }
}

class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        /*
        The order in which game objects are displayed matches the order in which you create them. So if you wish to place a star sprite
         above the background, you would need to ensure that it was added as an image second, after the sky image:
        */
        this.load.audio('ingameMUSIC', 'assets/audio/space-120280.mp3');
        this.load.image('menuBG', 'assets/backgrounds/Menu BackgroundFixed.png');
        this.load.image('playButton', 'assets/buttons/Play Button.png');
        this.load.image('optionButton', 'assets/buttons/Option Button.png');
        this.load.image('creditsButton', 'assets/buttons/Credits Button.png');
        this.load.image('spacevoid', 'assets/backgrounds/Azetude- Gameplay Background.png');
        //this.load.image('rainbowvoid', 'assets/rainbowvoid.png');

        // width and height of the frame in pixels
        this.load.spritesheet('paddle', 'assets/sprites/FirstPaddle.png', { frameWidth: 263, frameHeight: 551 });
        this.load.image('paddleAI', 'assets/sprites/SecondPaddle.png');
        this.load.image('BlueBall', 'assets/sprites/BlueBall.png');
        this.load.image('goBackButton', 'assets/buttons/back button.png');
        this.load.image('pauseButton', 'assets/buttons/Pause Button.png');
        this.load.image('resumeButton', 'assets/buttons/Play Button New.png');
        this.load.image('victoryScreen', 'assets/backgrounds/Fixed Winning Screen Updated.png');
        this.load.image('continueButton1','assets/buttons/continuebutton1.png');
        this.load.image('highScoresScreen', 'assets/backgrounds/placeholder2.jpg');
        this.load.image('goTitleScreenButton1', 'assets/buttons/gobacktitlescreenbutton1.png');
    }

    create() {
        console.log('Preloader.create');

        this.scene.start('Title');
    }
}



class Title extends Phaser.Scene {
    constructor() {
        super('Title');
    }

    create() {
        console.log('Title.create');
        this.add.image(500, 300, "menuBG");

        // this code would be good to use if simply clicking anywhere on the screen enabled the user to go to the game
        //this.input.once('pointerdown', function () {console.log('From SceneA to SceneB');this.goToGameScene();}, this);

        /* Button component code will be used instead of the code above, this ensures the user can only proceed to the game
        if they click on the button and not anything else.*/
        const playButton = new ButtonComponent({
            scene: this,
            x: 500, y: 320,
            scale: 0.3,
            background: 'playButton',
            onPush: this.goToGameScene.bind(this)
        });

        const optionButton = new ButtonComponent({
            scene: this,
            x: 500, y: 420,
            scale: 0.3,
            background: 'optionButton',
            onPush: this.goToOptionScene.bind(this)
        });

        const creditButton = new ButtonComponent({
            scene: this,
            x: 500, y: 520,
            scale: 0.3,
            background: 'creditsButton',
            onPush: this.goToCreditScene.bind(this)
        });
    }

    // This method will allow the button pressed earlier to proceed to the MAIN game scene.
    goToGameScene() {
        this.scene.start('Game');
    }

    // This method will allow the button pressed earlier to proceed to the option scene.
    goToOptionScene() {
        this.scene.start('Option');
    }

    // This method will allow the button pressed earlier to proceed to the credits scene.
    goToCreditScene() {
        this.scene.start('Credits');
    }

}

class Option extends Phaser.Scene {
    constructor() {
        super('Option');
    }

    create() {
        console.log('Option.create');
        this.add.image(500, 300, "menuBG");

        /* Button component code will be used instead of the code above, this ensures the user can only proceed to the game
        if they click on the button and not anything else.*/
        const goBackButton = new ButtonComponent({
            scene: this,
            x: 500, y: 350,
            scale: 0.3,
            background: 'goBackButton',
            onPush: this.goToTitleScene.bind(this)
        });
    }

    // This method will allow the button pressed earlier to proceed to the MAIN game scene.
    goToTitleScene() {
        this.scene.start('Title');
    }
}

class Credits extends Phaser.Scene {
    constructor() {
        super('Credits');
    }

    create() {
        console.log('Credits.create');
        this.add.image(500, 300, "menuBG");

        /* Button component code will be used instead of the code above, this ensures the user can only proceed to the game
        if they click on the button and not anything else.*/
        const goBackButton = new ButtonComponent({
            scene: this,
            x: 500, y: 350,
            scale: 0.3,
            background: 'goBackButton',
            onPush: this.goToTitleScene.bind(this)
        });
    }

    // This method will allow the button pressed earlier to proceed to the MAIN game scene.
    goToTitleScene() {
        this.scene.start('Title');
    }
}

class Game extends Phaser.Scene {

    constructor() {
        super('Game');

        this.playerScore = 0;
        this.enemyScore = 0;
        this.goBackButton;
        this.pauseButton;
        /* 4-23-24 consider using these variables in the UPDATE method and create separate this.getRndInteger variables in the collision methods
        Why? because that way the X velocity for the ball upon hitting the player or enemy paddle will always change slighty
        instead of staying at a fixed number (Despite using random) */
        this.xVelocityBallPlayer = this.getRndInteger(700, 800);
        this.yVelocityBallPlayerList = [this.getRndInteger(0, 0), this.getRndInteger(-300, -400), this.getRndInteger(300, 400)];

        this.xVelocityBallEnemy = this.getRndInteger(-700, -800);
        this.yVelocityBallEnemyList = [this.getRndInteger(0, 0), this.getRndInteger(-300, -400), this.getRndInteger(300, 400)];

    }

    /**  About each function:
     * preload() {} — a method that defines what we need to load before the scene and from where. We’ll use it to load assets later on.
    create(data) {} — a method that gets triggered when a scene is created. In it, we’ll specify positioning for 
    such scene elements as Character and Enemies.
    update(time, delta) {} — a method that gets called with every render frame (on average, 60 times per second). 
    It’s a game loop in which redrawing, moving objects, etc. occurs.
    */

    create() {
        console.log('Game.create');
        // activate the mp3 music sound for the main game scene
        this.music = this.sound.add('ingameMUSIC');
        this.music.play();

        // draw all the game objects onto the screen
        this.add.image(500, 300, 'spacevoid');

        //Creates a new Arcade Sprite object with a Static body.

        /**
         * In Arcade Physics there are two types of physics bodies:
         * Dynamic and Static. A dynamic body is one that can move 
         * around via forces such as velocity or acceleration. It can
         * bounce and collide with other objects and that collision 
         * is influenced by the mass of the body and other elements.
         */

        // (used for testing physics) platform = this.physics.add.staticSprite(500,620,'rainbowvoid');

        //the creation of a Physics Sprite and the creation of some animations that it can use.
        /* The sprite was created via the Physics Game Object Factory (this.physics.add) 
        which means it has a Dynamic Physics body by default. */
        this.playerPaddle = this.physics.add.sprite(50, 300, 'paddle');


        console.log(`The height of the player paddle (internal height) ${this.playerPaddle.displayHeight}`);
        console.log(`The width of the player paddle (internal width) ${this.playerPaddle.displayWidth}`);

        // setSize - Sets the internal size of this Game Object, as used for frame or physics body creation.
        this.playerPaddle.setSize(263, 420);

        /* setBounce - Bounce is the amount of restitution, or elasticity, the body has when it collides with another object.
    A value of 1 means that it will retain its full velocity after the rebound. A value of 0 means it will not rebound at all. */
        //playerPaddle.setBounce(0.8);

        //setScale - Sets the scale of this Game Object (Vertical and horizontal) this is like changing the actual sprite size!
        this.playerPaddle.setScale(0.3, 0.3);

        /* setPushable Sets if this Body can be pushed by another Body.
        A body that cannot be pushed will reflect back all of the velocity it is given to the colliding body. 
        If that body is also not pushable, then the separation will be split between them evenly.
        If you want your body to never move or seperate at all, see the setImmovable method. */
        this.playerPaddle.setPushable(false);

        this.playerPaddle.setCollideWorldBounds(true);
        /* The sprite is then set to collide with the world bounds. The bounds, by default, are on the outside of the game dimensions. 
        As we set the game to be 1000 x 600 then the player won't be able to run outside of this area. 
        It will stop the player from being able to run off the edges of the screen or jump through the top.*/


        //frameRate - The frame rate of playback, of the current animation, in frames per second. 0 by default
        //repeat - The number of times to repeat playback of the current animation. -1 val means animation will repeat forever
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('paddle', { start: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('paddle', { start: 0 }),
            frameRate: 10,
            repeat: -1
        });

        /**
         * This populates the cursors object with four properties: up, down, left, right, 
         * that are all instances of Key objects. Then all we need to do is poll these in 
         * our update loop.
         */
        this.cursors = this.input.keyboard.createCursorKeys();


        // ENEMY AI paddle
        this.enemyPaddle = this.physics.add.sprite(config.width - 50, 300, 'paddleAI');
        this.enemyPaddle.setScale(0.3, 0.3);
        this.enemyPaddle.setCollideWorldBounds(true);
        this.enemyPaddle.setPushable(false);


        /* The ball sprite was created via the Physics Game Object Factory (this.physics.add)
        which means it has a Dynamic Physics body by default.*/
        this.ball = this.physics.add.sprite(500, 300, 'BlueBall');

        //setScale - Sets the scale of this Game Object (Vertical and horizontal) this is like changing the actual sprite size!
        this.ball.setScale(0.2, 0.2);

        // setSize - Sets the internal size of this Game Object, as used for frame or physics body creation.
        //ball.setSize(10,10);

        //Sets the Body's velocity (horizontal and vertical)
        this.ball.setVelocity(this.xVelocityBallEnemy, this.yVelocityBallEnemyList[0]);

        /*Set the X and Y values of the gravitational pull to act upon this Arcade Physics Game Object. 
        Values can be positive or negative. Larger values result in a stronger effect.
        If only one value is provided, this value will be used for both the X and Y axis. */
        //ball.setGravityY(200);

        /* setBounce - Bounce is the amount of restitution, or elasticity, the body has when it collides with another object.
        A value of 1 means that it will retain its full velocity after the rebound. A value of 0 means it will not rebound at all. */
        this.ball.setBounce(1, 1);

        /* setCollideWorldBounds - Sets whether this Body collides with the world boundary.
        Optionally also sets the World Bounce values. If the Body.worldBounce is null, it's set to a new Phaser.Math.Vector2 first.
        */
        this.ball.setCollideWorldBounds(true);

        // collider method takes two objects and tests for collision and performs separation against them.
        // IMPORTANT NOTE 4-29-24 -> Make sure to use arrow notation when providing a method for the colliders third arg,
        // this is needed when doing everything in a class oriented approach (ANONYMOUS FUNCTION).
        this.physics.add.collider(this.playerPaddle, this.ball, () => this.playerHitsBall());
        this.physics.add.collider(this.enemyPaddle, this.ball, () => this.enemyHitsBall());

        console.log(`The width of ball is ${this.ball.width}`);

        console.log(`The x coordinate of enemy paddle is ${this.enemyPaddle.x}`);
        console.log(`The y coordinate of enemy paddle is ${this.enemyPaddle.y}`);
        console.log(`The width of enemy paddle is ${this.enemyPaddle.width}`);
        console.log(`The height of enemy paddle is ${this.enemyPaddle.height}`);

        this.playerScoreText = this.add.text(150, 0, `player score: ${this.playerScore}`, { fontFamily: 'Dream MMA', fontSize: '25px', fill: "#7DDA58", fixedWidth: 330 });
        this.enemyScoreText = this.add.text(505, 0, `enemy score: ${this.enemyScore}`, { fontFamily: 'Dream MMA', fontSize: '25px', fill: "#7DDA58", fixedWidth: 330 });

        /* Button component code  ensures the user can go back to the title scene
        if they click on the button and not anything else.*/
        this.goBackButton = new ButtonComponent({
            scene: this,
            x: 55, y: 35,
            scale: 0.2,
            background: 'goBackButton',
            onPush: this.goToTitleScene.bind(this)
        });

        // pause button allowing the player to stop the game until they want to resume it again
        this.pauseButton = new ButtonComponent({
            scene: this,
            x: 950, y: 35,
            scale: 0.2,
            background: 'pauseButton',
            onPush: this.pauseGame.bind(this)
        });

    }



    update() {
        /**The first thing it does is check to see if the up key is being held down. 
        * If it is we apply a negative vertical velocity and start the 'up' running animation. 
        * If they are holding down 'down' instead we literally do the opposite. 
        * By clearing the velocity and setting it in this manner, every frame, 
        * it creates a 'stop-start' style of movement.

        The player sprite will move only when a key is held down and stop immediately they are not.
        Phaser also allows you to create more complex motions, with momentum and acceleration,
        but this gives us the effect we need for this game. 

        */
        if (this.cursors.up.isDown) {
            this.playerPaddle.setVelocityY(-500);
            this.playerPaddle.anims.play('up', true);
        }
        else if (this.cursors.down.isDown) {
            this.playerPaddle.setVelocityY(500);
            this.playerPaddle.anims.play('down', true);
        }
        else {
            // without this final else block, your pong paddle will float like its underwater between the top wall and bottom wall.
            this.playerPaddle.setVelocityY(0);
        }

        /* main algorithm ideas:
        when the ball gets close to the enemy paddle, 
        move the enemy paddle so it can block the ball from passing it via updating (or setting) its velocity.

        Stop moving the paddle when the ball is not within its vicinity
        by stopping its velocity. */
        console.log(`The x velocity of ball is ${this.ball.body.velocity.x} and the y velocity of ball is ${this.ball.body.velocity.y}`);

        // ball is greater than or equal a width before the enemy paddle and a height below the enemys paddle.
        if (this.ball.x >= (this.enemyPaddle.x - 350) && this.ball.y >= this.enemyPaddle.y + 60) {
            // make the paddle move to collide with the ball.
            this.enemyPaddle.setVelocityY(400);
        }
        // ball is greater than or equal a width before the enemy paddle and less than a height above the enemys paddle.
        else if (this.ball.x >= (this.enemyPaddle.x - 350) && this.ball.y < this.enemyPaddle.y - 60) {
            // make the paddle move to collide with the ball.
            this.enemyPaddle.setVelocityY(-400);
        }
        else {
            this.enemyPaddle.setVelocityY(0);
        }


        // check if ball passes the right wall then update players score and reset balls position to the center again.
        if (this.ball.x >= config.width - 20) {
            this.ball.x = config.width / 2
            this.ball.y = config.height / 2
            this.ball.setVelocity(this.xVelocityBallEnemy, this.yVelocityBallEnemyList[2]);
            this.playerScore++;
            this.playerScoreText.setText(`player score: ${this.playerScore}`);
        }

        // check if ball passes the left wall then update enemys score and reset its position to the center again.
        if (this.ball.x <= 15) {
            this.ball.x = config.width / 2
            this.ball.y = config.height / 2
            this.ball.setVelocity(this.xVelocityBallPlayer, this.yVelocityBallPlayerList[2]);
            this.enemyScore++;
            this.enemyScoreText.setText(`enemy score: ${this.enemyScore}`);
        }

        // check when player or enemy reaches the maximum score and go to the high score screen
        if (this.playerScore === 3 || this.enemyScore === 3) {
            this.goToVictoryScene();
        }
    }

    /*
    This custom function returns a random number in a custom range that is inclusive of the min and max.
    */
    getRndInteger(minNum, maxNum) {
        return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    }

    /*
    This custom function will cause the velocity of the ball to change upon collision with the player paddle.
    The balls velocity will vary depending if the ball collides with the upper, center, or lower portion of the
    players paddle.
    */
    playerHitsBall() {
        console.log(`Ball y pos = ${this.ball.y}`);
        console.log(`playerPaddle y pos = ${this.playerPaddle.y}`);
        var xVelocityBall = this.getRndInteger(700, 800);

        // when the ball hits the middle portion of the paddle then it shoud bounce back at a 0-1 degree angle.
        if ((this.ball.y == this.playerPaddle.y) || (this.ball.y >= (this.playerPaddle.y - 15) && this.ball.y <= (this.playerPaddle.y + 15))) {
            console.log("ball hit middle portion of player paddle");
            this.ball.setVelocity(xVelocityBall, this.yVelocityBallPlayerList[0]);
        }
        else if (this.ball.y < this.playerPaddle.y) {
            // when the ball hits the upper portion of the paddle, then it should bounce at a 45 - 50 degree angle.
            console.log("ball hit upper portion of player paddle");
            this.ball.setVelocity(this.xVelocityBallPlayer, this.yVelocityBallPlayerList[1]);
        }
        else {
            // when the ball hits the lower portion of the paddle, then it should bounce at a negative 45 - 50 degree angle.
            console.log("ball hit lower portion of player paddle");
            this.ball.setVelocity(this.xVelocityBallPlayer, this.yVelocityBallPlayerList[2]);
        }


        /* setBounce - Bounce is the amount of restitution, or elasticity, the body has when it collides with another object.
    A value of 1 means that it will retain its full velocity after the rebound. A value of 0 means it will not rebound at all. */
        //ball.setBounce(1, 1);

    }

    /*
    This custom function will cause the velocity of the ball to change upon collision with the enemy paddle.
    The balls velocity will vary depending if the ball collides with the upper, center, or lower portion of the
    enemy paddle.
    */
    enemyHitsBall() {
        console.log(`Ball y pos = ${this.ball.y}`);
        console.log(`enemyPaddle y pos = ${this.enemyPaddle.y}`);

        // when the ball hits the middle portion of the paddle then it shoud bounce back at a 0-1 degree angle.
        if (this.ball.y == this.enemyPaddle.y) {
            console.log("ball hit middle portion of enemy paddle");
            this.ball.setVelocity(this.xVelocityBallEnemy, this.yVelocityBallEnemyList[0]);
        }
        else if (this.ball.y < this.enemyPaddle.y) {
            // when the ball hits the upper portion of the paddle, then it should bounce at a 45 - 50 degree angle.
            console.log("ball hit upper portion of enemy paddle");
            this.ball.setVelocity(this.xVelocityBallEnemy, this.yVelocityBallEnemyList[1]);
        }
        else {
            // when the ball hits the lower portion of the paddle, then it should bounce at a negative 45 - 50 degree angle.
            console.log("ball hit lower portion of enemy paddle");
            this.ball.setVelocity(this.xVelocityBallEnemy, this.yVelocityBallEnemyList[2]);
        }
    }

    // This method will allow the button component to proceed to the title scene, reset scores, and stop the music.
    goToTitleScene() {
        console.log('Going from Game to Title scene');
        this.playerScore = 0;
        this.enemyScore = 0;
        this.music.stop();
        this.scene.start('Title');
    }

    // This method will allow the button component to proceed to the high scene, reset scores, and stop the music.
    goToHighScoreScene() {
        console.log('Going from Game to High Score scene');
        this.playerScore = 0;
        this.enemyScore = 0;
        this.music.stop();
        this.scene.start('HighScore');
    }

    goToVictoryScene() {
        console.log('Going from Game to Victory scene');
        let winningScore = -1;
        let identityOfWinner = "unknown";

        if (this.playerScore > this.enemyScore) {
            console.log("PLAYER SCORE WAS BIGGER SO IM PASSING IT TO THE VICTORY SCENE FUNCTION");
            winningScore = this.playerScore;
            identityOfWinner = "You";
        }
        else if (this.enemyScore > this.playerScore) {
            console.log("ENEMY SCORE WAS BIGGER SO IM PASSING IT TO THE VICTORY SCENE FUNCTION");
            winningScore = this.playerScore;
            identityOfWinner = "AI";
        }
        console.log(`winningScore value is ${winningScore} and identity of winner is ${identityOfWinner}`);
        this.playerScore = 0;
        this.enemyScore = 0;
        this.music.stop();
        this.scene.start('Victory', {winningScore,identityOfWinner});

    }
    /* This method allows the player to pause the current scene and stop 
    the music then open a pause Menu (new scene).
     */
    pauseGame() {
        console.log("pausing game");
        this.scene.pause();
        this.music.stop();
        this.scene.launch('PauseMenu');
    }
}


class PauseMenu extends Phaser.Scene {
    constructor() {
        super('PauseMenu');
        this.pausedMenu;
        this.resumeButton;

    }

    create() {
        console.log('PauseMenu.create');
        //The veil is a way to apply a shadow over the game scene and allow the pause menu to appear as an overlay on top.
        this.veil = this.add.graphics({ x: 0, y: 0 });
        this.veil.fillStyle('0x000000', 0.3);
        this.veil.fillRect(0, 0, 1000, 600);
        this.veil.setScrollFactor(0);

        /* This button allows the player to resume the current scene.
        */
        this.resumeButton = new ButtonComponent({
            scene: this,
            x: 950, y: 35,
            scale: 0.2,
            background: 'resumeButton',
            onPush: this.goToGameScene.bind(this)
        });
    }

    /* This method allows the player to resume Game scene and it stops
    the pause menu which erases the veil and resume button from the screen.
    */
    goToGameScene() {
        console.log("going back to game");
        this.scene.resume('Game');
        this.scene.stop('PauseMenu');
    }

}


class Victory extends Phaser.Scene {
    constructor() {
        super('Victory');
        this.victoryText;
        this.winnerName;
        this.winnerScore;
        this.promptEnterText;
        this.userInitialsEntry;
    }

    create(data) {
        console.log('Victory.create');
        console.log(data);
        console.log(data.winningScore);
        console.log(data.identityOfWinner);

        // draw all the game objects onto the screen
        this.add.image(500, 300, 'victoryScreen');

        this.nameOfWinner = this.add.text(450, 30, `${data.identityOfWinner} won!`, { fontFamily: 'Dream MMA', fontSize: '40px', fill: "#0002E2" });

        // print the winners name and their score to the screen
        this.victoryText = this.add.text(300, 200, `Your score : ${data.winningScore} points`, { fontFamily: 'Dream MMA', fontSize: '40px', fill: "#0002E2"});

        // Continue button will proceed to the next scene upon clicking it 
        const continueButton = new ButtonComponent({
            scene: this,
            x: 500, y: 450,
            scale: 0.3,
            background: 'continueButton1',
            onPush: this.goToHighScoreScene.bind(this)
        });

        // save winners name and winner score to be used later
        this.winnerName = data.identityOfWinner;
        this.winnerScore = data.winningScore;

        // prompt that asks the user to input their initials
        this.promptEnterText = this.add.text(300, 350, 'Enter your initials:', { fontFamily: 'Dream MMA', fontSize: '20px', fill: "#0002E2"});

        // the text field that will capture the user input, initially its blank
        this.userInitialsEntry = this.add.text(500, 450, '', { fontFamily: 'Dream MMA', fontSize: '60px', fill: "#0002E2" });

        // when the user starts typing into the text field, the existing text will get replaced with the new text that the user entered.
        this.input.keyboard.on('keydown', event => {
            // check if backspace is entered AFTER the user has typed something of length > 0
            if (event.keyCode === 8 && this.userInitialsEntry.text.length > 0) {
                this.userInitialsEntry.text = this.userInitialsEntry.text.substr(0, this.userInitialsEntry.text.length - 1);
            }
            // check if user presses space bar or types in a digit, special symbol, or alphabet letter
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode <= 90)) {
                this.userInitialsEntry.text += event.key;
                // convert user input to UPPERCASE as they're typing
                this.userInitialsEntry.text = this.userInitialsEntry.text.toUpperCase();

            }

            // stop the users input from going beyond a certain length
            if (this.userInitialsEntry.text.length > 4) {
                console.log("you have gone beyond 4 characters");
                this.userInitialsEntry.text = this.userInitialsEntry.text.substr(0, this.userInitialsEntry.text.length - 1);
            }




        });

        console.log("heyheyhey");
        console.log(`this.textEntry.text value is initialized as : ${this.userInitialsEntry.text}`);
        console.log("byebyebye");

    }

    // This method will cause the high score scene to start and show all the high scores from the game so far.
    goToHighScoreScene(){
        let winningScore = this.winnerScore;
        let inputtedInitials = this.userInitialsEntry.text;
        console.log("Calling goToHighScoreScene");
        console.log(`winningScore value : ${winningScore}`);
        console.log(`inputtedInitials value : ${inputtedInitials}`);
        this.scene.start('HighScore', {inputtedInitials,winningScore});
    }
}

class HighScore extends Phaser.Scene {
    constructor() {
        super('HighScore');
        this.currentScoreName;
    }

    create(data) {
        console.log('HighScore.create');
        // draw all the game objects onto the screen
        this.add.image(500, 300, 'highScoresScreen');

        // print the winners name and their score to the screen
        this.currentScoreName = this.add.text(200, 100, `${data.inputtedInitials} won the game!\nWinning score : ${data.winningScore} points`, { fontFamily: 'Dream MMA', fontSize: '40px', fill: "#7DDA58" });

        // This back button will not go back to the victory screen, instead it will proceed to the game menu (essentially restarting the game all over again) 
        const goBackButton = new ButtonComponent({
            scene: this,
            x: 500, y: 350,
            scale: 0.3,
            background: 'goTitleScreenButton1',
            onPush: this.goToTitleScene.bind(this)
        });
    
    }

    // This method will cause the scene to change to the title screen menu and the player can start playing the game once again.
    goToTitleScene() {
        this.scene.start('Title');
    }
}

/*    
The width and height properties set the size of the canvas element that Phaser will create.
In this case 1000 x 600 pixels. Your game world can be any size you like,
but this is the resolution the game will display in.
 
When you set gravity: { y: 0 }, it means there is no vertical gravity acting on
the object. It won’t fall or rise due to gravity. This can be useful for creating
scenarios where you want to simulate a zero-gravity environment
or where you manually handle the object’s movement without relying on gravity.
*/
const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [Boot, Preloader, Title, Option, Credits, Game, PauseMenu, Victory, HighScore]
};
const game = new Phaser.Game(config);
