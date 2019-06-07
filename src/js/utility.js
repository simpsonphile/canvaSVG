export const DE = {
  canvasWindow: document.querySelector('.js-canvas-window'),
  figBtns: document.querySelectorAll('.js-fig'),
  historyUndoBtn: document.querySelector('.js-history-undo'),
  historyRedoBtn: document.querySelector('.js-history-redo'),
  svgBtn: document.querySelector('.js-generate-svg'),
  copyBtn: document.querySelector('.js-copy'),
  svgCode: document.querySelector('.js-generated-svg-code'),
  resetCanvasBtn: document.querySelector('.js-reset-canvas'),
  colorBtns: document.querySelectorAll('.js-color-for'),
  canvasSizeInputs: document.querySelectorAll('.js-canvas-size'),
  canvas: document.querySelector('.js-canvas'),
  canvasContainer: document.querySelector('.js-canvas-container'),
  cursorPosIndi: document.querySelector('.js-cursor-pos'),
  strokeWidthInput: document.querySelector('.js-stroke-width-input'),
  fillColorIndicator: document.querySelector('.js-color-fill-indicator'),
  strokeColorIndicator: document.querySelector('.js-color-stroke-indicator'),
  resetFigBtn: document.querySelector('.js-btn-reset-fig'),
  layFigBtn: document.querySelector('.js-btn-lay-fig'),
  closeFigBtn: document.querySelector('.js-btn-close-fig'),
  menuBars: document.querySelectorAll('.js-menu-bar'),
  contextMenu: document.querySelector('.js-context-menu'),
  currentFigFcBtn: document.querySelector('.js-current-fig-fc'),
  currentFigScBtn: document.querySelector('.js-current-fig-sc'),
  currentFigSwBtn: document.querySelector('.js-current-fig-sw'),
  currentFigDelBtn: document.querySelector('.js-current-fig-del')
}

export function isTouchDevice () {
  const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
  const mq = function (query) {
    return window.matchMedia(query).matches
  }

  if (('ontouchstart' in window) ||
      window.DocumentTouch &&
      document instanceof DocumentTouch) {
    return true
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('')
  return mq(query)
}

export function vectorLength (x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
}

export function triangleArea (x1, y1, x2, y2, x3, y3) {
  return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2)
}

export const BREAKPOINTS = {
  tablet: 1200
}

export const DATA = {
  scale: 1,
  keyMapDown: [],
  svg: {
    width: 750,
    height: 750
  },

  strokeWidth: 1,
  strokeColor: '#ffffff',
  fillColor: '#FFFFFF0',

  mode: '',
  step: 0,
  clicks: [],
  shadowFig: {},
  drawShadow: false,
  helperDots: [],
  sizeIndicators: [],
  diameters: []
}
