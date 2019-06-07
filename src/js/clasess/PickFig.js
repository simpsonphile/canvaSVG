import { DATA } from '../utility'

export class PickFig {
  pick (click) {
    DATA.figures.forEach(fig => {
      console.log(fig.isClicked(click))
    })
  }
}
