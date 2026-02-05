import { Swiper } from '.'
import { qs, qsa } from '../utils'
import gsap from 'gsap'

export default class SwiperFade extends Swiper {
  constructor(obj = {}) {
    super(obj)
  }

  setup() {
    super.setup()

    const { multiple } = this.dom

    this.data = {
      large: multiple[0],
      small: multiple[1],
      text: multiple[2],
    }

    this.onSwipe(this.data.small[0], this.data.small[1])
  }

  swipeRight() {
    super.swipeRight()

    const { current, total } = this.state
    const { large, small, text } = this.data
    const prev = current + 1 > total ? 0 : current + 1
    const next = current - 1 > 0 ? current - 1 : total

    this.onSwipe(large[prev], large[current])
    this.onSwipe(small[next], small[prev])
    this.onSwipe(text[prev], text[current])
  }

  swipeLeft() {
    super.swipeLeft()

    const { current, total } = this.state
    const { large, small, text } = this.data

    const prev = current - 1 >= 0 ? current - 1 : total
    const next = current + 1 > total ? 0 : current + 1

    this.onSwipe(large[prev], large[current])
    this.onSwipe(small[current], small[next])
    this.onSwipe(text[prev], text[current])
  }

  onSwipe(prev, current) {
    if (this.state.animate) return

    const prevImg = qs('.cover', prev)
    const curImg = qs('.cover', current)
    const title = qsa('.char-1', current)
    const subtitle = qs('.slider-position', current)
    const description = qs('.slider-description', current)
    const left = this.state.direction == 'left' ? -1 : 1
    const right = this.state.direction == 'left' ? 1 : -1

    gsap.to(prev, { duration: 0.5, autoAlpha: 0 })

    gsap.to(current, {
      duration: 0.5,
      autoAlpha: 1,
      onComplete: () => {
        this.state.animate = false
      },
    })

    if (prevImg)
      gsap.fromTo(
        prevImg,
        { x: '0%' },
        { duration: 0.5, x: `${100 * left}%`, ease: 'power2.inOut' },
      )
    if (curImg)
      gsap.fromTo(
        curImg,
        { x: `${100 * right}%` },
        { duration: 0.5, x: '0%', ease: 'power2.inOut' },
      )

    if (title.length !== 0)
      gsap.from(title, { duration: 0.5, y: '101%', stagger: 0.01 })
    if (subtitle)
      gsap.from(subtitle, { duration: 0.5, y: 40, autoAlpha: 0, delay: 0.1 })
    if (description)
      gsap.from(description, {
        duration: 0.5,
        y: 20,
        autoAlpha: 0,
        delay: 0.15,
      })
  }
}
