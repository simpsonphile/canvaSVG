import { Figure } from './Figure'

export class Curve extends Figure {
  constructor (x, y, x1, y1, x2, y2, sw, sc, scale) {
    super()
    this.x = x
    this.y = y
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

    this.x *= toScale
    this.y *= toScale
    this.x1 *= toScale
    this.y1 *= toScale
    this.x2 *= toScale
    this.y2 *= toScale
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
    ctx.bezierCurveTo(parseInt(this.x), parseInt(this.y), parseInt(this.x1), parseInt(this.x2), parseInt(this.x2), parseInt(this.y2))
  }
}
