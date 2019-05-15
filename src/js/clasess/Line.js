import { Figure } from './Figure'

export class Line extends Figure {
  constructor (x1, y1, x2, y2, sw, sc, scale) {
    super()
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
    this.sw = sw
    this.sc = sc

    this.scale = scale
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
                  stroke-width="${parseInt(this.sw)}"
                  stroke="${this.sc}">
            </line>`
  }

  drawFigure (ctx) {
    ctx.moveTo(parseInt(this.x1), parseInt(this.y1))
    ctx.lineTo(parseInt(this.x2), parseInt(this.y2))
  }
}
