export class HelperDot {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  draw (ctx) {
    ctx.beginPath()
    ctx.fillStyle = 'red'
    ctx.arc(parseInt(this.x), parseInt(this.y), 2, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
  }
}
