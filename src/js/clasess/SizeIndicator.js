export class SizeIndicator {
  constructor (x, y, txt, color) {
    this.x = x
    this.y = y
    this.txt = txt
    this.color = color
  }

  draw (ctx) {
    ctx.font = '11px Exo-2'
    ctx.fillStyle = this.color
    ctx.fillText(this.txt, parseInt(this.x + 5), parseInt(this.y - 5))
  }
}
