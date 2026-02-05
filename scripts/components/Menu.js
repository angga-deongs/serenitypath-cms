import { qsa, bindAll } from '../utils'
import gsap from 'gsap'

export default class Menu {
  constructor(obj = {}) {
    bindAll(this, 'openMenu', 'closeMenu')

    const desktopMenu = obj.desktopMenu
    const mobileMenu = obj.mobileMenu
    const footer = obj.footer
    const url = obj.url

    this.dom = {
      open: obj.open,
      close: obj.close,
      desktop: {
        el: desktopMenu,
        links: desktopMenu ? qsa('a', desktopMenu) : null,
      },
      mobile: {
        el: mobileMenu,
        links: mobileMenu ? qsa('a', mobileMenu) : null,
      },
      footer: {
        links: footer ? qsa('a', footer) : null,
      },
      url: url,
    }

    this.init()
  }

  events() {
    const { open, close } = this.dom
    open && open.addEventListener('click', this.openMenu)
    close && close.addEventListener('click', this.closeMenu)
  }

  updateMenu(url) {
    if (!url) return

    const { desktop, mobile, footer } = this.dom
    const location = url

    desktop.links.forEach((link) => {
      link.parentNode.classList.remove('-active')
      if (link.href === location) {
        link.parentNode.classList.add('-active')
      }
    })

    mobile.links.forEach((link) => {
      link.parentNode.classList.remove('-active')
      if (link.href === location) {
        link.parentNode.classList.add('-active')
      }
    })

    footer.links.forEach((link) => {
      link.parentNode.classList.remove('-active')
      if (link.href === location) {
        link.parentNode.classList.add('-active')
      }
    })
  }

  openMenu() {
    const { mobile } = this.dom
    const menu = mobile.el

    gsap.set(menu, { autoAlpha: 1 })
    gsap.fromTo(
      menu,
      { y: '101%' },
      { duration: 0.5, y: '0%', ease: 'power3.inOut' },
    )

    gsap.from('.menu-item', {
      duration: 0.8,
      autoAlpha: 0,
      stagger: 0.08,
      y: 20,
      delay: 0.3,
    })
  }

  closeMenu() {
    const { mobile } = this.dom
    const menu = mobile.el

    gsap.fromTo(
      menu,
      { y: '0%' },
      {
        duration: 0.5,
        y: '101%',
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(menu, { autoAlpha: 0 })
        },
      },
    )
  }

  init() {
    this.updateMenu(this.dom.url)
    this.events()
  }
}
