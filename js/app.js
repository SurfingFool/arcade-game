// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // Generates initial random speed for Enemy
    this.speed = Math.floor((Math.random() * 400) + 100);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Instantiate (create an instance of) Enemy in order to 
// implement the function.
// Place all enemy objects in an array called allEnemies.
var allEnemies = [];
allEnemies[0] = new Enemy(-400, 65);
allEnemies[1] = new Enemy(-600, 150);
allEnemies[2] = new Enemy(-120, 230);
allEnemies[3] = new Enemy(-240, 150);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;
    // Controls what happens when enemy goes off playing grid/establishes
    // random starting position each time across.
    if (this.x > 500) this.x = Math.floor(Math.random() * (-800 - (-400) + (-400)));
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, dir) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.sprite = 'images/char-boy.png';
};

// Now instantiate your Player function object (or child of the function):
// Place the player object (constructed from the Player class)
// in a variable called player and set initial x & y properties or values.
var player = new Player(200, 406);

// Function that checks for collisions between player and enemies.
// Made available globally.  Stored array length for efficiency.
var checkCollisions = function() {
    for (var i = 0, len = 4; i < len; i++) {
        if (player.x <= (allEnemies[i].x + 50) &&
            (player.x + 50) >= allEnemies[i].x &&
            player.y <= (allEnemies[i].y + 50) &&
            (player.y + 50) >= allEnemies[i].y) {
            alert("Gotcha! Start Over!");
            player.x = 200;
            player.y = 406;
        }
    }
};

// Defining a function called winner. Called when player reaches water.
var winner = function() {
    alert("WAY TO GO!");
    player.x = 200;
    player.y = 406;
};

Player.prototype.update = function(allEnemies) {
    checkCollisions(allEnemies);

    // Limit the boundaries where player can move within
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 406) {
        this.x = 406;
    } else if (this.y < -9) {
        this.y = -9;
    } else if (this.y > 406) {
        this.y = 406;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dir) {
    if (dir === 'up') {
        this.y -= 83;
    } else if (dir === 'right') {
        this.x += 101;
    } else if (dir === 'down') {
        this.y += 83;
    } else if (dir === 'left') {
        this.x -= 101;
    }

    // Condition when reaching water in response to input. Works with 
    // setTimeout to delay calling the winner function.  Includes 
    // (function, milliseconds).  Will invoke function once 100ms condition
    // is met.
    if (this.y <= -9) {
        setTimeout(winner, 100);
    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});