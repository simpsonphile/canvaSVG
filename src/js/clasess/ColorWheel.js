import Pickr from '@simonwep/pickr/dist/pickr.min'

export class ColorWheel {
  constructor (app) {
    this.components = {
      preview: true,
      opacity: true,
      hue: true,

      interaction: {
        hex: true,
        rgba: true,
        input: true,
        save: true
      }
    }

    this.app = app
  }

  init () {
    this.fillBtn = Pickr.create({
      el: '.js-color-fill',
      useAsButton: 'false',
      default: '#fff',
      components: {
        ...this.components
      }
    }).on('save', color => {
      this.app.changeColor(color.toRGBA().toString(), 'fill')
    })

    this.strokeBtn = Pickr.create({
      el: '.js-color-stroke',
      useAsButton: 'false',
      default: '#fff',
      components: {
        ...this.components
      }
    }).on('save', color => {
      this.app.changeColor(color.toRGBA().toString(), 'stroke')
    })
  }
}
