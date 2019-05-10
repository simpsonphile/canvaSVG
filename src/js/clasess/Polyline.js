import { Figure } from './Figure'

export class Polyline extends Figure {
  constructor (points, sw, sc, scale) {
    super()
    this.points = points
    this.sw = parseInt(sw)
    this.sc = sc

    this.scale = scale
  }

  generatePoints () {
    let genPoints = ''

    this.points.forEach(cor => {
      genPoints += `${this.scaleForSvg(cor.x)},${this.scaleForSvg(cor.y)} `
    })

    return genPoints
  }

  generateFigureHTML () {
    return `<polyline points="${this.generatePoints(this.points)}"
                      stroke-width="${this.sw}"
                      stroke="${this.sc}"
                      fill="none">
            </polyline>`
  }

  drawFigure (ctx) {
    this.points.forEach((cor, index) => {
      if (index === 0) {
        ctx.moveTo(cor.x, cor.y)
      } else {
        ctx.lineTo(cor.x, cor.y)
        ctx.moveTo(cor.x, cor.y)
      }
    })
  }
}
