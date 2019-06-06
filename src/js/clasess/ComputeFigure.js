import { Ellipse } from '../clasess/Ellipse'
import { Rectangle } from '../clasess/Rectangle'
import { Polyline } from '../clasess/Polyline'
import { Line } from '../clasess/Line'
import { Curve } from './Curve'
import { SCurve } from './SCurve'
import { HelperDot } from './HelperDot'
import { SizeIndicator } from './SizeIndicator'
import { vectorLength, DATA } from '../utility'

export class ComputeFigure {
  reset () {
    DATA.step = 0
    DATA.clicks = []
    DATA.shadowFig = {}
    DATA.drawShadow = false
    DATA.helperDots = []
    DATA.sizeIndicators = []
    DATA.diameters = []
  }

  /* SCurve functions */
  computeSCurve (stop) {
    if (DATA.step === 1 || DATA.step % 2 === 0) {
      DATA.helperDots.push(
        new HelperDot(
          DATA.clicks[DATA.step - 1].x,
          DATA.clicks[DATA.step - 1].y
        )
      )
    }

    if (stop && DATA.step > 2) {
      DATA.figures.push(
        new SCurve(
          DATA.clicks,
          DATA.strokeWidth,
          DATA.strokeColor,
          DATA.scale
        )
      )

      this.reset()
    }
  }

  symulateSCurve (curPos) {
    if (DATA.step >= 2) {
      DATA.drawShadow = true
      const points = [...DATA.clicks, curPos]
      DATA.shadowFig = new SCurve(
        points,
        DATA.strokeWidth,
        DATA.strokeColor,
        DATA.scale
      )
    }
  }

  /* Curve functions */
  computeCurve () {
    if (DATA.step === 1) {
      DATA.helperDots.push(
        new HelperDot(
          DATA.clicks[DATA.step - 1].x,
          DATA.clicks[DATA.step - 1].y
        )
      )
    }

    if (DATA.step <= 2) {
      DATA.helperDots.push(
        new HelperDot(
          DATA.clicks[DATA.step - 1].x,
          DATA.clicks[DATA.step - 1].y
        )
      )
    }

    if (DATA.step === 3) {
      DATA.figures.push(
        new Curve(
          DATA.clicks[0].x,
          DATA.clicks[0].y,
          DATA.clicks[1].x,
          DATA.clicks[1].y,
          DATA.clicks[2].x,
          DATA.clicks[2].y,
          DATA.strokeWidth,
          DATA.strokeColor,
          DATA.scale
        )
      )

      this.reset()
    }
  }

  symulateCurve (curPos) {
    if (DATA.step === 2) {
      DATA.drawShadow = true
      DATA.shadowFig = new Curve(
        DATA.clicks[0].x,
        DATA.clicks[0].y,
        DATA.clicks[1].x,
        DATA.clicks[1].y,
        curPos.x,
        curPos.y,
        DATA.strokeWidth,
        DATA.strokeColor,
        DATA.scale
      )
    }
  }

  /* line functions */
  computeLine () {
    if (DATA.step === 1) {
      DATA.helperDots.push(
        new HelperDot(
          DATA.clicks[DATA.step - 1].x,
          DATA.clicks[DATA.step - 1].y
        )
      )
    }

    if (DATA.step === 2) {
      DATA.figures.push(
        new Line(
          DATA.clicks[0].x,
          DATA.clicks[0].y,
          DATA.clicks[1].x,
          DATA.clicks[1].y,
          DATA.strokeWidth,
          DATA.strokeColor,
          DATA.scale
        )
      )

      this.reset()
    }
  }

  symulateLine (curPos) {
    if (DATA.step === 1) {
      DATA.drawShadow = true
      DATA.shadowFig = new Line(
        DATA.clicks[0].x,
        DATA.clicks[0].y,
        curPos.x,
        curPos.y,
        DATA.strokeWidth,
        DATA.strokeColor,
        DATA.scale
      )
    }
  }

  /* poly functions */
  computePoly (stop, close) {
    if (stop && DATA.step > 1) {
      if (close) DATA.clicks.push(DATA.clicks[0])

      DATA.figures.push(
        new Polyline(
          DATA.clicks,
          DATA.strokeWidth,
          DATA.strokeColor,
          DATA.scale
        )
      )

      this.reset()
    }
  }

  symulatePoly (curPos) {
    if (DATA.step > 0) {
      DATA.drawShadow = true
      const points = [...DATA.clicks, curPos]

      DATA.helperDots.push(
        new HelperDot(
          DATA.clicks[DATA.step - 1].x,
          DATA.clicks[DATA.step - 1].y
        )
      )

      DATA.shadowFig = new Polyline(
        points,
        DATA.strokeWidth,
        DATA.strokeColor,
        DATA.scale
      )
    }
  }

