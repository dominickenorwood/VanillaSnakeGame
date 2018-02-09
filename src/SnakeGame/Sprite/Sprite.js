class Sprite {
  constructor(grid, startSlot, sprite) {
    this.grid = grid;
    this.startSlot = startSlot;
    this.sprite = sprite;
    this.defaultPosition = null;
  }

  opposite(direction){
    switch (direction) {
      case 'top':
        return 'bottom';
        break;
      case 'bottom':
        return 'top';
        break;
      case 'left':
        return 'right';
        break;
      case 'right':
        return 'left';
        break;
    }
  }

  remove(array) {
    array.forEach(part => document.getElementById(part.name).classList.remove(part.type));
  }

  paint(array) {
    array.forEach(part => document.getElementById(part.name).classList.add(part.type));
  }

  getSprite() {
    return this.sprite;
  }

}
