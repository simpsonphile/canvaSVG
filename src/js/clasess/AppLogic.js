import { maths } from '../clasess/Math'
import { Circle } from '../clasess/Circle'
import { Rectangle } from '../clasess/Rectangle'
import { Polyline } from '../clasess/Polyline'
import { Line } from '../clasess/Line'
import { Curve } from './Curve'

export class AppLogic {
  constructor () {
    this.init()
  }

  init () {
    this.sw = 5 //  strokeWidth
    this.colorFor = undefined
    this.sc = '#ff0000' //  strokeColor
    this.fc = '#00ff00' //  fillColor
    this.bg = '#ffffff' //  svg background
    this.mode = ''
    this.step = 0
    this.clicks = []
    this.curPos = undefined

    this.drawShadow = false
    this.shadowFig = {}

    this.figures = []

    this.svg = {
      width: 100,
      height: 100
    }

    this.scale = undefined
  }

  resetDrawingVars () {
    this.step = 0
    this.clicks = []
    this.curPos = undefined
    this.figData = {}
    this.shadowFig = {}
    this.drawShadow = false
  }

  computeClick (click) {
    this.clicks.push(click)
    this.step ++

    if (this.mode === 'arc') this.computeArc()
    if (this.mode === 'rec') this.computeRec()
    if (this.mode === 'poly') this.computePoly()
    if (this.mode === 'line') this.computeLine()
    if (this.mode === 'curve') this.computeCurve()
  }

  computeMouseMove (curPos) {
    if (this.mode === 'arc') this.symulateArc(curPos)
    if (this.mode === 'rec') this.symulateRec(curPos)
    if (this.mode === 'poly') this.symulatePoly(curPos)
    if (this.mode === 'line') this.symulateLine(curPos)
    if (this.mode === 'curve') this.symulateCurve(curPos)
  }

  computeSpace () {
    if (this.mode === 'poly') this.computePoly(true)
  }

  changeMode (nMode) {
    this.resetDrawingVars()
    this.mode = nMode
  }

  prepWheel (colorFor, wheel) {
    this.colorFor = colorFor
    if (colorFor === 'fill') {
      wheel.hex = this.fc
    } else if (colorFor === 'stroke') {
      wheel.hex = this.sc
    } else if (colorFor === 'bg') {
      wheel.hex = this.bg
    }
  }

  changeColor (color) {
    if (this.colorFor === 'fill') {
      this.fc = color
    } else if (this.colorFor === 'stroke') {
      this.sc = color
    } else if (this.colorFor === 'bg') {
      this.bg = color
    }
  }

  generateSvg () {
    let svgHTML = `<svg viewBox="0 0 ${this.svg.width} ${this.svg.height}"
                        style="background-color: ${this.bg}">`

    this.figures.forEach(fig => {
      svgHTML += fig.returnHTML()
    })

    svgHTML += '\n</svg>'

    document.querySelector('.js-generated-svg-code').innerHTML = svgHTML
  }

  /* Curve functions */
  computeCurve () {
    if (this.step === 1) {
      //  helper dot
    }

    if (this.step === 2) {
      //  helper dot
    }

    if (this.step === 3) {
      this.figures.push(new Curve(this.clicks[0].x, this.clicks[0].y, this.clicks[1].x, this.clicks[1].y, this.clicks[2].x, this.clicks[2].y, this.sw, this.sc, this.scale))
      this.resetDrawingVars()
    }
  }

  symulateCurve (curPos) {
    if (this.step === 2) {
      this.drawShadow = true
      this.shadowFig = new Curve(this.clicks[0].x, this.clicks[0].y, this.clicks[1].x, this.clicks[1].y, curPos.x, curPos.y, this.sw, this.sc, this.scale)
    }
  }

  /* line functions */
  computeLine () {
    if (this.step === 2) {
      this.figures.push(new Line(this.clicks[0].x, this.clicks[0].y, this.clicks[1].x, this.clicks[1].y, this.sw, this.sc, this.scale))
      this.resetDrawingVars()
    }
  }

  symulateLine (curPos) {
    if (this.step === 1) {
      this.drawShadow = true
      this.shadowFig = new Line(this.clicks[0].x, this.clicks[0].y, curPos.x, curPos.y, this.sw, this.sc, this.scale)
    }
  }

  /* poly functions */
  computePoly (stop) {
    if (stop && this.step > 1) {
      this.figures.push(new Polyline(this.clicks, this.sw, this.sc, this.scale))
      this.resetDrawingVars()
    }
  }

  symulatePoly (curPos) {
    if (this.step > 0) {
      this.drawShadow = true
      const points = [...this.clicks, curPos]
      this.shadowFig = new Polyline(points, this.sw, this.sc)
    }
  }

  /* arc functions */

  computeArc () {
    if (this.step === 2) {
      const r = maths.vectorLength(
        this.clicks[0].x,
        this.clicks[0].y,
        this.clicks[1].x,
        this.clicks[1].y
      )

      this.figures.push(new Circle(this.clicks[0].x, this.clicks[0].y, r, this.sw, this.sc, this.fc, this.scale))

      this.resetDrawingVars()
    }
  }

  symulateArc (curPos) {
    if (this.step === 1) {
      this.drawShadow = true
      const r = maths.vectorLength(
        this.clicks[0].x,
        this.clicks[0].y,
        curPos.x,
        curPos.y
      )
      this.shadowFig = new Circle(this.clicks[0].x, this.clicks[0].y, r, this.sw, this.sc, this.fc, this.scale)
    }
  }

  /* rec functions */
  computeRec () {
    if (this.step === 2) {
      const w = maths.vectorLength(
        this.clicks[0].x,
        0,
        this.clicks[1].x,
        0
      )

      const h = maths.vectorLength(
        0,
        this.clicks[0].y,
        0,
        this.clicks[1].y
      )

      this.figures.push(new Rectangle(this.clicks[0].x, this.clicks[0].y, w, h, this.sw, this.sc, this.fc, this.scale))

      this.resetDrawingVars()
    }
  }

  symulateRec (curPos) {
    if (this.step === 1) {
      this.drawShadow = true
      const w = maths.vectorLength(
        this.clicks[0].x,
        0,
        curPos.x,
        0
      )

      const h = maths.vectorLength(
        0,
        this.clicks[0].y,
        0,
        curPos.y
      )

      this.shadowFig = new Rectangle(this.clicks[0].x, this.clicks[0].y, w, h, this.sw, this.sc, this.fc, this.scale)
    }
  }
}
