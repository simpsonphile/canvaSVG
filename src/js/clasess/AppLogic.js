import { ComputeFigure } from './ComputeFigure'

import { DE, DATA } from '../utility'

export class AppLogic {
  constructor () {
    this.compute = new ComputeFigure()
    this.init()
  }

  init () {
    this.compute.reset()

    DATA.figures = []
    DATA.figuresHistory = []

    this.updateColorIndicators()
  }

  reset () {
    this.compute.reset()
    DATA.figures = []
    DATA.figuresHistory = []
  }

  computeClick (click) {
    DATA.clicks.push(click)
    DATA.step ++

    if (DATA.mode === 'arc') this.compute.computeArc()
    if (DATA.mode === 'rec') this.compute.computeRec()
    if (DATA.mode === 'poly') this.compute.computePoly()
    if (DATA.mode === 'line') this.compute.computeLine()
    if (DATA.mode === 'curve') this.compute.computeCurve()
    if (DATA.mode === 'scurve') this.compute.computeSCurve()

    this.manageHistoryBtns()
  }

  computeTouchEnd (click) {
    if (DATA.mode === 'arc' || DATA.mode === 'rec' || DATA.mode === 'line') {
      DATA.clicks.push(click)
      DATA.step ++
    }

    if (DATA.mode === 'arc') this.compute.computeArc()
    if (DATA.mode === 'rec') this.compute.computeRec()
    if (DATA.mode === 'line') this.compute.computeLine()

    if (DATA.mode === 'curve' && DATA.step >= 2) {
      DATA.clicks.push(click)
      DATA.step ++
      this.compute.computeCurve()
    }

    if (DATA.mode === 'scurve' && DATA.step % 2 === 0) {
      DATA.clicks.push(click)
      DATA.step ++
      this.compute.computeSCurve()
    }
  }

  computeMouseMove (curPos) {
    if (DATA.mode === 'arc') this.compute.symulateArc(curPos)
    if (DATA.mode === 'rec') this.compute.symulateRec(curPos)
    if (DATA.mode === 'poly') this.compute.symulatePoly(curPos)
    if (DATA.mode === 'line') this.compute.symulateLine(curPos)
    if (DATA.mode === 'curve') this.compute.symulateCurve(curPos)
    if (DATA.mode === 'scurve') this.compute.symulateSCurve(curPos)
  }

  computeTouchMove (curPos) {
    if (DATA.mode === 'arc') this.compute.symulateArc(curPos)
    if (DATA.mode === 'rec') this.compute.symulateRec(curPos)
    if (DATA.mode === 'line') this.compute.symulateLine(curPos)
    if (DATA.mode === 'curve') this.compute.symulateCurve(curPos)
    if (DATA.mode === 'scurve') this.compute.symulateSCurve(curPos)
  }

  layFigure (close = false) {
    if (DATA.mode === 'poly') this.compute.computePoly(true, close)
    if (DATA.mode === 'scurve') this.compute.computeSCurve(true)
  }

  changeMode (nMode) {
    this.compute.reset()
    DATA.mode = nMode
  }

  prepWheel (colorFor, wheel) {
    DATA.colorFor = colorFor
    if (colorFor === 'fill') {
      wheel.hex = DATA.fillColor
    } else if (colorFor === 'stroke') {
      wheel.hex = DATA.strokeColor
    }
  }

  updateColorIndicators () {
    DE.strokeColorIndicator.style.background = DATA.strokeColor
    DE.fillColorIndicator.style.background = DATA.fillColor
  }

  changeColor (color, colorFor) {
    if (colorFor === 'fill') {
      DATA.fillColor = color
    } else if (colorFor === 'stroke') {
      DATA.strokeColor = color
    }

    this.updateColorIndicators()
  }

  changeHistory (action) {
    if (action === 'undo' && DATA.figures.length > 0) {
      DATA.figuresHistory.push(DATA.figures.pop())
    } else if (action === 'redo' && DATA.figuresHistory.length > 0) {
      DATA.figures.push(DATA.figuresHistory.pop())
    }

    this.manageHistoryBtns()
  }

  manageHistoryBtns () {
    if (DATA.figuresHistory.length === 0) {
      DE.historyRedoBtn.classList.add('is-disabled')
    } else {
      DE.historyRedoBtn.classList.remove('is-disabled')
    }

    if (DATA.figures.length === 0) {
      DE.historyUndoBtn.classList.add('is-disabled')
    } else {
      DE.historyUndoBtn.classList.remove('is-disabled')
    }
  }

  rescale () {
    DATA.figures.forEach(fig => {
      fig.rescale(DATA.scale)
    })
  }

  updateDimensions (type, size) {
    if (type === 'width') {
      DATA.svg.width = size
    } else if (type === 'height') {
      DATA.svg.height = size
    }
  }

  updateStrokeWidth (size) {
    DATA.strokeWidth = size
  }

  generateSvg () {
    let svgHTML = `<svg viewBox="0 0 ${DATA.svg.width} ${DATA.svg.height}">`

    DATA.figures.forEach(fig => {
      svgHTML += fig.returnHTML()
    })

    svgHTML += '\n</svg>'

    DE.svgCode.innerHTML = svgHTML
  }
}
