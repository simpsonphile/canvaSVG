import { Ellipse } from '../clasess/Ellipse'
import { Rectangle } from '../clasess/Rectangle'
import { Polyline } from '../clasess/Polyline'
import { Line } from '../clasess/Line'
import { Curve } from './Curve'
import { SCurve } from './SCurve'
import { HelperDot } from './HelperDot'
import { SizeIndicator } from './SizeIndicator'

import { DE, vectorLength, G } from '../utility'

export class AppLogic {
  constructor () {
    this.init()
  }

  init () {
    this.resetDrawingVars()

    G.figures = []
    G.figuresHistory = []
  }

  resetDrawingVars () {
    G.step = 0
    G.clicks = []
    G.shadowFig = {}
    G.drawShadow = false
    G.helperDots = []
    G.sizeIndicators = []
    G.diameters = []
  }

  reset () {
    this.resetDrawingVars()
    G.figures = []
    G.figuresHistory = []
  }

  computeClick (click) {
    G.clicks.push(click)
    G.step ++

    if (G.mode === 'arc') this.computeArc()
    if (G.mode === 'rec') this.computeRec()
    if (G.mode === 'poly') this.computePoly()
    if (G.mode === 'line') this.computeLine()
    if (G.mode === 'curve') this.computeCurve()
    if (G.mode === 'scurve') this.computeSCurve()

    this.manageHistoryBtns()
  }

  computeMouseMove (curPos) {
    if (G.mode === 'arc') this.symulateArc(curPos)
    if (G.mode === 'rec') this.symulateRec(curPos)
    if (G.mode === 'poly') this.symulatePoly(curPos)
    if (G.mode === 'line') this.symulateLine(curPos)
    if (G.mode === 'curve') this.symulateCurve(curPos)
    if (G.mode === 'scurve') this.symulateSCurve(curPos)
  }

  layFigure (close = false) {
    if (G.mode === 'poly') this.computePoly(true, close)
    if (G.mode === 'scurve') this.computeSCurve(true)
  }

  changeMode (nMode) {
    this.resetDrawingVars()
    G.mode = nMode
  }

  toggleFillMode () {
    G.fillMode = !G.fillMode
  }

  prepWheel (colorFor, wheel) {
    G.colorFor = colorFor
    if (colorFor === 'fill') {
      wheel.hex = G.fc
    } else if (colorFor === 'stroke') {
      wheel.hex = G.sc
    }
  }

  changeColor (color) {
    if (G.colorFor === 'fill') {
      G.fc = color
    } else if (G.colorFor === 'stroke') {
      G.sc = color
    }
  }

  changeHistory (action) {
    if (action === 'undo' && G.figures.length > 0) {
      G.figuresHistory.push(G.figures.pop())
    } else if (action === 'redo' && G.figuresHistory.length > 0) {
      G.figures.push(G.figuresHistory.pop())
    }

    this.manageHistoryBtns()
  }

  manageHistoryBtns () {
    if (G.figuresHistory.length === 0) {
      DE.historyRedoBtn.classList.add('is-disabled')
    } else {
      DE.historyRedoBtn.classList.remove('is-disabled')
    }

    if (G.figures.length === 0) {
      DE.historyUndoBtn.classList.add('is-disabled')
    } else {
      DE.historyUndoBtn.classList.remove('is-disabled')
    }
  }

  rescale () {
    G.figures.forEach(fig => {
      fig.rescale(G.scale)
    })
  }

  updateDimensions (type, size) {
    if (type === 'width') {
      G.svg.width = size
    } else if (type === 'height') {
      G.svg.height = size
    }
  }

  generateSvg () {
    let svgHTML = `<svg viewBox="0 0 ${G.svg.width} ${G.svg.height}">`

    G.figures.forEach(fig => {
      svgHTML += fig.returnHTML()
    })

    svgHTML += '\n</svg>'

    DE.svgCode.innerHTML = svgHTML
  }

  /* SCurve functions */

  computeSCurve (stop) {
    if (G.step === 1 || G.step % 2 === 0) {
      G.helperDots.push(new HelperDot(G.clicks[G.step - 1].x, G.clicks[G.step - 1].y))
    }

    if (stop && G.step > 2) {
      G.figures.push(new SCurve(G.clicks, G.sw, G.sc, G.scale))

      this.resetDrawingVars()
    }
  }

  symulateSCurve (curPos) {
    if (G.step >= 2) {
      G.drawShadow = true
      const points = [...G.clicks, curPos]
      G.shadowFig = new SCurve(points, G.sw, G.sc, G.scale)
    }
  }

  /* Curve functions */
  computeCurve () {
    if (G.step === 1) {
      G.helperDots.push(new HelperDot(G.clicks[G.step - 1].x, G.clicks[G.step - 1].y))
    }

    if (G.step <= 2) {
      G.helperDots.push(new HelperDot(G.clicks[G.step - 1].x, G.clicks[G.step - 1].y))
    }

    if (G.step === 3) {
      G.figures.push(new Curve(G.clicks[0].x, G.clicks[0].y, G.clicks[1].x, G.clicks[1].y, G.clicks[2].x, G.clicks[2].y, G.sw, G.sc, G.scale))

      this.resetDrawingVars()
    }
  }

  symulateCurve (curPos) {
    if (G.step === 2) {
      G.drawShadow = true
      G.shadowFig = new Curve(G.clicks[0].x, G.clicks[0].y, G.clicks[1].x, G.clicks[1].y, curPos.x, curPos.y, G.sw, G.sc, G.scale)
    }
  }

