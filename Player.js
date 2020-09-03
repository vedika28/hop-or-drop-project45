class Player {

    constructor(x, y, w, h) {

        this.body = createSprite(x, y, w, h);
        this.body.addAnimation("walking", playerAnm);
        //this.body.debug = true;
        this.body.setCollider("rectangle", 0, 0, 40, 70);
        this.body.addAnimation("shield",player_shield);
        this.body.addImage("die",player_die);
    }

    behaviour() {
        if (keyDown("UP_ARROW")&&this.body.position.y>=175||keyDown("space")&&this.body.position.y>=175) {
            this.body.velocityY = -10;
            this.body.addImage(player_jump);
        }
        this.body.velocityY += 1;

        if (keyDown("RIGHT_ARROW")) {
            this.body.velocityX = 5;
        }

        if (this.body.position.y > 310) {
            gameState = "end";
        }
    }

    die() {
        if (this.body.isTouching(enemy.body)) {
            gameState = "end";
        }
    }

    shield() {
        if (keyDown("s")) {
            this.body.changeAnimation("shield", player_shield);
            this.body.setCollider("circle", 0, -12, 50);
            this.body.scale = 1;
            shieldImg = 1;
        } else {
            shieldImg === 0;
            this.body.changeAnimation("walking", playerAnm);
            this.body.scale = 1;
            this.body.setCollider("rectangle", 0, 0, 40, 70);
        }
    }
}