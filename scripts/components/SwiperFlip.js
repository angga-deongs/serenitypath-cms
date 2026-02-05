import { Swiper } from '.'
import { Flip } from 'gsap/Flip'
import gsap from 'gsap'
gsap.registerPlugin(Flip)

export default class SwiperFlip extends Swiper {
  constructor(obj = {}) {
    super(obj)
  }

  setup() {
    super.setup()
  }

  swipeRight() {
    super.swipeRight()

    const { current, total } = this.state
    const prev = current - 1 >= 0 ? current - 1 : total

    this.onSwipe(prev)
  }

  swipeLeft() {
    super.swipeLeft()

    const { current, total } = this.state

    const prev = current - 1 >= 0 ? current - 1 : total

    this.onSwipe(prev)
  }

  onSwipe(active) {
    const { total, direction, current } = this.state
    const { single } = this.dom

    single.forEach((item, i) => {
      if (direction == 'left') {
        const index = i - 1
        const data = single[index]
        const prev = data ? data : single[total]
        const item1 = Flip.getState(item)
        const item2 = Flip.getState(prev)

        const plus1 = current + 1 > total ? 0 : current + 1
        const plus2 = plus1 + 1 > total ? 0 : plus1 + 1
        const plus3 = plus2 + 1 > total ? 0 : plus2 + 1

        gsap.to(single, { duration: 0.5, autoAlpha: 0 })
        gsap.to(single[plus1], { autoAlpha: 1 })
        gsap.to(single[plus2], { autoAlpha: 1 })
        gsap.to(single[plus3], { autoAlpha: 1 })

        Flip.fit(item1, item2, {
          duration: 0.5,
          ease: 'power3.out',
          scale: true,
        })
      } else {
        const index = i + 1
        const data = single[index]
        const prev = data ? data : single[0]
        const item1 = Flip.getState(item)
        const item2 = Flip.getState(prev)

        const plus1 = current + 1 > total ? 0 : current + 1
        const plus2 = plus1 + 1 > total ? 0 : plus1 + 1
        const plus3 = plus2 + 1 > total ? 0 : plus2 + 1

        gsap.to(single, { duration: 0.5, autoAlpha: 0 })
        gsap.to(single[plus1], { autoAlpha: 1 })
        gsap.to(single[plus2], { autoAlpha: 1 })
        gsap.to(single[plus3], { autoAlpha: 1 })

        Flip.fit(item1, item2, {
          duration: 0.5,
          ease: 'power3.out',
          scale: true,
        })
      }
    })
  }
}
