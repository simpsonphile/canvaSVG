import { Figure } from './Figure'

export class Polyline extends Figure {
  constructor (points, strokeWidth, strokeColor, scale) {
    super()
    this.points = points
    this.strokeWidth = parseInt(strokeWidth)
    this.strokeColor = strokeColor

    this.scale = scale
  }

  rescale (nScale) {
    const toScale = nScale / this.scale
    this.scale = nScale

    this.points = this.points.map(cor => {
      return {x: cor.x * toScale, y: cor.y * toScale}
    })
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
                      stroke-width="${this.strokeWidth}"
                      stroke="${this.sc}"
                      fill="none">
            </polyline>`
  }

  drawFigure (ctx) {
    this.points.forEach((cor, index) => {
      if (index === 0) {
        ctx.moveTo(parseInt(cor.x), parseInt(cor.y))
      } else {
        ctx.lineTo(parseInt(cor.x), parseInt(cor.y))
        ctx.moveTo(parseInt(cor.x), parseInt(cor.y))
      }
    })
  }
}
