import { Ellipse } from '../clasess/Ellipse'
import { Rectangle } from '../clasess/Rectangle'
import { Polyline } from '../clasess/Polyline'
import { Line } from '../clasess/Line'
import { Curve } from './Curve'
import { SCurve } from './SCurve'
import { HelperDot } from './HelperDot'
import { SizeIndicator } from './SizeIndicator'
import { vectorLength, G, invertColor } from '../utility'

export class ComputeFigure {
  reset () {
    G.step = 0
    G.clicks = []
    G.shadowFig = {}
    G.drawShadow = false
    G.helperDots = []
    G.sizeIndicators = []
    G.diameters = []
  }

  /* SCurve functions */
  computeSCurve (stop) {
    if (G.step === 1 || G.step % 2 === 0) {
      G.helperDots.push(new HelperDot(G.clicks[G.step - 1].x, G.clicks[G.step - 1].y))
    }

    if (stop && G.step > 2) {
      G.figures.push(new SCurve(G.clicks, G.sw, G.sc, G.scale))

      this.reset()
    }
  }

  symulateSCurve (curPos) {
    if (G.step >= 2) {
      G.drawShadow = true
      const points = [...G.clicks, curPos]
      G.shadowFig = new SCurve(points, G.sw, G.sc, G.scale)
    }
  }

  /* Curve functions */
  computeCurve () {
    if (G.step === 1) {
      G.helperDots.push(new HelperDot(G.clicks[G.step - 1].x, G.clicks[G.step - 1].y))
    }

    if (G.step <= 2) {
      G.helperDots.push(new HelperDot(G.clicks[G.step - 1].x, G.clicks[G.step - 1].y))
    }

    if (G.step === 3) {
      G.figures.push(new Curve(G.clicks[0].x, G.clicks[0].y, G.clicks[1].x, G.clicks[1].y, G.clicks[2].x, G.clicks[2].y, G.sw, G.sc, G.scale))

      this.reset()
    }
  }

  symulateCurve (curPos) {
    if (G.step === 2) {
      G.drawShadow = true
      G.shadowFig = new Curve(G.clicks[0].x, G.clicks[0].y, G.clicks[1].x, G.clicks[1].y, curPos.x, curPos.y, G.sw, G.sc, G.scale)
    }
  }

  /* line functions */
  computeLine () {
    if (G.step === 1) {
      G.helperDots.push(new HelperDot(G.clicks[G.step - 1].x, G.clicks[G.step - 1].y))
    }

    if (G.step === 2) {
      G.figures.push(new Line(G.clicks[0].x, G.clicks[0].y, G.clicks[1].x, G.clicks[1].y, G.sw, G.sc, G.scale))

      this.reset()
    }
  }

  symulateLine (curPos) {
    if (G.step === 1) {
      G.drawShadow = true
      G.shadowFig = new Line(G.clicks[0].x, G.clicks[0].y, curPos.x, curPos.y, G.sw, G.sc, G.scale)
    }
  }

  /* poly functions */
  computePoly (stop, close) {
    if (stop && G.step > 1) {
      if (close) G.clicks.push(G.clicks[0])

      G.figures.push(new Polyline(G.clicks, G.sw, G.sc, G.scale))

      this.reset()
    }
  }

  symulatePoly (curPos) {
    if (G.step > 0) {
      G.drawShadow = true
      const points = [...G.clicks, curPos]
      G.helperDots.push(new HelperDot(G.clicks[G.step - 1].x, G.clicks[G.step - 1].y))
      G.shadowFig = new Polyline(points, G.sw, G.sc)
    }
  }

  /* arc functions */
  computeArc () {
    if (G.step === 1) {
      G.helperDots.push(new HelperDot(G.clicks[G.step - 1].x, G.clicks[G.step - 1].y))
    }

    if (G.step === 2) {
      const rx = vectorLength(
        G.clicks[0].x,
        0,
        G.clicks[1].x,
        0
      )

      const ry = vectorLength(
        0,
        G.clicks[0].y,
        0,
        G.clicks[1].y
      )

      if (G.keyMapDown[16]) {
        G.figures.push(new Ellipse(G.clicks[0].x, G.clicks[0].y, rx, rx, G.sw, G.sc, G.fc, G.scale, G.fillMode))
      } else {
        G.figures.push(new Ellipse(G.clicks[0].x, G.clicks[0].y, rx, ry, G.sw, G.sc, G.fc, G.scale, G.fillMode))
      }

      this.reset()
    }
  }

