import Highway from '@dogstudio/highway'
import { Page } from './renders'
import { Fade } from './transitions'
import store from '../store'

import Particles from '../components/Particles'

export default class HController {
  constructor() {
    store.H = new Highway.Core({
      renderers: {
        page: Page,
      },
      transitions: {
        default: Fade,
        contextual: {
          fade: Fade,
        },
      },
    })

    this.init()
  }

  on() {
    store.H.on('NAVIGATE_END', ({ from, to, location }) => {
      if (typeof gtag !== 'undefined') {
        gtag('js', new Date())
        gtag('config', 'G-CQ8JZJNCB4', {
          page_path: location.pathname,
          page_title: to.page.title,
          page_location: location.href,
        })
      }
    })
  }

  addParticles() {
    if (store.sniff.isDesktop) {
      new Particles({
        container: store.body,
        amount: 100,
      })
    }
  }

  init() {
    this.on()
    this.addParticles()
  }
}
