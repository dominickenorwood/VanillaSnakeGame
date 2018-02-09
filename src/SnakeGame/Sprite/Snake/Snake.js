class Snake extends Sprite {
  constructor(grid, slot, sprite) {
    super(grid, slot, sprite);
  }

  isNeck(direction) {
    const _head = this.sprite[0];
    const _neck = this.sprite[0].connector;
    const _headDirectionSlot = this.grid[_head.slot - 1][direction];
    const _isNeck = this.grid[_head.slot - 1][_neck] === _headDirectionSlot;

    return _isNeck;
  }

  get getNewTail() {
    const _tail = this.sprite[this.sprite.length -1];
    const _newTailSlot = this.grid[_tail.slot - 1][this.opposite(_tail.connector)]
    const _newTail = {};

    if(_newTailSlot === FORBIDDEN) {
      let _directions = ['left', 'right', 'top','bottom'];
      let _plucked = _directions.filter(direction => direction !== _tail.connector && direction !== this.opposite(_tail.connector));

      for(let pluck of _plucked) {
        let _altTailSlot = this.grid[_tail.slot - 1][pluck];

        if(_altTailSlot !== FORBIDDEN) {
          let _altGridSlot = this.grid[_altTailSlot - 1];

          return {
                    name : _altGridSlot.name,
                    slot : _altGridSlot.number,
                    type : 'tail',
                    connector : this.opposite(pluck)
                };
        }
      };
    }

    const _gridSlot = this.grid[_newTailSlot - 1];
    return {
              name : _gridSlot.name,
              slot : _gridSlot.number,
              type : 'tail',
              connector : _tail.connector
          };
  }

  default() {
    const _head = this.grid[this.startSlot - 1];
    const _bodyOne = this.grid[_head.left - 1];
    const _bodyTwo = this.grid[_bodyOne.bottom - 1];
    const _tail = this.grid[_bodyTwo.bottom - 1];

    this.sprite = [
                  { name: _head.name, slot : _head.number, type : 'head', connector : 'left' },
                  { name: _bodyOne.name, slot : _bodyOne.number, type : 'body', connector : 'right'},
                  { name: _bodyTwo.name, slot : _bodyTwo.number, type : 'body', connector : 'top'},
                  { name: _tail.name, slot : _tail.number, type : 'tail', connector : 'top'}
                ];

    this.defaultPosition = this.sprite;
    this.paint(this.sprite);
  }

  move(direction, apple, score, gameover){
    const _head = this.sprite[0];
    const _headDirectionSlot = this.grid[_head.slot - 1][direction];
    const _isBody = this.sprite.find(part => part.slot === _headDirectionSlot && part.type === 'body');
    const _isTail = this.sprite[this.sprite.length - 1].slot === _headDirectionSlot;
    const _hitBorder = _headDirectionSlot === FORBIDDEN;
    const _apple = apple.getSprite();
    const _newSnake = [];

    if(_isBody || _isTail || _hitBorder) {
      // Game Over!
      gameover();
      return;

    } else {
      let _moved = '';

      if(_headDirectionSlot === _apple[0].slot){
        this.remove(_apple);
        apple.renderApple(this.sprite);
        this.sprite[this.sprite.length - 1].type = 'body';
        this.sprite.push(this.getNewTail);
        score(5);
      }

      const _newSnake = this.sprite.map(part => {
        if(part.type === 'head'){
          const _newHead = {
                              name : this.grid[_headDirectionSlot - 1].name,
                              slot : _headDirectionSlot,
                              type : 'head',
                              connector : this.opposite(direction)
                           };
          _moved = direction;
          return _newHead;

        } else {
          const _bodyDirectionSlot = this.grid[part.slot - 1][part.connector];
          const _type = (part.type === 'body') ? 'body' : 'tail';
          const _newBody = {
                              name : this.grid[_bodyDirectionSlot - 1].name,
                              slot : _bodyDirectionSlot,
                              type : _type,
                              connector : _moved
                           };

          _moved = part.connector;
          return _newBody;
        }
      });

      this.remove(this.sprite);
      this.sprite = _newSnake;
      this.paint(_newSnake);
    }
  }
}
