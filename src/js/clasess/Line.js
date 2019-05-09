export class Line {
  constructor (x1, y1, x2, y2, sw, sc) {
    this.x1 = parseInt(x1)
    this.y1 = parseInt(y1)
    this.x2 = parseInt(x2)
    this.y2 = parseInt(y2)
    this.sw = parseInt(sw)
    this.sc = sc
  }

  returnHTML () {
    let x1, y1, x2, y2, sw, sc
    if (this.x1) x1 = `x1="${this.x1}"`
    if (this.y1) y1 = `y1="${this.y1}"`
    if (this.x2) x2 = `x2="${this.x2}"`
    if (this.y2) y2 = `y2="${this.y2}"`
    if (this.sw) sw = `stroke-width="${this.sw}"`
    if (this.sc) sc = `stroke="${this.sc}"`

    const HTML = `
      <line ${x1} ${y1} ${x2} ${y2} ${sw} ${sc}></line>
    `

    return HTML
  }

  draw (ctx) {
    ctx.beginPath()
    ctx.moveTo(this.x1, this.y1)
    ctx.lineTo(this.x2, this.y2)
    ctx.strokeStyle = this.sc
    ctx.lineWidth = this.sw
    ctx.stroke()
  }
}
