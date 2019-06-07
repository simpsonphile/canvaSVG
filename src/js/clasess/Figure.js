export class Figure {
  constructor () {
    this.scale = 1

    this.isSelected = false
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

  strokeIfSelected (ctx) {
    if (this.isSelected) {
      ctx.setLineDash([5])
    } else {
      ctx.setLineDash([])
    }
  }

  draw (ctx) {
    ctx.save()
    ctx.fillStyle = 'transparent'
    ctx.lineWidth = this.strokeWidth * this.scale
    ctx.strokeStyle = this.strokeColor

    this.strokeIfSelected(ctx)

    ctx.beginPath()
    this.drawFigure(ctx)
    ctx.stroke()
    ctx.fill()
    ctx.restore()
  }

  isClicked () {}
}