  /* arc functions */
  computeArc () {
    if (DATA.step === 1) {
      DATA.helperDots.push(
        new HelperDot(
          DATA.clicks[DATA.step - 1].x,
          DATA.clicks[DATA.step - 1].y
        )
      )
    }

    if (DATA.step === 2) {
      const rx = vectorLength(
        DATA.clicks[0].x,
        0,
        DATA.clicks[1].x,
        0
      )

      const ry = vectorLength(
        0,
        DATA.clicks[0].y,
        0,
        DATA.clicks[1].y
      )

      if (DATA.keyMapDown[16]) {
        DATA.figures.push(
          new Ellipse(
            DATA.clicks[0].x,
            DATA.clicks[0].y,
            rx,
            rx,
            DATA.strokeWidth,
            DATA.strokeColor,
            DATA.fillColor,
            DATA.scale
          )
        )
      } else {
        DATA.figures.push(
          new Ellipse(
            DATA.clicks[0].x,
            DATA.clicks[0].y,
            rx,
            ry,
            DATA.strokeWidth,
            DATA.strokeColor,
            DATA.fillColor,
            DATA.scale
          )
        )
      }

      this.reset()
    }
  }

  symulateArc (curPos) {
    if (DATA.step === 1) {
      DATA.drawShadow = true

      const rx = vectorLength(
        DATA.clicks[0].x,
        0,
        curPos.x,
        0
      )

      const ry = vectorLength(
        0,
        DATA.clicks[0].y,
        0,
        curPos.y
      )

      DATA.sizeIndicators[0] = new SizeIndicator(
        DATA.clicks[0].x + parseInt(rx / 2),
        DATA.clicks[0].y - 5,
        Math.floor(rx / 2 / DATA.scale),
        DATA.fillColor
      )

      DATA.diameters[0] = new Line(
        DATA.clicks[0].x,
        DATA.clicks[0].y,
        curPos.x,
        DATA.clicks[0].y,
        2,
        DATA.fillColor
      )

      if (DATA.keyMapDown[16]) {
        delete DATA.sizeIndicators[1]
        delete DATA.diameters[1]
      } else {
        DATA.sizeIndicators[1] = new SizeIndicator(
          DATA.clicks[0].x + 5,
          DATA.clicks[0].y + parseInt(ry / 2),
          Math.floor(ry / 2 / DATA.scale),
          DATA.fillColor
        )

        DATA.diameters[1] = new Line(
          DATA.clicks[0].x,
          DATA.clicks[0].y,
          DATA.clicks[0].x,
          curPos.y,
          2,
          DATA.fillColor
        )
      }

      if (DATA.keyMapDown[16]) {
        DATA.shadowFig = new Ellipse(
          DATA.clicks[0].x,
          DATA.clicks[0].y,
          rx,
          rx,
          DATA.strokeWidth,
          DATA.strokeColor,
          DATA.fillColor,
          DATA.scale
        )
      } else {
        DATA.shadowFig = new Ellipse(
          DATA.clicks[0].x,
          DATA.clicks[0].y,
          rx,
          ry,
          DATA.strokeWidth,
          DATA.strokeColor,
          DATA.fillColor,
          DATA.scale
        )
      }
    }
  }

  /* rec functions */
  computeRec () {
    if (DATA.step === 1) {
      DATA.helperDots.push(
        new HelperDot(
          DATA.clicks[DATA.step - 1].x,
          DATA.clicks[DATA.step - 1].y
        )
      )
    }

    if (DATA.step === 2) {
      const w = vectorLength(
        DATA.clicks[0].x,
        0,
        DATA.clicks[1].x,
        0
      )

      const h = vectorLength(
        0,
        DATA.clicks[0].y,
        0,
        DATA.clicks[1].y
      )

      if (DATA.keyMapDown[16]) {
        DATA.figures.push(
          new Rectangle(
            DATA.clicks[0].x,
            DATA.clicks[0].y,
            w,
            w,
            DATA.strokeWidth,
            DATA.strokeColor,
            DATA.fillColor,
            DATA.scale
          )
        )
      } else {
        DATA.figures.push(
          new Rectangle(
            DATA.clicks[0].x,
            DATA.clicks[0].y,
            w,
            h,
            DATA.strokeWidth,
            DATA.strokeColor,
            DATA.fillColor,
            DATA.scale
          )
        )
      }

      this.reset()
    }
  }

  symulateRec (curPos) {
    if (DATA.step === 1) {
      DATA.drawShadow = true
      const w = vectorLength(
        DATA.clicks[0].x,
        0,
        curPos.x,
        0
      )

      const h = vectorLength(
        0,
        DATA.clicks[0].y,
        0,
        curPos.y
      )

      DATA.sizeIndicators[0] = new SizeIndicator(
        DATA.clicks[0].x + parseInt(w / 2),
        DATA.clicks[0].y - 5,
        Math.floor(w / DATA.scale),
        DATA.fillColor
      )

      if (DATA.keyMapDown[16]) {
        delete DATA.sizeIndicators[1]
      } else {
        DATA.sizeIndicators[1] = new SizeIndicator(
          DATA.clicks[0].x + 5,
          DATA.clicks[0].y + parseInt(h / 2),
          Math.floor(h / DATA.scale),
          DATA.fillColor
        )
      }

      if (DATA.keyMapDown[16]) {
        DATA.shadowFig = new Rectangle(
          DATA.clicks[0].x,
          DATA.clicks[0].y,
          w,
          w,
          DATA.strokeWidth,
          DATA.strokeColor,
          DATA.fillColor,
          DATA.scale
        )
      } else {
        DATA.shadowFig = new Rectangle(
          DATA.clicks[0].x,
          DATA.clicks[0].y,
          w,
          h,
          DATA.strokeWidth,
          DATA.strokeColor,
          DATA.fillColor,
          DATA.scale
        )
      }
    }
  }
}
