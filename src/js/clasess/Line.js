import { Figure } from './Figure'

export class Line extends Figure {
  constructor (x1, y1, x2, y2, strokeWidth, strokeColor, scale, name) {
    super()
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
    this.strokeWidth = strokeWidth
    this.strokeColor = strokeColor

    this.scale = scale

    this.name = name
  }

  rescale (nScale) {
    const toScale = nScale / this.scale
    this.scale = nScale

    this.x1 *= toScale
    this.y1 *= toScale
    this.x2 *= toScale
    this.y2 *= toScale
  }

  generateFigureHTML () {
    return `<line x1="${this.scaleForSvg(this.x1)}"
                  y1="${this.scaleForSvg(this.y1)}"
                  x2="${this.scaleForSvg(this.x2)}"
                  y2="${this.scaleForSvg(this.y2)}"
                  stroke-width="${this.strokeWidth}"
                  stroke="${this.strokeColor}">
            </line>`
  }

  drawFigure (ctx) {
    ctx.moveTo(parseInt(this.x1), parseInt(this.y1))
    ctx.lineTo(parseInt(this.x2), parseInt(this.y2))
  }

  isClicked (point) {
    const x = point.x
    const y = point.y
    const x1 = this.x1
    const x2 = this.x2
    const y1 = this.y1
    const y2 = this.y2
    return (Math.abs((y - y1) * (x2 - x1) - (y2 - y1) * (x - x1)) < 1000)
  }
}
