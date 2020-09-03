class Enemy {

  constructor(x, y) {
    this.body = createSprite(x, y, 10, 10);
    var rand2 = Math.round(1, 2);
    switch (rand2) {
      case 1: this.body.addImage(enemy1);
        break;
      case 2: this.body.addImage(enemy2);
        break;
      default: break;
    }
    this.body.scale = 0.1;
    this.body.velocityY = 7;
  }
}