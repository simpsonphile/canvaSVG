import { Figure } from './Figure'

export class Rectangle extends Figure {
  constructor (x, y, w, h, sw, sc, fc, scale) {
    super()
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.sw = sw
    this.sc = sc
    this.fc = fc

    this.scale = scale
  }

  rescale (nScale) {
    const toScale = nScale / this.scale
    this.scale = nScale

    this.x *= toScale
    this.y *= toScale
    this.w *= toScale
    this.h *= toScale
    this.sw *= toScale
  }

  generateFigureHTML () {
    return `<rect x="${this.scaleForSvg(this.x)}"
                  y="${this.scaleForSvg(this.y)}"
                  width="${this.scaleForSvg(this.w)}"
                  height="${this.scaleForSvg(this.h)}"
                  stroke-width="${parseInt(this.sw)}"
                  stroke="${this.sc}"
                  fill="${this.fc}">
            </rect>`
  }

  drawFigure (ctx) {
    ctx.rect(parseInt(this.x), parseInt(this.y), parseInt(this.w), parseInt(this.h))
  }
}
