export class HelperDot {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  draw (ctx, specialColor) {
    ctx.save()
    ctx.beginPath()
    if (specialColor) {
      ctx.fillStyle = 'green'
    } else {
      ctx.fillStyle = 'red'
    }
    ctx.arc(parseInt(this.x), parseInt(this.y), 4, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }
}
