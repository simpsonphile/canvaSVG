import { Figure } from './Figure'
import { triangleArea } from '../utility'

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

  isClicked (point) {
    const x = point.x
    const y = point.y
    const x1 = this.x
    const x2 = this.x + this.w
    const x3 = this.x + this.w
    const x4 = this.x
    const y1 = this.y
    const y2 = this.y
    const y3 = this.y + this.h
    const y4 = this.y + this.h

    /* Calculate area of rectangle ABCD */
    const A = triangleArea(x1, y1, x2, y2, x3, y3) +
              triangleArea(x1, y1, x4, y4, x3, y3)

    /* Calculate triangleArea of triangle PAB */
    const A1 = triangleArea(x, y, x1, y1, x2, y2)

    /* Calculate triangleArea of triangle PBC */
    const A2 = triangleArea(x, y, x2, y2, x3, y3)

    /* Calculate triangleArea of triangle PCD */
    const A3 = triangleArea(x, y, x3, y3, x4, y4)

    /* Calculate triangleArea of triangle PAD */
    const A4 = triangleArea(x, y, x1, y1, x4, y4)

    /* Check if sum of A1, A2, A3 and A4 is same as A */
    return (A === A1 + A2 + A3 + A4)
  }
}
