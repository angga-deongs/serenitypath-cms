import store from '../../store'
import Highway from '@dogstudio/highway'
import { Emitter } from '../../events'
import { qs, qsa, bindAll, formFocus, bounds } from '../../utils'
import { SmoothScroll, Menu, Forms } from '../../components'
import gsap from 'gsap'
import { ScrollTrigger } from '../../vendor/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

class Default extends Highway.Renderer {
  constructor(opt = {}) {
    super(opt)

    bindAll(this, 'run', 'openTab')

    if (store.sniff.isDevice) store.body.classList.add('is-device')

    this.popupState = localStorage.getItem('popup')
      ? localStorage.getItem('popup')
      : null

    this.state = {
      animateIn: false,
      header: false,
      isStone: false,
    }
  }

  onEnter() {
    store.page = this.wrap.lastElementChild
  }

  onEnterCompleted() {
    ScrollTrigger.refresh()

    this.dom()
    this.on()
    this.components()
    this.onload()
    this.nav()
    this.animateIn()
  }

  dom() {
    this.links = qsa('[data-link]')
    this.imgs = qsa('img')
    this.tabs = qsa('.doctor-block')
    this.header = qs('header')
    this.closePopup = qs('.popup-close')

    this.menu = new Menu({
      desktopMenu: qs('header'),
      mobileMenu: qs('.menuMobile'),
      footer: qs('footer'),
      url: store.H.location.href,
      open: qs('.burger'),
      close: qs('.close'),
    })
  }

  on() {
    Emitter.on('tick', this.run)

    this.links.forEach((link) => {
      link.addEventListener('click', (el) => {
        const target = el.target
        const href = window.location.origin
        const url = `${href + target.dataset.link}`

        if (url) store.H.redirect(url, 'fade')
      })
    })

    this.closePopup.addEventListener('click', () => {
      gsap.to('.popup', { duration: 0.5, opacity: 0, display: 'none' })
      localStorage.setItem('popup', 'true')
    })

    this.tabs.forEach((tab) => {
      tab.addEventListener('click', this.openTab)
    })
  }

  off() {
    Emitter.off('tick', this.run)

    this.tabs.forEach((tab) => {
      tab.removeEventListener('click', this.openTab)
    })
  }

  components() {
    formFocus()
    this.forms = new Forms()

    if (this.popupState) {
      document.documentElement.setAttribute('data-popup', this.popupState)
    }
  }

  nav() {
    const header = this.header
    const hero = qs('.hero.-fixed')

    if (!hero) {
      header.classList.add('-kelp')
    } else {
      header.classList.add('-stone')
      this.state.isStone = true
      this.rectHero = bounds(hero)
    }
  }

  openTab(e) {
    const target = e.target
    const parent = target.parentNode

    if (parent.classList.contains('-active')) return

    const active = qs('.accordionBlock-doctor.-active')

    if (active) {
      const activeContent = qs('.doctor-description', active)
      const activeDot = qs('.dot', active)

      gsap.to(activeContent, {
        duration: 0.4,
        height: '0px',
        ease: 'power3.out',
        onComplete: () => {
          active.classList.remove('-active')
          gsap.set(activeContent, { clearProps: 'all' })
        },
      })

      gsap.to(activeDot, { duration: 0.5, background: '#3c4e3d' })
    }

    if (parent) {
      const parentContent = qs('.doctor-description', parent)
      const parentDot = qs('.dot', parent)
      parent.classList.add('-active')

      gsap.from(parentContent, {
        duration: 0.4,
        height: '0px',
        ease: 'power3.out',
        onComplete: () => {
          gsap.set(parentContent, { clearProps: 'all' })
          SmoothScroll.update()
        },
      })

      gsap.to(parentDot, { duration: 0.5, background: 'none' })
    }
  }

  onload() {
    if (this.imgs.length === 0) return

    Promise.all(
      this.imgs
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.onload = img.onerror = resolve
            }),
        ),
    ).then(() => {
      SmoothScroll && SmoothScroll.update()
    })
  }

  animateIn() {
    this.smooth()
  }

  run(e) {
    const { diff, current } = e
    this.scroll = current
    this.direction = diff > 0 ? 'down' : 'up'
    this.handleMenuBar()

    if (this.scroll > store.vh && !this.popupState) {
      gsap.to('.popup', { duration: 0.5, autoAlpha: 1 })
    }
  }

  handleMenuBar() {
    if (
      this.scroll > 100 &&
      this.direction == 'down' &&
      !this.state.header &&
      !store.sniff.isDevice
    ) {
      if (this.state.animate) return

      this.state.animate = true
      gsap.to(this.header, {
        duration: 0.6,
        autoAlpha: 0,
        onComplete: () => {
          this.state.animate = false
        },
      })

      this.state.header = true
    }

    if (this.direction == 'up' && this.state.header) {
      if (this.state.animate) return

      this.state.animate = true

      gsap.to(this.header, {
        duration: 0.6,
        autoAlpha: 1,
        onComplete: () => {
          this.state.animate = false
        },
      })
      this.state.header = false
    }

    if (this.rectHero) {
      const h = this.rectHero.height

      if (this.scroll > h) {
        this.header.classList.remove('-stone')
        this.header.classList.add('-kelp')
      } else {
        this.header.classList.remove('-kelp')
        this.header.classList.add('-stone')
      }
    }
  }

  smooth() {
    const smooth = qsa('[data-smooth-item]', this.el)
    store.scroll.setScrollBounds()
    SmoothScroll.init(smooth)
  }

  onLeave() {
    this.off()
    SmoothScroll && SmoothScroll.off()
    this.video && this.video.destroy()
    this.forms && this.forms.destroy()
    store.flags.locked = true
    if (store.sniff.isDevice) store.body.classList.add('is-fixed')
  }

  onLeaveCompleted() {
    ScrollTrigger.getAll().forEach((inst) => inst.kill(true))
  }
}

export default Default
