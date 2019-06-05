import { BREAKPOINTS } from '../utility'

export class Modal {
  constructor () {
    this.modals = document.querySelectorAll('.js-modal')
    this.modalTriggers = document.querySelectorAll('.js-modal-trigger')
  }

  positionModal (trigger, modal) {
    if (window.innerWidth > BREAKPOINTS.tablet) {
      modal.style.top = trigger.offsetTop + 'px'
      modal.style.left = trigger.offsetLeft + 10 + trigger.offsetWidth + 'px'
    } else if (window.innerWidth <= BREAKPOINTS.tablet) {
      modal.style.top = trigger.offsetTop + trigger.offsetHeight + 10 + 'px'
      modal.style.left = trigger.offsetLeft + 'px'
    }
  }

  init () {
    this.modals.forEach(modal => {
      modal.querySelectorAll('.js-modal-close').forEach(modalClose => {
        modalClose.addEventListener('click', event => {
          modal.classList.add('u-hidden')
        })
      })
    })

    this.modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', event => {
        const modalID = trigger.dataset.modal
        const modal = document.querySelector(`.js-modal[data-modal="${modalID}"]`)
        modal.classList.toggle('u-hidden')

        if (trigger.hasAttribute('data-modal-positioned')) {
          this.positionModal(trigger, modal)
        }
      })
    })
  }
}
