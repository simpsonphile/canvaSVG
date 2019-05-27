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