  symulateArc (curPos) {
    if (G.step === 1) {
      G.drawShadow = true

      const rx = vectorLength(
        G.clicks[0].x,
        0,
        curPos.x,
        0
      )

      const ry = vectorLength(
        0,
        G.clicks[0].y,
        0,
        curPos.y
      )

      G.sizeIndicators[0] = new SizeIndicator(G.clicks[0].x + parseInt(rx / 2), G.clicks[0].y - 5, Math.floor(rx / 2 / G.scale), invertColor(G.fc))
      G.diameters[0] = new Line(G.clicks[0].x, G.clicks[0].y, curPos.x, G.clicks[0].y, 2, invertColor(G.fc))

      if (G.keyMapDown[16]) {
        delete G.sizeIndicators[1]
        delete G.diameters[1]
      } else {
        G.sizeIndicators[1] = new SizeIndicator(G.clicks[0].x + 5, G.clicks[0].y + parseInt(ry / 2), Math.floor(ry / 2 / G.scale), invertColor(G.fc))
        G.diameters[1] = new Line(G.clicks[0].x, G.clicks[0].y, G.clicks[0].x, curPos.y, 2, invertColor(G.fc))
      }

      if (G.keyMapDown[16]) {
        G.shadowFig = new Ellipse(G.clicks[0].x, G.clicks[0].y, rx, rx, G.sw, G.sc, G.fc, G.scale, G.fillMode)
      } else {
        G.shadowFig = new Ellipse(G.clicks[0].x, G.clicks[0].y, rx, ry, G.sw, G.sc, G.fc, G.scale, G.fillMode)
      }
    }
  }

  /* rec functions */
  computeRec () {
    if (G.step === 1) {
      G.helperDots.push(new HelperDot(G.clicks[G.step - 1].x, G.clicks[G.step - 1].y))
    }

    if (G.step === 2) {
      const w = vectorLength(
        G.clicks[0].x,
        0,
        G.clicks[1].x,
        0
      )

      const h = vectorLength(
        0,
        G.clicks[0].y,
        0,
        G.clicks[1].y
      )
      if (G.keyMapDown[16]) {
        G.figures.push(new Rectangle(G.clicks[0].x, G.clicks[0].y, w, w, G.sw, G.sc, G.fc, G.scale, G.fillMode))
      } else {
        G.figures.push(new Rectangle(G.clicks[0].x, G.clicks[0].y, w, h, G.sw, G.sc, G.fc, G.scale, G.fillMode))
      }

      this.reset()
    }
  }

  symulateRec (curPos) {
    if (G.step === 1) {
      G.drawShadow = true
      const w = vectorLength(
        G.clicks[0].x,
        0,
        curPos.x,
        0
      )

      const h = vectorLength(
        0,
        G.clicks[0].y,
        0,
        curPos.y
      )

      G.sizeIndicators[0] = new SizeIndicator(G.clicks[0].x + parseInt(w / 2), G.clicks[0].y - 5, Math.floor(w / G.scale), 'orange')

      if (G.keyMapDown[16]) {
        delete G.sizeIndicators[1]
      } else {
        G.sizeIndicators[1] = new SizeIndicator(G.clicks[0].x + 5, G.clicks[0].y + parseInt(h / 2), Math.floor(h / G.scale), 'orangered')
      }

      if (G.keyMapDown[16]) {
        G.shadowFig = new Rectangle(G.clicks[0].x, G.clicks[0].y, w, w, G.sw, G.sc, G.fc, G.scale, G.fillMode)
      } else {
        G.shadowFig = new Rectangle(G.clicks[0].x, G.clicks[0].y, w, h, G.sw, G.sc, G.fc, G.scale, G.fillMode)
      }
    }
  }
}
