import { Figure } from './Figure'

export class Curve extends Figure {
  constructor (x, y, x1, y1, x2, y2, sw, sc, scale) {
    super()
    this.x = x
    this.y = y
    this.x1 = parseInt(x1)
    this.y1 = parseInt(y1)
    this.x2 = parseInt(x2)
    this.y2 = parseInt(y2)
    this.sw = parseInt(sw)
    this.sc = sc

    this.scale = scale
  }

  generateFigureHTML () {
    return `<path d="M${this.scaleForSvg(this.x)} ${this.scaleForSvg(this.y)}
                     Q${this.scaleForSvg(this.x1)}
                      ${this.scaleForSvg(this.y1)}
                      ${this.scaleForSvg(this.x2)}
                      ${this.scaleForSvg(this.y2)}"
                  stroke-width="${this.sw}"
                  stroke="${this.sc}"
                  fill="none">
            </path>`
  }

  drawFigure (ctx) {
    ctx.bezierCurveTo(this.x, this.y, this.x1, this.x2, this.x2, this.y2)
  }
}
