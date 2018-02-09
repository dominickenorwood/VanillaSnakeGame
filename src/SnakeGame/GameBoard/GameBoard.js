class GameBoard {
  constructor() {

  }

  showOverlay(score, domStrings) {
    const { start_button, overlay, hide, message } = domStrings;
    document.getElementById(overlay).classList.remove(hide);
    document.getElementsByClassName(message)[0].innerHTML = `Game Over <span>Your Score : ${score}</span>`;
    document.getElementsByClassName(start_button)[0].innerHTML = 'Play Again!';
  }

  removeOverlay(domStrings) {
    const { overlay, hide } = domStrings;
    document.getElementById(overlay).classList.add(hide);
  }

  updateScore(score, domStrings) {
    const { game_score } = domStrings;
    document.getElementsByClassName(game_score)[0].innerHTML = score;
  }

  blocks (array) {
    let _html = '';
    array.forEach(block => {
      const _type = (block.border) ? 'border' : '';
      _html = (
                `${_html}
                <div id="${block.name}" class="game-board__block ${_type}">
                  <span></span>
                </div>`
              );
    })
    return _html;
  }

  render(grid, domStrings) {

    const { root, game_board, game_wrapper, game_border, overlay, start_button, message} = domStrings;
    const _html = (
                    `<div id="${game_board}">
                      <div class="${game_wrapper}">
                        <div id="score">
                          <span class="score__count">0</span>
                        </div>
                        <div class="${game_border}">
                          ${this.blocks(grid)}
                        </div>
                      </div>
                    </div>
                    <div id="${overlay}">
                      <div class="overlay_wrapper">
                        <div class="${message}">Snake Game</div>
                        <div class="${start_button}">Start</div>
                      </div>
                    </div>`
                  );
    document.getElementById(root).insertAdjacentHTML('beforeend', _html);
  }
}
