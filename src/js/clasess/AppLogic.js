import { maths } from '../clasess/Math'
import { Circle } from '../clasess/Circle'
import { Rectangle } from '../clasess/Rectangle'
import { Polyline } from '../clasess/Polyline'
import { Line } from '../clasess/Line'

export class AppLogic {
  constructor () {
    this.init()
  }

  init () {
    this.sw = 5 //  strokeWidth
    this.sc = 'orange' //  strokeColor
    this.fc = 'green' //  fillColor

    this.mode = ''
    this.step = 0
    this.clicks = []
    this.curPos = undefined
    this.figData = {}

    this.drawShadow = false
    this.shadowFig = {}

    this.figures = []
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
    if (this.mode === 'arc') this.computeArc(click)
    if (this.mode === 'rec') this.computeRec(click)
    // if (this.mode === 'poly') this.computePoly(click)
    if (this.mode === 'line') this.computeLine(click)
  }

  computeMouseMove (curPos) {
    if (this.mode === 'arc') this.symulateArc(curPos)
    if (this.mode === 'rec') this.symulateRec(curPos)
    // if (this.mode === 'poly') this.symulatePoly(curPos)
    if (this.mode === 'line') this.symulateLine(curPos)
  }

  changeMode (nMode) {
    this.resetDrawingVars()
    this.mode = nMode
  }

  generateSvg () {
    let svgHTML = '<svg viewBox="0 0 1000 1000">'

    this.figures.forEach(fig => {
      svgHTML += fig.returnHTML()
    })

    svgHTML += '</svg>'

    console.log(svgHTML)
  }

  /* line functions */
  computeLine (click) {
    this.clicks.push(click)
    this.step ++

    if (this.step === 1) {
      this.figData.x1 = this.clicks[0].x
      this.figData.y1 = this.clicks[0].y

      this.drawShadow = true
      this.symulateLine(click)
    }

    if (this.step === 2) {
      this.figData.x2 = this.clicks[1].x
      this.figData.y2 = this.clicks[1].y

      this.figures.push(new Line(this.figData.x1, this.figData.y1, this.figData.x2, this.figData.y2, this.sw, this.sc, this.fc))

      this.resetDrawingVars()

      return true
    }
  }

  symulateLine (curPos) {
    if (this.step === 1) {
      this.shadowFig = new Line(this.figData.x1, this.figData.y1, curPos.x, curPos.y, this.sw, this.sc, this.fc)
    }
  }

  /* poly functions */

  computePoly (click) {
    this.clicks.push(click)
    this.step ++
  }

  symulatePoly (curPos) {
    if (this.step > 1) {
      let points = ''

      this.clicks.forEach(cor => {
        points += `${cor.x},${cor.y} `
      })

      points += `${curPos.x},${curPos.y}`

      this.shadowFig = new Polyline(points, this.sw, this.sc, this.fc)
    }
  }

  /* arc functions */

  computeArc (click) {
    this.clicks.push(click)
    this.step ++

    if (this.step === 1) {
      this.figData.cx = this.clicks[0].x
      this.figData.cy = this.clicks[0].y

      this.drawShadow = true
      this.symulateArc(click)
    }

    if (this.step === 2) {
      this.figData.r = maths.vectorLength(
        this.clicks[0].x,
        this.clicks[0].y,
        this.clicks[1].x,
        this.clicks[1].y
      )

      this.figures.push(new Circle(this.figData.cx, this.figData.cy, this.figData.r, this.sw, this.sc, this.fc))

      this.resetDrawingVars()

      return true
    }
  }

  symulateArc (curPos) {
    if (this.step === 1) {
      const r = maths.vectorLength(
        this.clicks[0].x,
        this.clicks[0].y,
        curPos.x,
        curPos.y
      )
      this.shadowFig = new Circle(this.clicks[0].x, this.clicks[0].y, r, this.sw, this.sc, this.fc)
    }
  }

  /* rec functions */

  computeRec (click) {
    this.clicks.push(click)
    this.step ++

    if (this.step === 1) {
      this.figData.x = this.clicks[0].x
      this.figData.y = this.clicks[0].y

      this.drawShadow = true
      this.symulateRec(click)
    }

    if (this.step === 2) {
      this.figData.w = maths.vectorLength(
        this.clicks[0].x,
        0,
        this.clicks[1].x,
        0
      )

      this.figData.h = maths.vectorLength(
        0,
        this.clicks[0].y,
        0,
        this.clicks[1].y
      )

      this.figures.push(new Rectangle(this.figData.x, this.figData.y, this.figData.w, this.figData.h, this.sw, this.sc, this.fc))

      this.resetDrawingVars()

      return true
    }
  }

  symulateRec (curPos) {
    if (this.step === 1) {
      this.w = maths.vectorLength(
        this.clicks[0].x,
        0,
        curPos.x,
        0
      )

      this.h = maths.vectorLength(
        0,
        this.clicks[0].y,
        0,
        curPos.y
      )

      this.shadowFig = new Rectangle(this.figData.x, this.figData.y, this.w, this.h, this.sw, this.sc, this.fc)
    }
  }
}
