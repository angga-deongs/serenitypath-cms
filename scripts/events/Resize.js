/* Resize
   Default Resize Event
   ========================================================================== */

import store from '../store'

import { Emitter } from '../events'
import {
  Sniffer,
  bindAll,
  getViewport,
  getWindowSizes,
  setViewportCSSVar,
} from '../utils'
import debounce from 'lodash.debounce'

export default class Resize {
  constructor() {
    bindAll(this, 'onResize')

    this.resized = false

    this.init()
  }

  onResize() {
    if (store.sniff.isDevice && window.innerWidth === store.vw && this.resized)
      return

    Sniffer.update()
    store.flags.resize = true
    store.vw = getViewport().width
    store.vh = getViewport().height
    store.window = getWindowSizes()
    if (
      (!store.sniff.isDevice && Sniffer.isDevice) ||
      (store.sniff.isDevice && !Sniffer.isDevice)
    )
      location.reload()
    store.sniff = Sniffer.sniff
    store.scroll.setScrollBounds()
    setViewportCSSVar()

    Emitter.emit('GlobalResize')
    store.flags.resize = false
    if (store.sniff.isDevice) store.body.classList.add('is-device')

    this.resized = true
  }

  on() {
    window.addEventListener('resize', debounce(this.onResize, 200))
  }

  init() {
    this.on()
  }
}
