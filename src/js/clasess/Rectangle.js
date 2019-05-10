import { Figure } from './Figure'

export class Rectangle extends Figure {
  constructor (x, y, w, h, sw, sc, fc, scale) {
    super()
    this.x = parseInt(x)
    this.y = parseInt(y)
    this.w = parseInt(w)
    this.h = parseInt(h)
    this.sw = parseInt(sw)
    this.sc = sc
    this.fc = fc

    this.scale = scale
  }

  generateFigureHTML () {
    return `<rect x="${this.scaleVal(this.x)}"
                  y="${this.scaleVal(this.y)}"
                  width="${this.scaleVal(this.w)}"
                  height="${this.scaleVal(this.h)}"
                  stroke-width="${this.sw}"
                  stroke="${this.sc}"
                  fill="${this.fc}">
            </rect>`
  }

  drawFigure (ctx) {
    ctx.rect(this.x, this.y, this.w, this.h)
  }
}
