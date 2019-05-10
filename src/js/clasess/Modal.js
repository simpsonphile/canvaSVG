export class Modal {
  constructor () {
    this.modals = document.querySelectorAll('.js-modal')
    this.modalTriggers = document.querySelectorAll('.js-modal-trigger')
  }

  init () {
    this.modals.forEach(modal => {
      modal.querySelector('.js-modal-close').addEventListener('click', event => {
        modal.classList.add('u-hidden')
      })
    })

    this.modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', event => {
        const modalID = trigger.dataset.modal
        const modal = document.querySelector(`.js-modal[data-modal="${modalID}"]`)
        modal.classList.remove('u-hidden')
      })
    })
  }
}
