class Booster {

    constructor(x, y) {
        this.body = createSprite(x, y, 10, 10);
        this.body.addImage(booster_enemy);
        this.body.scale = 0.5;
    }
}