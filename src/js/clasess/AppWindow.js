import { DE } from '../utility'

export class AppWindow {
  constructor (app) {
    this.app = app
    this.ctx = DE.canvas.getContext('2d')
  }

  resize () {
    const scaleOfHeight = DE.canvasWindow.offsetHeight / this.app.svg.height
    const scaleOfWidth = DE.canvasWindow.offsetWidth / this.app.svg.width

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
    window.addEventListener('DOMContentLoaded', () => {
      this.resize()
    })
    window.addEventListener('resize', () => {
      this.resize()
    })
    window.addEventListener('orientationchange', () => {
      this.resize()
    })

    DE.canvas.addEventListener('click', event => {
      this.app.computeClick(this.returnPoint(event))
    })

    DE.canvas.addEventListener('mousemove', event => {
      this.app.computeMouseMove(this.returnPoint(event))
      this.updateCursor(event)
    })

    DE.canvas.addEventListener('mouseout', () => {
      DE.cursorPosIndi.style.display = 'none'
    })

    document.addEventListener('keypress', event => {
      if (event.key === 'q' || event.keyCode === 81) { // q
        this.app.resetDrawingVars()
      } else if (event.key === 'c' || event.keyCode === 67) { // c
        this.app.layFigure()
      } else if (event.key === 'Space' || event.keyCode === 32) { //  Space
        this.app.layFigure(true)
      }
    })

    document.addEventListener('keydown', event => {
      this.app.keyMapDown[event.keyCode] = true
    })

    document.addEventListener('keyup', event => {
      this.app.keyMapDown[event.keyCode] = false
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
      dot.draw(this.ctx, specialColor, this.scale)
    })

    this.app.sizeIndicators.forEach(size => {
      size.draw(this.ctx)
    })

    this.app.diameters.forEach(diameter => {
      diameter.draw(this.ctx)
    })
  }
}
