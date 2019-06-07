export class Figure {
  constructor () {
    this.scale = 1

    this.selected = false
  }

  generateFigureHTML () {}

  rescale (nScale) {}

  scaleForSvg (val) {
    return Math.floor(val / this.scale)
  }

  returnHTML () {
    const HTML = this.generateFigureHTML()

    return HTML
  }

  drawFigure (ctx) {}

  draw (ctx) {
    ctx.save()
    ctx.fillStyle = 'transparent'
    ctx.lineWidth = this.strokeWidth * this.scale
    ctx.strokeStyle = this.strokeColor
    ctx.beginPath()
    this.drawFigure(ctx)
    ctx.stroke()
    ctx.fill()
    ctx.restore()
  }

  isClicked () {}
}
