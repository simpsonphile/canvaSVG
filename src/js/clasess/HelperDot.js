export class HelperDot {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  draw (ctx, specialColor, scale) {
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

    ctx.font = '9px Exo-2'
    ctx.fillStyle = 'white'
    const txt = `(${Math.floor(this.x / scale)}, ${Math.floor(this.y / scale)})`
    ctx.fillText(txt, parseInt(this.x + 5), parseInt(this.y - 5))
  }
}
