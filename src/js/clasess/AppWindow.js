import { DE } from '../utility'

export class AppWindow {
  constructor (app) {
    this.app = app

    // this.canvas = document.querySelector('.js-canvas')
    // this.canvasContainer = document.querySelector('js-canvas-container')
    this.ctx = DE.canvas.getContext('2d')

    // this.cursorPosIndi = document.querySelector('.js-cursor-pos')
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

    DE.canvas.height = this.scale * this.app.svg.height
    DE.canvas.width = this.scale * this.app.svg.width

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

  updateCursor (event) {
    DE.cursorPosIndi.style.display = `block`
    DE.cursorPosIndi.style.left = `${event.layerX}px`
    DE.cursorPosIndi.style.top = `${event.layerY}px`

    const x = Math.floor(event.layerX / this.scale)
    const y = Math.floor(event.layerY / this.scale)

    DE.cursorPosIndi.innerHTML = `(${x}, ${y})`
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

    DE.canvas.addEventListener('click', function (event) {
      self.app.computeClick(self.returnPoint(event))
    })

    DE.canvas.addEventListener('mousemove', function (event) {
      self.app.computeMouseMove(self.returnPoint(event))
      self.updateCursor(event)
    })

    DE.canvas.addEventListener('mouseout', function () {
      DE.cursorPosIndi.style.display = 'none'
    })

    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 32) {
        self.app.computeSpace()
      }
    })
  }

  draw () {
    this.ctx.clearRect(0, 0, DE.canvas.width, DE.canvas.height)

    this.app.figures.forEach(fig => {
      fig.draw(this.ctx)
    })

    if (this.app.drawShadow) {
      this.app.shadowFig.draw(this.ctx)
    }

    this.app.helperDots.forEach((dot, index) => {
      let specialColor = false
      if (index >= this.app.helperDots.length - 2) {
        specialColor = true
      }
      dot.draw(this.ctx, specialColor)
    })
  }
}
