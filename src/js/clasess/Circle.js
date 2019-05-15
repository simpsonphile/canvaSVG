import { Figure } from './Figure'

export class Circle extends Figure {
  constructor (cx, cy, r, sw, sc, fc, scale) {
    super()
    this.cx = cx
    this.cy = cy
    this.r = r
    this.sw = sw
    this.sc = sc
    this.fc = fc
    this.scale = scale
  }

  rescale (nScale) {
    const toScale = nScale / this.scale
    this.scale = nScale

    this.cx *= toScale
    this.cy *= toScale
    this.r *= toScale
    this.sw *= toScale
  }

  generateFigureHTML () {
    return `
      <circle cx="${this.scaleForSvg(this.cx)}"
              cy="${this.scaleForSvg(this.cy)}"
              r="${this.scaleForSvg(this.r)}"
              stroke-width="${parseInt(this.sw)}"
              stroke="${this.sc}"
              fill="${this.fc}">
      </circle>
      `
  }

  drawFigure (ctx) {
    ctx.arc(parseInt(this.cx), parseInt(this.cy), parseInt(this.r), 0, 2 * Math.PI)
  }
}
