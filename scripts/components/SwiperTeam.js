import { Swiper } from '.'
import store from '../store'
import gsap from 'gsap'
import { qs, qsa } from '../utils'

export default class SwiperTeam extends Swiper {
  constructor(obj = {}) {
    super(obj)
  }

  setup() {
    super.setup()

    const { multiple } = this.dom

    this.data = {
      item1: multiple[0],
      item2: multiple[1],
      item3: multiple[2],
      item4: multiple[3],
      item5: multiple[4],
    }

    // if (store.sniff.isDevice) {
    //   this.swipeSet(0)
    // }
  }

  swipeRight() {
    super.swipeRight()
    const { current } = this.state
    this.swipeSet(current)
  }

  swipeLeft() {
    super.swipeLeft()
    const { current } = this.state
    this.swipeSet(current)
  }

  swipeSet(center) {
    const { direction, total } = this.state
    const { item1, item2, item3, item4, item5 } = this.data

    this.state.current = center

    const minus1 = center - 1 >= 0 ? center - 1 : total
    const minus2 = minus1 - 1 >= 0 ? minus1 - 1 : total
    const minus3 = minus2 - 1 >= 0 ? minus2 - 1 : total
    const plus1 = center + 1 > total ? 0 : center + 1
    const plus2 = plus1 + 1 > total ? 0 : plus1 + 1
    const plus3 = plus2 + 1 > total ? 0 : plus2 + 1

    item1.forEach((item) => item.classList.remove('-a'))
    item1[minus2].classList.add('-a')
    item2.forEach((item) => item.classList.remove('-a'))
    item2[minus1].classList.add('-a')
    item4.forEach((item) => item.classList.remove('-a'))
    item4[plus1].classList.add('-a')
    item5.forEach((item) => item.classList.remove('-a'))
    item5[plus2].classList.add('-a')

    item3.forEach((item) => item.classList.remove('-active'))
    item3[center].classList.add('-active')

    if (direction == 'left') {
      this.onSwipe(item1[minus3], item1[minus2])
      this.onSwipe(item2[minus2], item2[minus1])
      this.onSwipe(item3[minus1], item3[center])
      this.onSwipe(item4[center], item4[plus1])
      this.onSwipe(item5[plus1], item5[plus2])
    } else {
      this.onSwipe(item1[minus1], item1[minus2])
      this.onSwipe(item2[center], item2[minus1])
      this.onSwipe(item3[plus1], item3[center])
      this.onSwipe(item4[plus2], item4[plus1])
      this.onSwipe(item5[plus3], item5[plus2])
    }
  }

  onSwipe(prev, current) {
    if (this.state.animate) return

    //this.state.animate = true

    const prevImg = qs('.cover', prev)
    const curImg = qs('.cover', current)
    const title = qsa('.char-1', current)
    const subtitle = qs('.team-university', current)
    const description = qs('.team-description', current)
    const p6 = qsa('.-a .team-info .p6')
    const p = qsa('.-a .team-info .p')
    const left = this.state.direction == 'left' ? -1 : 1
    const right = this.state.direction == 'left' ? 1 : -1

    if (prev) {
      gsap.to(prev, { duration: 0.5, autoAlpha: 0 })
    }

    if (current) {
      gsap.to(current, {
        duration: 0.5,
        autoAlpha: 1,
        onComplete: () => {
          this.state.animate = false
        },
      })
    }

    if (prevImg) {
      gsap.fromTo(
        prevImg,
        { x: '0%' },
        { duration: 0.5, x: `${100 * left}%`, ease: 'power2.inOut' },
      )
    }
    if (curImg) {
      gsap.fromTo(
        curImg,
        { x: `${100 * right}%` },
        { duration: 0.5, x: '0%', ease: 'power2.inOut' },
      )
    }

    if (p6.length !== 0) {
      gsap.fromTo(
        p6,
        { autoAlpha: 0, y: 10 },
        { duration: 0.5, y: 0, autoAlpha: 1, stagger: 0.1 },
      )
    }

    if (p.length !== 0) {
      gsap.fromTo(
        p,
        { autoAlpha: 0, y: 10 },
        { duration: 0.5, y: 0, autoAlpha: 1, stagger: 0.1 },
      )
    }

    if (title.length !== 0) {
      gsap.from(title, {
        duration: 0.5,
        y: '101%',
        stagger: 0.02,
        onComplete: () => {},
      })
    }
    if (subtitle) {
      gsap.from(subtitle, { duration: 0.5, y: 40, autoAlpha: 0, delay: 0.1 })
    }

    if (description) {
      gsap.from(description, {
        duration: 0.5,
        y: 20,
        autoAlpha: 0,
        delay: 0.15,
      })
    }
  }
}
