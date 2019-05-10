import { Figure } from './Figure'

export class Circle extends Figure {
  constructor (cx, cy, r, sw, sc, fc, scale) {
    super()
    this.cx = parseInt(cx)
    this.cy = parseInt(cy)
    this.r = parseInt(r)
    this.sw = parseInt(sw)
    this.sc = sc
    this.fc = fc
    this.scale = scale
  }

  generateFigureHTML () {
    return `
      <circle cx="${this.scaleForSvg(this.cx)}"
              cy="${this.scaleForSvg(this.cy)}"
              r="${this.scaleForSvg(this.r)}"
              stroke-width="${this.sw}"
              stroke="${this.sc}"
              fill="${this.fc}">
      </circle>
      `
  }

  drawFigure (ctx) {
    ctx.arc(this.cx, this.cy, this.r, 0, 2 * Math.PI)
  }
}
