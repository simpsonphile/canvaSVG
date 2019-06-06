import { DE, DATA, isTouchDevice } from '../utility'

export class AppWindow {
  constructor (app) {
    this.app = app
    this.ctx = DE.canvas.getContext('2d')
  }

  resize () {
    const scaleOfHeight = DE.canvasWindow.offsetHeight / DATA.svg.height
    const scaleOfWidth = DE.canvasWindow.offsetWidth / DATA.svg.width

    if (scaleOfHeight > scaleOfWidth) {
      DATA.scale = scaleOfWidth
    } else {
      DATA.scale = scaleOfHeight
    }

    DATA.scale *= 0.95

    DE.canvas.height = DATA.scale * DATA.svg.height
    DE.canvas.width = DATA.scale * DATA.svg.width

    this.app.rescale()
  }

  returnPoint (event) {
    return {
      x: event.layerX,
      y: event.layerY
    }
  }

  returnTouchPoint (event) {
    return {
      x: event.changedTouches[0].clientX - DE.canvas.getBoundingClientRect().x,
      y: event.changedTouches[0].clientY - DE.canvas.getBoundingClientRect().y
    }
  }

  updateCursor (event) {
    DE.cursorPosIndi.style.display = `block`
    DE.cursorPosIndi.style.left = `${event.layerX}px`
    DE.cursorPosIndi.style.top = `${event.layerY}px`

    const x = Math.floor(event.layerX / DATA.scale)
    const y = Math.floor(event.layerY / DATA.scale)

    DE.cursorPosIndi.innerHTML = `(${x}, ${y})`
  }

  init () {
    //  Resize canvas events
    window.addEventListener('DOMContentLoaded', () => { this.resize() })
    window.addEventListener('resize', () => { this.resize() })
    window.addEventListener('orientationchange', () => { this.resize() })

    //  Mouse events
    DE.canvas.addEventListener('click', event => {
      if (!isTouchDevice()) {
        this.app.computeClick(this.returnPoint(event))
      }
    })

    DE.canvas.addEventListener('mousemove', event => {
      if (!isTouchDevice()) {
        this.app.computeMouseMove(this.returnPoint(event))
        this.updateCursor(event)
      }
    })

    DE.canvas.addEventListener('mouseout', () => {
      if (!isTouchDevice()) {
        DE.cursorPosIndi.style.display = 'none'
      }
    })

    //  Touch events
    DE.canvas.addEventListener('touchstart', event => {
      this.app.computeClick(this.returnTouchPoint(event))
    })

    DE.canvas.addEventListener('touchend', event => {
      this.app.computeTouchEnd(this.returnTouchPoint(event))
    })

    DE.canvas.addEventListener('touchmove', event => {
      this.app.computeTouchMove(this.returnTouchPoint(event))
    })

    //  Keyboard events
    document.addEventListener('keydown', event => {
      DATA.keyMapDown[event.keyCode] = true
    })

    document.addEventListener('keyup', event => {
      DATA.keyMapDown[event.keyCode] = false
    })

    document.addEventListener('keypress', event => {
      if (event.key === 'q' || event.keyCode === 81) {
        this.app.compute.reset()
      } else if (event.key === 'c' || event.keyCode === 67) {
        this.app.layFigure()
      } else if (event.key === 'Space' || event.keyCode === 32) {
        this.app.layFigure(true)
      }
    })
  }

  draw () {
    this.ctx.clearRect(0, 0, DE.canvas.width, DE.canvas.height)

    DATA.figures.forEach(fig => {
      fig.draw(this.ctx)
    })

    if (DATA.drawShadow) {
      DATA.shadowFig.draw(this.ctx)
    }

    DATA.helperDots.forEach((dot, index) => {
      let specialColor = false
      if (index >= DATA.helperDots.length - 2) {
        specialColor = true
      }
      dot.draw(this.ctx, specialColor, DATA.scale)
    })

    DATA.sizeIndicators.forEach(size => {
      size.draw(this.ctx)
    })

    DATA.diameters.forEach(diameter => {
      diameter.draw(this.ctx)
    })
  }
}
