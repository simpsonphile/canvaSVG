import ReinventedColorWheel from 'reinvented-color-wheel'

export class ColorWheel {
  constructor (app) {
    this.app = app
    this.wheel = new ReinventedColorWheel({
      appendTo: document.querySelector('.js-color-wheel'),
      hex: '#ff0000',
      wheelDiameter: 200,
      wheelThickness: 20,
      handleDiameter: 16,
      wheelReflectsSaturation: true
    })
  }

  init () {
    const self = this
    self.app.pickerColor = this.wheel.hex
    this.wheel.onChange = function (color) {
      console.log(color._hex)
      self.app.changeColor(color._hex)
    }
  }
}
