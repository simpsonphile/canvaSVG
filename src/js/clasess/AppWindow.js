import { DE, G } from '../utility'

export class AppWindow {
  constructor (app) {
    this.app = app
    this.ctx = DE.canvas.getContext('2d')
  }

  resize () {
    const scaleOfHeight = DE.canvasWindow.offsetHeight / G.svg.height
    const scaleOfWidth = DE.canvasWindow.offsetWidth / G.svg.width

    if (scaleOfHeight > scaleOfWidth) {
      G.scale = scaleOfWidth
    } else {
      G.scale = scaleOfHeight
    }

    G.scale *= 0.95

    DE.canvas.height = G.scale * G.svg.height
    DE.canvas.width = G.scale * G.svg.width

    this.app.rescale()
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

    const x = Math.floor(event.layerX / G.scale)
    const y = Math.floor(event.layerY / G.scale)

    DE.cursorPosIndi.innerHTML = `(${x}, ${y})`
  }

  init () {
    //  Resize canvas events
    window.addEventListener('DOMContentLoaded', () => { this.resize() })
    window.addEventListener('resize', () => { this.resize() })
    window.addEventListener('orientationchange', () => { this.resize() })

    //  Mouse events
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

    //  Keyboard events
    document.addEventListener('keydown', event => {
      G.keyMapDown[event.keyCode] = true
    })

    document.addEventListener('keyup', event => {
      G.keyMapDown[event.keyCode] = false
    })

    document.addEventListener('keypress', event => {
      if (event.key === 'q' || event.keyCode === 81) {
        this.app.resetDrawingVars()
      } else if (event.key === 'c' || event.keyCode === 67) {
        this.app.layFigure()
      } else if (event.key === 'Space' || event.keyCode === 32) {
        this.app.layFigure(true)
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
      dot.draw(this.ctx, specialColor, G.scale)
    })

    this.app.sizeIndicators.forEach(size => {
      size.draw(this.ctx)
    })

    this.app.diameters.forEach(diameter => {
      diameter.draw(this.ctx)
    })
  }
}
