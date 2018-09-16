// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    
    // x pos
    this.x = x;
    // y pos of enemy , centered
    this.y = y + 55;
    //speed
    this.speed = speed;
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary = this.step * 5;
    //reset position to 1 block offscreen
    this.resetPos = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //If enemy is not passed the boundary
    if(this.x < this.boundary) {
        // Move forward
        // Increment x by speed *dt
        this.x += this.speed * dt;
    } 
    else {
        // Reset pos to start
        this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player character

class Hero  {
    constructor() {
        this.sprite = 'images/char-cat-girl.png';
        //x-axis jumps
        this.step = 101;
        // y-axis jumps
        this.jump = 83;
        // Start Position of Hero
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.gameover = false;
    }

    // Update position for collisions
    update() {

        // Check collision here
        for(let enemy of allEnemies) {
           
            // Check to see if character collided with enemy
            if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2) ) {
                this.reset();
            }
        }

         // Check to see if the character reached the river
         if(this.y === 55) {
            this.gameover = true;
        }
          
    }

    //Render the position of the character's x and y position in game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
     * Update hero's x and y property according to input
     * 
     * Travel Direction
     * Sets parameters to keep character confined to game area
     */

    handleInput(input) {
        switch(input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case 'up':
                if (this.y > this.jump) {
                    this.y -= this.jump;
                }
                break;
            case 'right':
                if (this.x < this.step * 4) {
                    this.x += this.step;
                }
                break;
            case 'down':
                if (this.y < this.jump * 4) {
                    this.y += this.jump;
                }
                break;
            }   
        }

    // Reset hero
    reset() {
        // Set x and y to starting x and y
        this.y = this.startY;
        this.X = this.startX;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Hero();
const bug1 = new Enemy(-101, 0, 200);
const bug2 = new Enemy(-101, 83, 300);
const bug3 = new Enemy((-101*2.5), 83, 300);
const bug4 = new Enemy(-101*3.5, 166, 260);
const allEnemies = [];
allEnemies.push(bug1,bug2,bug3,bug4);

// New Hero object

//Init allEnemies array
// For each enemy create and push new Enemy object into above array

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
