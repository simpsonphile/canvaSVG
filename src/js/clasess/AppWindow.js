export class AppWindow {
  constructor (app) {
    this.app = app

    this.canvas = document.querySelector('.js-canvas')
    this.canvasContainer = document.querySelector('j.s-canvas-container')
    this.ctx = this.canvas.getContext('2d')
  }

  resize () {
    const scaleOfHeight = window.innerHeight / this.app.svg.height
    const scaleOfWidth = window.innerWidth / this.app.svg.width

    if (scaleOfHeight > scaleOfWidth) {
      this.scale = scaleOfWidth
    } else {
      this.scale = scaleOfHeight
    }

    this.scale *= 0.95

    this.canvas.height = this.scale * this.app.svg.height
    this.canvas.width = this.scale * this.app.svg.width

    this.app.scale = this.scale
    this.app.rescale()
  }

  returnScale () {
    return this.scale
  }

  returnPoint (event) {
    return {
      x: event.layerX,
      y: event.layerY
    }
  }

  init () {
    const self = this

    window.addEventListener('DOMContentLoaded', function () {
      self.resize()
    })
    window.addEventListener('resize', function () {
      self.resize()
    })
    window.addEventListener('orientationchange', function () {
      self.resize()
    })

    this.canvas.addEventListener('click', function (event) {
      self.app.computeClick(self.returnPoint(event))
    })

    this.canvas.addEventListener('mousemove', function (event) {
      self.app.computeMouseMove(self.returnPoint(event))
    })

    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 32) {
        self.app.computeSpace()
      }
    })
  }

  draw () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.app.figures.forEach(fig => {
      fig.draw(this.ctx)
    })

    if (this.app.drawShadow) {
      this.app.shadowFig.draw(this.ctx)
    }

    this.app.helperDots.forEach(dot => {
      dot.draw(this.ctx)
    })
  }
}
