export class MenuBar {
  constructor (context) {
    this.context = context
    this.triggers = this.context.querySelectorAll('.js-has-dropdown')
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
  }
}
