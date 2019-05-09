export class Polyline {
  constructor (points, sw, sc, fc) {
    this.points = points
    this.sw = parseInt(sw)
    this.sc = sc
    this.fc = fc
  }

  returnHTML () {
    let points, sw, sc, fc
    if (this.points) points = `points="${this.points}"`
    if (this.sw) sw = `stroke-width="${this.sw}"`
    if (this.sc) sc = `stroke="${this.sc}"`
    if (this.fc) fc = `fill="${this.fc}"`

    const HTML = `
      <polyline ${points} ${sw} ${sc} ${fc}></polyline>
    `

    return HTML
  }

  draw (ctx) {
    ctx.beginPath()

    // ctx.polyline(this.cx, this.cy, this.r, 0, 2 * Math.PI)

    ctx.strokeStyle = this.sc
    ctx.lineWidth = this.sw
    ctx.stroke()
    ctx.fillStyle = this.fc
    ctx.fill()
  }
}
