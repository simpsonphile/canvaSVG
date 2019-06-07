import { Figure } from './Figure'

export class SCurve extends Figure {
  constructor (points, strokeWidth, strokeColor, scale, name) {
    super()
    this.points = points
    this.strokeWidth = strokeWidth
    this.strokeColor = strokeColor
    this.fc = 'transparent'
    this.scale = scale
    this.name = name
  }

  rescale (nScale) {
    const toScale = nScale / this.scale
    this.scale = nScale

    this.points = this.points.map(cor => {
      return {x: cor.x * toScale, y: cor.y * toScale}
    })
  }

  generateFigureHTML () {
    let d = ''

    const pts = this.points.map(pt => {
      return {
        x: this.scaleForSvg(pt.x),
        y: this.scaleForSvg(pt.y)
      }
    })

    pts.forEach((pt, index) => {
      if (index % 2 === 0 && index !== 0) {
        d += `M${pts[index - 2].x} ${pts[index - 2].y}`
        d += `Q${pts[index].x} ${pts[index].y} ${pts[index - 1].x} ${pts[index - 1].y}`
        pts.splice(index, 1, pts[index - 1])
      }
    })

    return `<path d="${(d)}"
                  stroke-width="${this.strokeWidth}"
                  stroke="${this.strokeColor}"
                  fill="none">
            </path>`
  }

  drawFigure (ctx) {
    const pts = this.points.map(pt => {
      return {
        x: parseInt(pt.x),
        y: parseInt(pt.y)
      }
    })

    pts.forEach((pt, index) => {
      if (index === 0) {
        ctx.moveTo(pt.x, pt.y)
      } else if (index % 2 === 0) {
        ctx.bezierCurveTo(pts[index - 2].x, pts[index - 2].y, pt.x, pt.y, pts[index - 1].x, pts[index - 1].y)
        pts.splice(index, 1, pts[index - 1])
      }
    })
  }
}
