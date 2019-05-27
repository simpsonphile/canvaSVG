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
  canvasContainer: document.querySelector('js-canvas-container'),
  cursorPosIndi: document.querySelector('.js-cursor-pos'),
  toggleFillMode: document.querySelectorAll('.js-toggle-fill'),
  fillColorIndicator: document.querySelector('.js-fill-color-indicator'),
  strokeColorIndicator: document.querySelector('.js-stroke-color-indicator')
}

export function vectorLength (x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
}

export function invertColor (hex) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1)
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.')
  }
  // invert color components
  let r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16)
  let g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16)
  let b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16)
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b)
}

function padZero (str, len) {
  len = len || 2
  var zeros = new Array(len).join('0')
  return (zeros + str).slice(-len)
}

export const G = {
  scale: 1,
  keyMapDown: [],
  svg: {
    width: 100,
    height: 100
  },

  sw: 1,
  sc: '#ffffff',
  fc: '#ffffff',

  colorFor: undefined,
  fillMode: false,

  mode: '',
  step: 0,
  clicks: [],
  shadowFig: {},
  drawShadow: false,
  helperDots: [],
  sizeIndicators: [],
  diameters: []
}
