import { Figure } from './Figure'

export class Ellipse extends Figure {
  constructor (cx, cy, rx, ry, sw, sc, fc, scale, fillMode) {
    super()
    this.cx = cx
    this.cy = cy
    this.rx = rx
    this.ry = ry
    this.sw = sw
    this.sc = sc
    this.fc = fillMode ? fc : 'transparent'
    this.scale = scale
  }

  rescale (nScale) {
    const toScale = nScale / this.scale
    this.scale = nScale

    this.cx *= toScale
    this.cy *= toScale
    this.rx *= toScale
    this.ry *= toScale
  }

  generateFigureHTML () {
    return `
      <ellipse cx="${this.scaleForSvg(this.cx)}"
              cy="${this.scaleForSvg(this.cy)}"
              rx="${this.scaleForSvg(this.rx)}"
              ry="${this.scaleForSvg(this.ry)}"
              stroke-width="${this.sw}"
              stroke="${this.sc}"
              fill="${this.fc}">
      </ellipse>
      `
  }

  drawFigure (ctx) {
    ctx.ellipse(parseInt(this.cx), parseInt(this.cy), parseInt(this.rx), parseInt(this.ry), 0, 0, 2 * Math.PI)
    ctx.fillStyle = this.fc
  }
}
