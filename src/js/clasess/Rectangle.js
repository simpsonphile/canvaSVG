import { Figure } from './Figure'

export class Rectangle extends Figure {
  constructor (x, y, w, h, strokeWidth, strokeColor, fillColor, scale) {
    super()
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.strokeWidth = strokeWidth
    this.strokeColor = strokeColor
    this.fillColor = fillColor

    this.scale = scale
  }

  rescale (nScale) {
    const toScale = nScale / this.scale
    this.scale = nScale

    this.x *= toScale
    this.y *= toScale
    this.w *= toScale
    this.h *= toScale
    this.strokeWidth *= toScale
  }

  generateFigureHTML () {
    return `<rect x="${this.scaleForSvg(this.x)}"
                  y="${this.scaleForSvg(this.y)}"
                  width="${this.scaleForSvg(this.w)}"
                  height="${this.scaleForSvg(this.h)}"
                  stroke-width="${this.strokeWidth}"
                  stroke="${this.strokeColor}"
                  fill="${this.fillColor}">
            </rect>`
  }

  drawFigure (ctx) {
    ctx.fillStyle = this.fillColor
    ctx.rect(parseInt(this.x), parseInt(this.y), parseInt(this.w), parseInt(this.h))
  }
}
