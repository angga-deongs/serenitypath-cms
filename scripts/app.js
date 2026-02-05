import store from './store'
import HController from './highway/HController'
import FontFaceObserver from 'fontfaceobserver'
import { Resize, RafController, Scroll, Mouse, Emitter } from './events'
import { Preload } from './components'
import { Grid } from './utils'
import lazySizes from 'lazysizes'
lazySizes.cfg.lazyClass = 'lazy'
lazySizes.cfg.loadedClass = 'loaded'

export default class App {
  constructor() {
    console.log(
      `%c${store.title} \nMade with ❤️ by ${store.author} \n↳ ${store.link}`,
      'color: #342f2f',
    )

    const grid = new Grid({
      background: '#a25b4c',
      desktop: {
        columns: 18,
      },
      mobile: {
        columns: 4,
        gutter: 27,
        size: 390,
      },
    })

    grid.addGrid()

    const fontA = new FontFaceObserver('Scto Grotesk', 10000)
    const fontB = new FontFaceObserver('Ivar Display', 10000)

    store.highway = new HController()
    store.raf = new RafController()
    store.mouse = new Mouse()
    store.scroll = new Scroll({
      smooth: store.sniff.isDesktop,
    })

    store.resize = new Resize()
    store.resize.on()
    store.preload = new Preload()

    Promise.all([fontA.load(), fontB.load()]).then(() => {
      this.onload()
    })

    store.raf.on()
    store.raf.setScrollTrigger()
    store.scroll.on()
    store.mouse.on()
  }

  onload() {
    store.resize.onResize()
    store.loaded = true
    Emitter.emit('fontLoaded')
  }
}
