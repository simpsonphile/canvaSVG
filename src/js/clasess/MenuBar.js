export class MenuBar {
  constructor (context) {
    this.context = context
    this.triggers = this.context.querySelectorAll('.js-has-dropdown')
  }

  closeMenu () {
    this.triggers.forEach(trigger => {
      trigger.classList.remove('is-active')
    })
  }

  closeSiblingDropdowns (lvl) {
    this.triggers.forEach(trigger => {
      if (trigger.dataset.lvl === lvl) {
        trigger.classList.remove('is-active')
      }
    })
  }

  init () {
    this.triggers.forEach(trigger => {
      trigger.querySelector('.js-label').addEventListener('click', event => {
        if (trigger.classList.contains('is-active')) {
          trigger.classList.remove('is-active')
        } else {
          this.closeSiblingDropdowns(trigger.dataset.lvl)
          trigger.classList.add('is-active')
        }
      })
    })

    document.addEventListener('click', event => {
      let isMenuClicked = false
      event.path.forEach(el => {
        if (el === this.context) {
          isMenuClicked = true
        }
      })
      if (!isMenuClicked) {
        this.closeMenu()
      }
    })
  }
}
