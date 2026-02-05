import store from '../store'
import { Emitter, RafController } from '../events'

export default class Scrollbar {
  constructor() {
    this.el = null
    this.handle = null
    this.state = {
      clicked: false,
      scale: 0,
      current: 0,
    }

    this.height = 0

    this.init()
  }

  init() {
    this.create()
    this.setBounds()
    this.on()
  }

  on() {
    Emitter.on('tick', this.transform)
    Emitter.on('GlobalResize', this.resize)
  }

  off() {
    Emitter.off('tick', this.transform)
    Emitter.off('GlobalResize', this.resize)
  }

  setBounds() {
    const scrollLimit = store.bounds.scroll
    const vh = store.vh

    this.state.scale = (scrollLimit + vh) / vh
    this.handle.style.height = `${vh / this.state.scale}px`
  }

  transform = ({ current }) => {
    const scroll = current / this.state.scale
    this.state.current = scroll
    this.handle.style.transform = `translate3d(0, ${this.state.current}px, 0)`
  }

  resize = () => {
    this.setBounds()
  }

  calcScroll(e) {
    const delta = e.clientY * this.state.scale
    RafController.target = delta
    RafController.clampTarget()
  }

  create() {
    this.el = document.createElement('div')
    this.handle = document.createElement('div')
    this.el.classList.add('scrollbar', 'js-scrollbar')
    this.handle.classList.add('scrollbar__handle', 'js-scrollbar__handle')

    Object.assign(this.el.style, {
      position: 'fixed',
      top: 0,
      right: 0,
      height: '100%',
      pointerEvents: 'all',
    })

    Object.assign(this.handle.style, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      cursor: 'pointer',
    })

    store.page.appendChild(this.el)
    this.el.appendChild(this.handle)
  }

  update() {
    this.setBounds()
  }

  destroy() {
    this.off()
  }
}
