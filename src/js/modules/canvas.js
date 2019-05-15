import { AppWindow } from '../clasess/AppWindow'
import { Toolkit } from '../clasess/Toolkit'
import { AppLoop } from '../clasess/AppLoop'
import { AppLogic } from '../clasess/AppLogic'

import { Modal } from '../clasess/Modal'

import { ColorWheel } from '../clasess/ColorWheel'

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

/* Initialize toolkit */
const toolkit = new Toolkit(appLogic, colorWheel, appWindow)
toolkit.init()

/* Initialize modals */
const modal = new Modal()
modal.init()
