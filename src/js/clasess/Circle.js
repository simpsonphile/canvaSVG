export class Circle {
  constructor (cx, cy, r, sw, sc, fc) {
    this.cx = parseInt(cx)
    this.cy = parseInt(cy)
    this.r = parseInt(r)
    this.sw = parseInt(sw)
    this.sc = sc
    this.fc = fc
  }

  returnHTML () {
    let cx, cy, r, sw, sc, fc
    if (this.cx) cx = `cx="${this.cx}"`
    if (this.cy) cy = `cy="${this.cy}"`
    if (this.r) r = `r="${this.r}"`
    if (this.sw) sw = `stroke-width="${this.sw}"`
    if (this.sc) sc = `stroke="${this.sc}"`
    if (this.fc) fc = `fill="${this.fc}"`

    const HTML = `
      <circle ${cx} ${cy} ${r} ${sw} ${sc} ${fc}></circle>
    `

    return HTML
  }

  draw (ctx) {
    ctx.beginPath()
    ctx.arc(this.cx, this.cy, this.r, 0, 2 * Math.PI)
    ctx.strokeStyle = this.sc
    ctx.lineWidth = this.sw
    ctx.stroke()
    ctx.fillStyle = this.fc
    ctx.fill()
  }
}
