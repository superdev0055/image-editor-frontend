class CenterAlign {
  constructor(canvas) {
    this.canvas = canvas;
  }

  position(name) {
    const anignType = ['centerH', 'center', 'centerV'];
    const activeObject = this.canvas.getActiveObject();
    if (anignType.includes(name) && activeObject) {
      activeObject[name]();
      this.canvas.renderAll();
    }
  }
}

export default CenterAlign;
