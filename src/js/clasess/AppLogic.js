import { ComputeFigure } from './ComputeFigure'

import { DE, G } from '../utility'

export class AppLogic {
  constructor () {
    this.compute = new ComputeFigure()
    this.init()
  }

  init () {
    this.compute.reset()

    G.figures = []
    G.figuresHistory = []

    this.updateColorIndicators()
  }

  reset () {
    this.compute.reset()
    G.figures = []
    G.figuresHistory = []
  }

  computeClick (click) {
    G.clicks.push(click)
    G.step ++

    if (G.mode === 'arc') this.compute.computeArc()
    if (G.mode === 'rec') this.compute.computeRec()
    if (G.mode === 'poly') this.compute.computePoly()
    if (G.mode === 'line') this.compute.computeLine()
    if (G.mode === 'curve') this.compute.computeCurve()
    if (G.mode === 'scurve') this.compute.computeSCurve()

    this.manageHistoryBtns()
  }

  computeMouseMove (curPos) {
    if (G.mode === 'arc') this.compute.symulateArc(curPos)
    if (G.mode === 'rec') this.compute.symulateRec(curPos)
    if (G.mode === 'poly') this.compute.symulatePoly(curPos)
    if (G.mode === 'line') this.compute.symulateLine(curPos)
    if (G.mode === 'curve') this.compute.symulateCurve(curPos)
    if (G.mode === 'scurve') this.compute.symulateSCurve(curPos)
  }

  layFigure (close = false) {
    if (G.mode === 'poly') this.compute.computePoly(true, close)
    if (G.mode === 'scurve') this.compute.computeSCurve(true)
  }

  changeMode (nMode) {
    this.compute.reset()
    G.mode = nMode
  }

  prepWheel (colorFor, wheel) {
    G.colorFor = colorFor
    if (colorFor === 'fill') {
      wheel.hex = G.fc
    } else if (colorFor === 'stroke') {
      wheel.hex = G.sc
    }
  }

  updateColorIndicators () {
    DE.strokeColorIndicator.style.background = G.sc
    DE.fillColorIndicator.style.background = G.fc
  }

  changeColor (color, colorFor) {
    if (colorFor === 'fill') {
      G.fc = color
    } else if (colorFor === 'stroke') {
      G.sc = color
    }

    this.updateColorIndicators()
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

  updateStrokeWidth (size) {
    G.sw = size
  }

  generateSvg () {
    let svgHTML = `<svg viewBox="0 0 ${G.svg.width} ${G.svg.height}">`

    G.figures.forEach(fig => {
      svgHTML += fig.returnHTML()
    })

    svgHTML += '\n</svg>'

    DE.svgCode.innerHTML = svgHTML
  }
}
