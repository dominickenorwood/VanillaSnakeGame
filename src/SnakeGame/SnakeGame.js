class SnakeGame {
  constructor(grid, domStrings) {
    this.grid = grid;
    this.domStrings = domStrings;
    this.board = new GameBoard();
    this.snake = new Snake(grid, 108, []);
    this.apple = new Apple(grid, 112, []);
    this.score = 0;
    this.direction = 'right';
    this.timer = null;
    this.setScore = this.setScore.bind(this);
    this.gameover = this.gameover.bind(this);
    this.controls = this.controls.bind(this);
  }

  startGame() {
    const _snakeDefault = this.snake.defaultPosition;
    const _appleDefault = this.apple.defaultPosition;

    this.score = 0;
    this.direction = 'right';
    this.board.removeOverlay(this.domStrings);
    this.board.updateScore(this.score, this.domStrings);
    this.addDirectionalListener();

    console.log('Start Game');
    this.timer = setInterval(() => {
      this.snake.move(this.direction, this.apple, this.setScore, this.gameover);
    }, 130);

    if(_snakeDefault !== this.snake.getSprite())
      this.snake.remove(this.snake.getSprite());
      this.snake.default();
    if(_appleDefault !== this.apple.getSprite())
      this.apple.remove(this.apple.getSprite());
      this.apple.default();
  }

  gameover() {
    this.board.showOverlay(this.score, this.domStrings);
    this.removeDirectionalListener();
    clearInterval(this.timer);
    console.log('Game Over Man, Game Over!');
  }

  setScore(points) {
    this.score += points;
    this.board.updateScore(this.score, this.domStrings);
  }

  get getScore() {
    return this.score;
  }

  controls(event) {
    let _direction = '';

    switch (event.keyCode) {
      case 37:
      _direction = 'left';
      break;
    case 38:
      _direction = 'top';
      break;
    case 39:
      _direction = 'right';
      break;
    case 40:
      _direction = 'bottom'
      break;
    default:
      return;
    }

    if(!this.snake.isNeck(_direction)) this.direction = _direction;

    //this.snake.move(_direction, this.apple, this.setScore, this.gameover);
  }

  removeDirectionalListener() {
    document.removeEventListener('keydown', this.controls);
  }

  addDirectionalListener() {
    document.addEventListener('keydown', this.controls);
  }

  addStartListener () {
    document.addEventListener('click', event => {
      if(event.target.classList.contains(this.domStrings.start_button))
        this.startGame();
    });
  }

  init () {
    this.board.render(this.grid, this.domStrings);
    this.addStartListener();
    this.snake.default();
    this.apple.default();
  }
}
