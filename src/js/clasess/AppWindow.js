export class AppWindow {
  constructor (app) {
    this.canvas = document.querySelector('.js-canvas')
    this.canvasContainer = document.querySelector('j.s-canvas-container')
    this.width = 20
    this.height = 20
    this.ctx = this.canvas.getContext('2d')

    this.app = app
  }

  resize () {
    const scaleOfHeight = window.innerHeight / this.height
    const scaleOfWidth = window.innerWidth / this.width

    if (scaleOfHeight > scaleOfWidth) {
      this.scale = scaleOfWidth
    } else {
      this.scale = scaleOfHeight
    }

    this.scale *= 0.95

    this.canvas.height = this.scale * this.height
    this.canvas.width = this.scale * this.width
  }

  returnPoint (event) {
    return {
      x: event.layerX,
      y: event.layerY
    }
  }

  init () {
    const self = this

    document.addEventListener('DOMContentLoaded', this.resize())
    document.addEventListener('resize', this.resize())
    document.addEventListener('orientationchange', this.resize())

    this.canvas.addEventListener('click', function (event) {
      self.app.computeClick(self.returnPoint(event))
    })

    this.canvas.addEventListener('mousemove', function (event) {
      self.app.computeMouseMove(self.returnPoint(event))
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
  }
}
