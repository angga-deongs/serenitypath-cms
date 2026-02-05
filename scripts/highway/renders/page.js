import store from '../../store'
import Default from './default'
import { Emitter } from '../../events'
import {
  domOGL,
  Cursor,
  SwiperFade,
  SwiperFlip,
  Team,
  Splits,
} from '../../components'
import { qs, qsa, bindAll, bounds } from '../../utils'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

class Page extends Default {
  constructor(opt = {}) {
    super(opt)

    bindAll(this, 'openSlider', 'closeSlider', 'animations')
    this.slug = 'page'

    this.state = {
      animated: false,
    }
  }

  onEnter() {
    super.onEnter()
  }

  onEnterCompleted() {
    super.onEnterCompleted()
    this.animations()
  }

  on() {
    super.on()
    Emitter.on('fontLoaded', this.animations)
  }

  off() {
    super.off()
    Emitter.off('fontLoaded', this.animations)
  }

  dom() {
    super.dom()

    this.page = {
      planes: qsa('[data-plane]'),
      cursors: qsa('[data-cursor]'),
      sliderBlock: qs('.sliderBlock-images'),
      sliderText: qs('.sliderText'),
      largeImages: qsa('.-large .slider-asset'),
      smallImages: qsa('.-small .slider-asset'),
      allTexts: qsa('.-large .slider-content'),
      right: qs('.-large .controls-right'),
      left: qs('.-large .controls-left'),
      imgRight: qs('.sliderBlock-images .controls-right'),
      imgLeft: qs('.sliderBlock-images .controls-left'),
    }
  }

  components() {
    super.components()
    const { sniff, page } = store
    const {
      sliderText,
      largeImages,
      smallImages,
      allTexts,
      sliderBlock,
      cursors,
      planes,
      right,
      left,
      imgLeft,
      imgRight,
    } = this.page
    const p = planes.length
    const c = cursors.length

    if (sliderText) {
      this.swiperFade = new SwiperFade({
        container: sliderText,
        multiple: [largeImages, smallImages, allTexts],
        right,
        left,
      })
    }

    this.team = new Team()

    if (sliderBlock) {
      this.flip = new SwiperFlip({
        container: sliderBlock,
        single: qsa('.slider-item'),
        right: imgRight,
        left: imgLeft,
      })
    }

    if (sniff.isDesktop) {
      if (c !== 0) {
        this.cursor = new Cursor({
          container: page,
          cursors: cursors,
        })
      }

      if (p !== 0) {
        setTimeout(() => {
          this.domGL = new domOGL({
            container: page,
            textures: planes,
          })
        }, 0)
      }
    }
  }

  animations() {
    if (this.state.animated || !store.loaded) return
    this.splits = new Splits()

    setTimeout(() => {
      this.introAnim()
      this.scrollAnim()
    }, 100)

    setTimeout(() => {
      if (store.sniff.isSafari) {
        Emitter.emit('resize:smooth')
      }
    }, 2500)
  }

  introAnim() {
    this.hero = {
      title: qs('.hero-title .title-line'),
      lines: qsa('.hero .line-0'),
      chars: qsa('.hero .char-1'),
      asset: qs('.-full .hero-asset'),
      tags: qsa('.hero-tag'),
      description: qs('.hero-description'),
    }

    const { lines, asset, tags, description } = this.hero
    const tl = gsap.timeline({
      onComplete: () => {
        store.flags.locked = false
      },
    })
    const preload = store.preload.scene.objects
    const progress = preload.children[0].program.uniforms.uProgress

    this.state.animated = true

    gsap.set(store.page, { autoAlpha: 1 })

    tl.to(progress, { duration: 2, value: 0, ease: 'power2.out' })

    lines.forEach((line, i) => {
      const t = qs('.char-1', line)
        ? qsa('.char-1', line)
        : qsa('.char-2', line)
      const chars = t

      tl.from(
        chars,
        {
          duration: 0.6,
          autoAlpha: 0,
          stagger: {
            each: 0.04,
            from: 'random',
            grid: 'auto',
          },
          ease: 'power2.in',
        },
        `-=${1.6 - i * 0.3}`,
      )
    })

    if (tags[0])
      tl.from(
        tags,
        { duration: 0.5, autoAlpha: 0, y: 10, stagger: 0.1 },
        '-=0.8',
      )
    if (description)
      tl.from(description, { duration: 0.5, autoAlpha: 0, y: 10 }, '-=0.6')
    if (asset)
      tl.fromTo(
        asset,
        { autoAlpha: 0, y: '-18%' },
        { duration: 0.5, autoAlpha: 1, y: '-22%' },
        '-=0.5',
      )
  }

  scrollAnim() {
    const info = qs('.info')

    if (info) {
      const rectInfo = bounds(info)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: info,
          end: rectInfo.top,
          scrub: true,
          once: true,
        },
      })

      tl.to('.asset-back .cover', { duration: 0.4, scale: 1 })
      tl.to('.asset-top .cover', { duration: 0.4, scale: 1.13 }, '-=0.5')
    }

    const assets = qsa('.textblock-asset')

    if (assets.length !== 0) {
      assets.forEach((asset) => {
        const img = qs('.cover', asset)
        const crop = qs('.asset-crop', asset)

        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: asset,
            top: 'top 80%',
          },
        })

        tl2.from(asset, { duration: 1, y: 120, ease: 'powe3.in' })
        tl2.from(img, { duration: 1, y: '-100%', ease: 'powe3.in' }, '-=1')
        tl2.from(crop, { duration: 1, y: '100%', ease: 'powe3.in' }, '-=1')
      })
    }

    const assetBlock = qsa('.titleblock-asset')

    if (assetBlock.length !== 0) {
      const posY = store.sniff.isDevice ? 50 : 100

      gsap.to(assetBlock, {
        y: (i, target) => -posY * 1.05 * (i + 1),
        ease: 'none',
        scrollTrigger: {
          trigger: assetBlock,
          scrub: true,
          end: 'bottom -100%',
        },
      })
    }

    const accordion = qsa('.accordionBlock-doctor')

    if (accordion.length !== 0) {
      accordion.forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
          },
          duration: 0.8,
          autoAlpha: 0,
          scale: 1.05,
          y: '20%',
        })
      })
    }

    const splits = qsa('.splitblock-item')

    if (splits.length !== 0 && store.sniff.isDevice) {
      splits.forEach((item) => {
        const img = qs('.cover', item)

        gsap.from(img, {
          scrollTrigger: {
            trigger: item,
            end: 'end -100%',
            scrub: true,
          },
          scale: 1.2,
        })
      })
    }
  }

  onLeave() {
    super.onLeave()
    this.cursor && this.cursor.destroy()
    this.flip && this.flip.destroy()
    this.swiperFade && this.swiperFade.destroy()
    this.team && this.team.destroy()
  }

  onLeaveCompleted() {
    super.onLeaveCompleted()
    this.domGL && this.domGL.destroy()
  }
}

export default Page
