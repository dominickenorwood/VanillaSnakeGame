class Apple extends Sprite {
  constructor(grid, slot, sprite) {
    super(grid, slot, sprite);
  }

  renderApple(snake) {
    const _random = Math.floor(Math.random() * this.grid.length) + 1;
    const _occupied = snake.find(part => part.slot === _random);

    if(!_occupied){
      const _newApple = this.grid[_random - 1];

      this.sprite = [{ name: _newApple.name, slot : _newApple.number, type : 'apple' }];
      return this.paint(this.sprite);

    } else {
      return this.renderApple(snake);
    }
  }

  default() {
    const _apple = this.grid[this.startSlot - 1];

    this.sprite = [{ name: _apple.name, slot : _apple.number, type : 'apple' }];
    this.defaultPosition = this.sprite;
    this.paint(this.sprite);
  }
}
