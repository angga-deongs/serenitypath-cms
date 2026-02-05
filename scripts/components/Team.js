import { SwiperTeam, SmoothScroll } from '.'
import { bindAll, qs, qsa, Distance, Scale } from '../utils'
import gsap from 'gsap'
import { Emitter } from '../events'

export default class Team {
  constructor() {
    bindAll(this, 'open', 'close', 'resize')

    this.dom = {
      teamList: qs('.team-list'),
      teamSlider: qs('.team-slider'),
      teamItems: qsa('.team-list .team-item'),
      sliderItems: qsa('.team-slider .team-item'),
      right: qs('.team-slider .controls-right'),
      left: qs('.team-slider .controls-left'),
      button: qs('.team-close'),
      items: {
        items0: qsa('.item-0 .team-inner'),
        items1: qsa('.item-1 .team-inner'),
        items2: qsa('.item-2 .team-inner'),
        items3: qsa('.item-3 .team-inner'),
        items4: qsa('.item-4 .team-inner'),
      },
    }

    this.init()
  }

  setup() {
    const { items, teamSlider, left, right } = this.dom
    const doc = qs('[data-doc]')
    const nr = doc ? parseInt(doc.dataset.doc) : false
    const id = nr ? nr : 0

    this.gridData = []
    this.sliderData = []

    if (teamSlider) {
      const { items0, items1, items2, items3, items4 } = items
      this.swiperTeam = new SwiperTeam({
        container: teamSlider,
        multiple: [items0, items1, items2, items3, items4],
        left,
        right,
      })

      this.swiperTeam.swipeSet(id)
    }
  }

  on() {
    const { button, teamItems } = this.dom
  }

  off() {
    const { button, teamItems } = this.dom
  }

  open(e) {
    const { teamItems, button, teamSlider, teamList, sliderItems } = this.dom
    const target = e.target
    const index = parseInt(target.dataset.index)
    const centerList = teamItems[2]
    const centerSlider = qs('.item-center')
    const largeImage = qs('.item-2')

    gsap.set(target, { zIndex: 2 })
    gsap.set(largeImage, { zIndex: 2 })

    this.swiperTeam && this.swiperTeam.swipeSet(index)
    gsap.set(teamSlider, {
      display: 'block',
      autoAlpha: 1,
      position: 'absolute',
    })

    teamItems.forEach((item) => {
      const info = qs('.team-info', item)
      // const { dist } = this.gridData[i]
      gsap.to(info, { duration: 0.3, autoAlpha: 0 })
      const dist = Distance(item, centerSlider)

      gsap.to(item, {
        duration: 0.5,
        delay: 0.2,
        x: dist.dx,
        y: dist.dy,
        stagger: 0.01,
        ease: 'powe3.out',
        onComplete: () => {
          gsap.set(teamList, { position: 'absolute' })
          gsap.set(teamSlider, { position: 'relative' })
          gsap.set(teamList, { display: 'none' })
          gsap.to(button, { duration: 0.5, autoAlpha: 1, delay: 0.5 })
        },
      })
    })

    const scale = Scale(sliderItems[2], centerList)
    gsap.set(sliderItems[2], {
      scale: scale.wScale,
      transformOrigin: 'top left',
    })

    sliderItems.forEach((item, i) => {
      const els = qsa('.team-inner', item)
      //const { dist, scale } = this.sliderData[i]
      const dist = Distance(item, centerSlider)

      els.forEach((el) => {
        const info = qs('.team-info', el)
        gsap.set(info, { autoAlpha: 0 })
      })

      if (i == 2) {
        gsap.to(item, {
          duration: 0.5,
          scale: 1,
          delay: 0.7,
          ease: 'powe3.out',
        })
      }

      gsap.from(item, {
        duration: 0.5,
        delay: 0.7,
        x: dist.dx,
        y: dist.dy,
        ease: 'powe3.out',
        onComplete: () => {
          gsap.set(target, { clearProps: 'zIndex' })
          gsap.fromTo(
            '.team-inner .team-info',
            {
              y: 10,
              autoAlpha: 0,
            },
            {
              duration: 0.5,
              autoAlpha: 1,
              //delay: 0.1,
              y: 0,
              stagger: 0.005,
            },
          )

          gsap.fromTo(
            '.team-inner.-active .char-1',
            {
              y: '101%',
            },
            {
              duration: 0.5,
              y: 0,
              delay: 0.3,
              stagger: 0.02,
            },
          )

          SmoothScroll.update()
          SmoothScroll.resize()
        },
      })
    })
  }

