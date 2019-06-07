import { DATA, DE } from '../utility'

export class PickFig {
  showContextMenu () {
    DE.contextMenu.classList.add('is-active')
  }

  hideContextMenu () {
    DE.contextMenu.classList.remove('is-active')
  }

  toggleContextMenu (figSelected) {
    if (figSelected) this.showContextMenu()
    else this.hideContextMenu()
  }

  positionContextMenu (click) {
    DE.contextMenu.style.top = DE.canvas.getBoundingClientRect().top + click.y + 'px'
    DE.contextMenu.style.left = DE.canvas.getBoundingClientRect().left + click.x + 'px'
  }

  unselectFigures () {
    DATA.figures.forEach(fig => {
      fig.isSelected = false
    })
  }

  pick (click) {
    let figSelected = false

    //  loop from the newest figure and check if the figure is clicked
    //  if the figure is clicked select it and stop looping so only one figure is selected
    for (let i = DATA.figures.length - 1; i >= 0; i--) {
      const fig = DATA.figures[i]
      if (fig.isClicked(click)) {
        this.unselectFigures()
        fig.isSelected = true
        figSelected = true
        this.positionContextMenu(click)
        break
      }
    }

    this.toggleContextMenu(figSelected)
  }
}
