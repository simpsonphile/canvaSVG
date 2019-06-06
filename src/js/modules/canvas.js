import { AppWindow } from '../clasess/AppWindow'
import { MenuBar } from '../clasess/MenuBar'
import { Toolkit } from '../clasess/Toolkit'
import { AppLoop } from '../clasess/AppLoop'
import { AppLogic } from '../clasess/AppLogic'

import { Modal } from '../clasess/Modal'

import { ColorWheel } from '../clasess/ColorWheel'

import { DE } from '../utility'

const appLogic = new AppLogic()

/* Initialize appWindow */
const appWindow = new AppWindow(appLogic)
appWindow.init()

/* Initialize and run AnimationLoop and logicLoop */
const appLoop = new AppLoop(30, appWindow)
appLoop.start()

/* Initialize colorPicker */
const colorWheel = new ColorWheel(appLogic)
colorWheel.init()

/* Initialize menubar */
const menuBars = []
DE.menuBars.forEach(menu => {
  const menuBar = new MenuBar(menu)
  menuBar.init()
  menuBars.push(menuBar)
})
/* Initialize toolkit */
const toolkit = new Toolkit(appLogic, appWindow)
toolkit.init()

/* Initialize modals */
const modal = new Modal()
modal.init()
