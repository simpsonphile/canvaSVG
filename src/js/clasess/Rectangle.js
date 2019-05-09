export class Rectangle {
  constructor (x, y, w, h, sw, sc, fc) {
    this.x = parseInt(x)
    this.y = parseInt(y)
    this.w = parseInt(w)
    this.h = parseInt(h)
    this.sw = parseInt(sw)
    this.sc = sc
    this.fc = fc
  }

  returnHTML () {
    let x, y, w, h, sw, sc, fc
    if (this.x) x = `x="${this.x}"`
    if (this.y) y = `y="${this.y}"`
    if (this.w) w = `width="${this.w}"`
    if (this.h) h = `height="${this.h}"`
    if (this.sw) sw = `stroke-width="${this.sw}"`
    if (this.sc) sc = `stroke="${this.sc}"`
    if (this.fc) fc = `fill="${this.fc}"`

    const HTML = `
      <rect ${x} ${y} ${w} ${h} ${sw} ${sc} ${fc}></rect>
    `

    return HTML
  }

  draw (ctx) {
    ctx.beginPath()
    ctx.rect(this.x, this.y, this.w, this.h)
    ctx.strokeStyle = this.sc
    ctx.lineWidth = this.sw
    ctx.stroke()
    ctx.fillStyle = this.fc
    ctx.fill()
  }
}
