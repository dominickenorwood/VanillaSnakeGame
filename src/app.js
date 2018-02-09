const BUILD_GRID = 20;
const POWER_OF = 2;
const FORBIDDEN = 'FORBIDDEN';
const GRID_BUILDER = new GridBuilder(BUILD_GRID, POWER_OF, FORBIDDEN);
const GRID = GRID_BUILDER.build;

const DOM_STRINGS = {
  root : 'root',
  game_board : 'game-board',
  game_wrapper : 'game-board__wrapper',
  game_border : 'game-board__border',
  game_score : 'score__count',
  start_button : 'overlay__start-btn',
  overlay : 'overlay',
  hide : 'overlay--hide',
  message : 'overlay__message'
}

const GAME = new SnakeGame(GRID, DOM_STRINGS);
GAME.init();
