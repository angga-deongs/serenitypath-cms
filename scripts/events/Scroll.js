import store from '../store'
import VirtualScroll from '../vendor/virtual-scroll'
import Emitter from './Emitter'
import { bindAll, bounds } from '../utils'
import { Sniffer } from '../utils/Sniffer'

export default class Scroll {
  constructor(o) {
    this.smooth = o.smooth || false
    store.flags.smooth = this.smooth

    bindAll(this, 'onEvent', 'onScroll')
  }

  setScrollBounds() {
    store.bounds = {}
    const height = bounds(store.page).height
    store.bounds.scroll = height > store.vh ? height - store.vh : 0
  }

  onEvent(e) {
    Emitter.emit('scroll', { y: e.deltaY * -1 })
  }

  onScroll() {
    Emitter.emit('scroll', { y: window.scrollY })
  }

  on() {
    this.l('add')
  }

  off() {
    this.l('remove')
  }

  l(a) {
    if (this.smooth) {
      const action = a === 'add' ? 'on' : 'off'
      const vs = new VirtualScroll({
        mouseMultiplier: Sniffer.sniff.isWindows ? 1.1 : 0.32,
        touchMultiplier: 3.5,
        firefoxMultiplier: Sniffer.sniff.isWindows ? 40 : 90,
        passive: true,
      })

      vs[action](this.onEvent)
    } else {
      document.addEventListener('scroll', this.onScroll, true)
    }
  }
}
