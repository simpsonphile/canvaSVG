export class Toolkit {
  constructor (app) {
    this.app = app

    this.figBtns = document.querySelectorAll('.js-fig')

    this.svgBtn = document.querySelector('.js-generate-svg')

    this.resetCanvasBtn = document.querySelector('.js-reset-canvas')
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

    this.resetCanvasBtn.addEventListener('click', event => {
      this.app.init()
    })
  }
}