  close() {
    const { teamItems, button, sliderItems, teamSlider, teamList } = this.dom
    const centerSlider = qs('.item-center')
    //const scale = this.sliderData[2].scale
    const scale = Scale(sliderItems[2], centerSlider)
    const active = qs('.team-inner.-active')
    const index = parseInt(active.dataset.index)
    const largeImage = qs('.item-2')

    gsap.set(teamItems[index], { zIndex: 2 })
    gsap.set(teamSlider, { zIndex: 4 })
    gsap.set(largeImage, { scale: scale.wScale })
    gsap.set(teamSlider, { position: 'absolute' })
    gsap.set(teamList, {
      display: 'grid',
      autoAlpha: 1,
      position: 'relative',
    })

    gsap.to(button, { autoAlpha: 0 })

    //  gsap.set(teamList, { zIndex: 5, delay: 0.45 })

    sliderItems.forEach((item, i) => {
      const els = qsa('.team-inner', item)
      //const { dist } = this.sliderData[i]
      const dist = Distance(item, centerSlider)

      els.forEach((el) => {
        const info = qs('.team-info', el)
        gsap.set(info, { autoAlpha: 0 })
      })

      if (i == 2) {
        gsap.from(item, { duration: 0.6, scale: 1 })
      }

      gsap.to(item, {
        duration: 0.5,
        x: dist.dx,
        y: dist.dy,
        ease: 'powe3.out',
        onComplete: () => {
          gsap.set(teamSlider, { display: 'none' })
          SmoothScroll.update()
          SmoothScroll.resize()
        },
      })
    })

    teamItems.forEach((item) => {
      gsap.to(item, {
        duration: 0.5,
        delay: 0.49,
        x: 0,
        y: 0,
        ease: 'powe3.out',
        onComplete: () => {
          gsap.set(largeImage, { clearProps: 'all' })
          gsap.set(teamSlider, { clearProps: 'all' })
          gsap.set(sliderItems, { clearProps: 'all' })
          gsap.set(teamItems, { clearProps: 'all' })
          gsap.fromTo(
            '.team-list .team-info',
            {
              autoAlpha: 0,
              y: 10,
            },
            {
              duration: 0.35,
              autoAlpha: 1,
              y: 0,
              stagger: 0.01,
              delay: 0.15,
            },
          )
          this.swiperTeam && this.swiperTeam.clear()
        },
      })
    })
  }

  resize() {
    const { teamItems, sliderItems } = this.dom
    const centerList = teamItems[2]
    const centerSlider = qs('.item-center')

    this.gridData = []
    this.sliderData = []

    teamItems.forEach((item) => {
      const dist = Distance(item, centerList)
      const scale = Scale(item, centerList)
      const obj = {
        el: item,
        dist,
        scale,
      }

      this.gridData.push(obj)
    })

    sliderItems.forEach((item) => {
      const dist = Distance(item, centerList)
      const scale = Scale(item, centerList)

      const obj = {
        el: item,
        dist,
        scale,
      }

      this.sliderData.push(obj)
    })
  }

  destroy() {
    this.off()
    this.swiperTeam && this.swiperTeam.destroy()
  }

  init() {
    this.setup()
    this.on()
  }
}
