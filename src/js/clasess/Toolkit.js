export class Toolkit {
  constructor (app, colorWheel, appWindow) {
    this.appWindow = appWindow
    this.app = app
    this.wheel = colorWheel

    this.figBtns = document.querySelectorAll('.js-fig')
    this.svgBtn = document.querySelector('.js-generate-svg')
    this.copyBtn = document.querySelector('.js-copy')
    this.resetCanvasBtn = document.querySelector('.js-reset-canvas')
    this.colorBtns = document.querySelectorAll('.js-color-for')

    this.canvasSizeInputs = document.querySelectorAll('.js-canvas-size')
  }

  resetFigBtns () {
    this.figBtns.forEach(btn => {
      btn.classList.remove('is-active')
    })
  }

  init () {
    this.figBtns.forEach(btn => {
      btn.addEventListener('click', event => {
        this.resetFigBtns()
        btn.classList.add('is-active')
        this.app.changeMode(btn.dataset.fig)
      })
    })

    this.svgBtn.addEventListener('click', event => {
      this.app.generateSvg()
    })

    this.copyBtn.addEventListener('click', event => {
      document.querySelector('.js-generated-svg-code').select()
      document.execCommand('copy')
    })

    this.resetCanvasBtn.addEventListener('click', event => {
      this.app.reset()
    })

    this.colorBtns.forEach(btn => {
      btn.addEventListener('click', event => {
        this.app.prepWheel(btn.dataset.colorFor, this.wheel.wheel)
      })
    })

    this.canvasSizeInputs.forEach(input => {
      input.addEventListener('change', event => {
        this.app.updateDimensions(input.dataset.canvasSize, input.value)
        this.appWindow.resize()
      })
    })
  }
}
