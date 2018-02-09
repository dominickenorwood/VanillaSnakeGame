class GridBuilder {
  constructor(grid, power, forbidden){
    this.grid = grid;
    this.power = power;
    this.forbidden = forbidden;
    this.size = Math.pow(grid, power);
  }

  slots(array, hM, vM) {
    for(let block of array) {
      if(block.top !== this.forbidden) block.top = block.number - vM;
      if(block.right !== this.forbidden) block.right = block.number + hM;
      if(block.bottom !== this.forbidden) block.bottom = block.number + vM;
      if(block.left !== this.forbidden) block.left = block.number - hM;
    }

    return array;
  }

  border(array, side, start, end, multiplier) {
    for(let i = start; i <= end; i += multiplier) {
      array[i - 1][side] = this.forbidden;
      array[i - 1].border = true;
    }

    return array;
  }

  corners() {
    return {
      left_top : this.grid - (this.grid - 1),
      right_top : this.grid,
      left_bottom : this.size - (this.grid -1),
      right_bottom : this.size
    }
  }

  get build() {
    const { left_top, right_top, left_bottom, right_bottom } = this.corners();
    const _hMultiplier = left_top;
    const _vMultiplier = right_top;

    let _blocks = [];

    for(let i = 1; i <= this.size; i++){
      const _block = {
        name: `block-${i}`,
        number: i,
        top: null,
        right: null,
        bottom: null,
        left: null,
        border: false
      }

      _blocks.push(_block);
    }

    _blocks = this.border(_blocks, 'top', left_top, right_top, _hMultiplier,);
    _blocks = this.border(_blocks, 'right', right_top, right_bottom, _vMultiplier);
    _blocks = this.border(_blocks, 'bottom', left_bottom, right_bottom, _hMultiplier);
    _blocks = this.border(_blocks, 'left', left_top, left_bottom, _vMultiplier);
    _blocks = this.slots(_blocks, _hMultiplier, _vMultiplier);

    return _blocks;
  }
}
