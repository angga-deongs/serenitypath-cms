//import { PointerListener, Pan } from 'contactjs'
import gsap from 'gsap'
import { bindAll, qs, qsa } from '../utils'
import 'hammerjs'

export default class Swiper {
  constructor(obj = {}) {
    bindAll(this, 'swipeRight', 'swipeLeft')

    const container = obj.container
    const single = obj.single
    const multiple = obj.multiple
    const right = obj.right
    const left = obj.left
    const total = qs('.c-total', container)
    const active = qsa('.c-index', container)

    const hammer = new Hammer(container)

    this.state = {
      current: 0,
      next: 0,
      total: 0,
      animate: false,
      direction: '',
    }

    this.dom = {
      container,
      single,
      multiple,
      hammer,
      right,
      left,
      total,
      active,
    }

    this.init()
  }

  setup() {
    const { single, multiple, total } = this.dom

    if (single) {
      this.state.total = single.length - 1
    }

    if (multiple) {
      this.state.total = multiple[0].length - 1
    }

    const t = this.state.total + 1

    total.innerHTML = t < 10 ? `00${t}` : `0${t}`
  }

  on() {
    const { hammer, right, left } = this.dom
    hammer.on('swiperight', this.swipeRight)
    hammer.on('swipeleft', this.swipeLeft)
    right && right.addEventListener('click', this.swipeLeft)
    left && left.addEventListener('click', this.swipeRight)
  }

  off() {
    const { hammer, right, left } = this.dom
    hammer.off('swiperight panright', this.swipeRight)
    hammer.off('swipeleft panleft', this.swipeLeft)
    right && right.removeEventListener('click', this.swipeLeft)
    left && left.removeEventListener('click', this.swipeRight)
  }

  swipeRight() {
    const { current, total } = this.state
    const { active } = this.dom
    const index = current <= 0 ? total : current - 1
    const index2 = index <= 0 ? total : index - 1
    const index3 = index2 <= 0 ? total : index2 - 1

    this.state.current = index
    this.state.direction = 'right'
    const i = index + 1

    const nr = [index + 1, index2 + 1, index3 + 1, index + 1]

    if (active.length !== 0) {
      active.forEach((el, j) => {
        el.innerHTML = index < 10 ? `00${nr[j]}` : `0${nr[j]}`
      })
    }
  }

  swipeLeft() {
    const { current, total } = this.state
    const { active } = this.dom
    const index = current < total ? current + 1 : 0
    const index2 = index < total ? index + 1 : 0
    const index3 = index2 < total ? index2 + 1 : 0

    this.state.current = index
    this.state.direction = 'left'

    const i = index + 1
    const nr = [index + 1, index2 + 1, index3 + 1, index + 1]

    // if (active) active.innerHTML = index < 10 ? `00${i}` : `0${i}`

    if (active.length !== 0) {
      active.forEach((el, j) => {
        el.innerHTML = index < 10 ? `00${nr[j]}` : `0${nr[j]}`
      })
    }
  }

  onSwipe(prev, current) {
    if (this.state.animate) return

    gsap.to(prev, { duration: 0.5, autoAlpha: 0 })

    gsap.to(current, {
      duration: 0.5,
      autoAlpha: 1,
      onComplete: () => {
        this.state.animate = false
      },
    })
  }

  clear() {
    const { single, multiple } = this.dom

    if (single) {
      single.forEach((item) => gsap.set(item, { clearProps: 'all' }))
    }

    if (multiple) {
      multiple.forEach((items) => {
        items.forEach((item) => {
          gsap.set(item, { clearProps: 'all' })
        })
      })
    }
  }

  destroy() {
    this.off()
  }

  init() {
    this.setup()
    this.on()
  }
}
