import { Figure } from './Figure'

export class Line extends Figure {
  constructor (x1, y1, x2, y2, sw, sc, scale) {
    super()
    this.x1 = parseInt(x1)
    this.y1 = parseInt(y1)
    this.x2 = parseInt(x2)
    this.y2 = parseInt(y2)
    this.sw = parseInt(sw)
    this.sc = sc

    this.scale = scale
  }

  generateFigureHTML () {
    return `<line x1="${this.scaleForSvg(this.x1)}"
                  y1="${this.scaleForSvg(this.y1)}"
                  x2="${this.scaleForSvg(this.x2)}"
                  y2="${this.scaleForSvg(this.y2)}"
                  stroke-width="${this.sw}"
                  stroke="${this.sc}">
            </line>`
  }

  drawFigure (ctx) {
    ctx.moveTo(this.x1, this.y1)
    ctx.lineTo(this.x2, this.y2)
  }
}
