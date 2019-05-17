export class Figure {
  constructor () {
    this.svg = {}
    this.scale = 1
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
    ctx.beginPath()
    this.drawFigure(ctx)
    ctx.strokeStyle = this.sc
    ctx.stroke()
    ctx.fill()
    ctx.restore()
  }
}
