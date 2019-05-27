import { DE } from '../utility'

export class Toolkit {
  constructor (app, colorWheel, appWindow) {
    this.appWindow = appWindow
    this.app = app
    this.wheel = colorWheel
  }

  resetFigBtns () {
    DE.figBtns.forEach(btn => {
      btn.classList.remove('is-active')
    })
  }

  init () {
    DE.figBtns.forEach(btn => {
      btn.addEventListener('click', event => {
        this.resetFigBtns()
        btn.classList.add('is-active')
        this.app.changeMode(btn.dataset.fig)
      })
    })

    DE.svgBtn.addEventListener('click', event => {
      this.app.generateSvg()
    })

    DE.copyBtn.addEventListener('click', event => {
      DE.svgCode.select()
      document.execCommand('copy')
    })

    DE.resetCanvasBtn.addEventListener('click', event => {
      this.app.reset()
    })

    DE.colorBtns.forEach(btn => {
      btn.addEventListener('click', event => {
        this.app.prepWheel(btn.dataset.colorFor, this.wheel.wheel)
      })
    })

    DE.canvasSizeInputs.forEach(input => {
      input.addEventListener('change', event => {
        this.app.updateDimensions(input.dataset.canvasSize, input.value)
        this.appWindow.resize()
      })
    })

    DE.strokeWidthInput.addEventListener('change', event => {
      this.app.updateStrokeWidth(event.target.value)
    })

    DE.historyUndoBtn.addEventListener('click', event => {
      this.app.changeHistory('undo')
    })

    DE.historyRedoBtn.addEventListener('click', event => {
      this.app.changeHistory('redo')
    })

    DE.toggleFillMode.forEach(btn => {
      btn.addEventListener('click', event => {
        this.app.toggleFillMode()
      })
    })
  }
}
