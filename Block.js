class Block {

    constructor(x, y,w,h) {
        var color=rgb(random(0,255),random(0,255),random(0,255));
        this.body = createSprite(x, y, w, h);
        this.body.shapeColor=color;
    }

    behaviour() {
        //this.body.velocityX = -9;
        //console.log(this.body.x);
        if (this.body.x < -5) {
            this.body.lifetime = 0;
        }
    }
}