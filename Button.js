class Button {

    constructor() {
        this.button = createButton('Play Again');
        this.button.position((width / 2), -25);
    }

    display() {
        this.button.position((width / 2), 250);
        this.button.velocityX = player.body.velocityX;
        this.button.mousePressed(() => {
            gameState = "play";
            score = 0;
            player.body.position.x=130;
            player.body.position.y=120;
            resetButton.hide();
        })
    }

    hide() {
        this.button.position((width / 2), -25);
        this.button.visible = false;
        this.button.mousePressed(() => {
            gameState = "play";
            score = 0;
            resetButton.hide();
        })
    }
}