  /* line functions */
  computeLine () {
    if (G.step === 1) {
      G.helperDots.push(new HelperDot(G.clicks[G.step - 1].x, G.clicks[G.step - 1].y))
    }

    if (G.step === 2) {
      G.figures.push(new Line(G.clicks[0].x, G.clicks[0].y, G.clicks[1].x, G.clicks[1].y, G.sw, G.sc, G.scale))

      this.resetDrawingVars()
    }
  }

  symulateLine (curPos) {
    if (G.step === 1) {
      G.drawShadow = true
      G.shadowFig = new Line(G.clicks[0].x, G.clicks[0].y, curPos.x, curPos.y, G.sw, G.sc, G.scale)
    }
  }

  /* poly functions */
  computePoly (stop, close) {
    if (stop && G.step > 1) {
      if (close) G.clicks.push(G.clicks[0])

      G.figures.push(new Polyline(G.clicks, G.sw, G.sc, G.scale))

      this.resetDrawingVars()
    }
  }

  symulatePoly (curPos) {
    if (G.step > 0) {
      G.drawShadow = true
      const points = [...G.clicks, curPos]
      G.helperDots.push(new HelperDot(G.clicks[G.step - 1].x, G.clicks[G.step - 1].y))
      G.shadowFig = new Polyline(points, G.sw, G.sc)
    }
  }

  /* arc functions */

  computeArc () {
    if (G.step === 1) {
      G.helperDots.push(new HelperDot(G.clicks[G.step - 1].x, G.clicks[G.step - 1].y))
    }

    if (G.step === 2) {
      const rx = vectorLength(
        G.clicks[0].x,
        0,
        G.clicks[1].x,
        0
      )

      const ry = vectorLength(
        0,
        G.clicks[0].y,
        0,
        G.clicks[1].y
      )

      if (G.keyMapDown[16]) {
        G.figures.push(new Ellipse(G.clicks[0].x, G.clicks[0].y, rx, rx, G.sw, G.sc, G.fc, G.scale, G.fillMode))
      } else {
        G.figures.push(new Ellipse(G.clicks[0].x, G.clicks[0].y, rx, ry, G.sw, G.sc, G.fc, G.scale, G.fillMode))
      }

      this.resetDrawingVars()
    }
  }

  symulateArc (curPos) {
    if (G.step === 1) {
      G.drawShadow = true

      const rx = vectorLength(
        G.clicks[0].x,
        0,
        curPos.x,
        0
      )

      const ry = vectorLength(
        0,
        G.clicks[0].y,
        0,
        curPos.y
      )

      G.sizeIndicators[0] = new SizeIndicator(G.clicks[0].x + parseInt(rx / 2), G.clicks[0].y - 5, parseInt(rx / 2), 'orange')
      G.diameters[0] = new Line(G.clicks[0].x, G.clicks[0].y, curPos.x, G.clicks[0].y, 2, 'orange')

      if (G.keyMapDown[16]) {
        delete G.sizeIndicators[1]
        delete G.diameters[1]
      } else {
        G.sizeIndicators[1] = new SizeIndicator(G.clicks[0].x + 5, G.clicks[0].y + parseInt(ry / 2), parseInt(ry / 2), 'orangered')
        G.diameters[1] = new Line(G.clicks[0].x, G.clicks[0].y, G.clicks[0].x, curPos.y, 2, 'orangered')
      }

      if (G.keyMapDown[16]) {
        G.shadowFig = new Ellipse(G.clicks[0].x, G.clicks[0].y, rx, rx, G.sw, G.sc, G.fc, G.scale, G.fillMode)
      } else {
        G.shadowFig = new Ellipse(G.clicks[0].x, G.clicks[0].y, rx, ry, G.sw, G.sc, G.fc, G.scale, G.fillMode)
      }
    }
  }

  /* rec functions */
  computeRec () {
    if (G.step === 1) {
      G.helperDots.push(new HelperDot(G.clicks[G.step - 1].x, G.clicks[G.step - 1].y))
    }

    if (G.step === 2) {
      const w = vectorLength(
        G.clicks[0].x,
        0,
        G.clicks[1].x,
        0
      )

      const h = vectorLength(
        0,
        G.clicks[0].y,
        0,
        G.clicks[1].y
      )
      if (G.keyMapDown[16]) {
        G.figures.push(new Rectangle(G.clicks[0].x, G.clicks[0].y, w, w, G.sw, G.sc, G.fc, G.scale, G.fillMode))
      } else {
        G.figures.push(new Rectangle(G.clicks[0].x, G.clicks[0].y, w, h, G.sw, G.sc, G.fc, G.scale, G.fillMode))
      }

      this.resetDrawingVars()
    }
  }

  symulateRec (curPos) {
    if (G.step === 1) {
      G.drawShadow = true
      const w = vectorLength(
        G.clicks[0].x,
        0,
        curPos.x,
        0
      )

      const h = vectorLength(
        0,
        G.clicks[0].y,
        0,
        curPos.y
      )

      G.sizeIndicators[0] = new SizeIndicator(G.clicks[0].x + parseInt(w / 2), G.clicks[0].y - 5, w, 'orange')

      if (G.keyMapDown[16]) {
        delete G.sizeIndicators[1]
      } else {
        G.sizeIndicators[1] = new SizeIndicator(G.clicks[0].x + 5, G.clicks[0].y + parseInt(h / 2), h, 'orangered')
      }

      if (G.keyMapDown[16]) {
        G.shadowFig = new Rectangle(G.clicks[0].x, G.clicks[0].y, w, w, G.sw, G.sc, G.fc, G.scale, G.fillMode)
      } else {
        G.shadowFig = new Rectangle(G.clicks[0].x, G.clicks[0].y, w, h, G.sw, G.sc, G.fc, G.scale, G.fillMode)
      }
    }
  }
}
