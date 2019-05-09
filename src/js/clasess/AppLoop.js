export class AppLoop {
  constructor (fps, app) {
    this.fps = fps
    this.then = Date.now()
    this.then2 = Date.now()
    this.delta = undefined
    this.delta2 = undefined
    this.now = undefined
    this.interval = 1000 / this.fps
    this.app = app
  }

  start () {
    window.requestAnimationFrame(this.start.bind(this))
    this.now = Date.now()
    this.delta = this.now - this.then

    if (this.delta > this.interval) {
      this.app.draw()
      this.then = this.now - (this.delta % this.interval)
    }
  }
}
