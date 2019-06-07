import { Figure } from './Figure'

export class Ellipse extends Figure {
  constructor (cx, cy, rx, ry, strokeWidth, strokeColor, fillColor, scale) {
    super()
    this.cx = cx
    this.cy = cy
    this.rx = rx
    this.ry = ry
    this.strokeWidth = strokeWidth
    this.strokeColor = strokeColor
    this.fillColor = fillColor
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
              stroke-width="${this.strokeWidth}"
              stroke="${this.strokeColor}"
              fill="${this.fillColor}">
      </ellipse>
      `
  }

  drawFigure (ctx) {
    ctx.ellipse(parseInt(this.cx), parseInt(this.cy), parseInt(this.rx), parseInt(this.ry), 0, 0, 2 * Math.PI)
    ctx.fillStyle = this.fillColor
  }

  isClicked (point) {
    const x = point.x
    const y = point.y
    const h = this.cx
    const k = this.cy
    const a = this.rx
    const b = this.ry
    return (x - h) * (x - h) / (a * a) + (y - k) * (y - k) / (b * b) <= 1
  }
}
