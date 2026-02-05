import store from '../../store'
import Highway from '@dogstudio/highway'
import { gsap } from 'gsap'

export default class Fade extends Highway.Transition {
  in({ from, to, done }) {
    const tl = gsap.timeline({ paused: true })

    window.scrollTo(0, 0)
    store.body.scrollTo(0, 0)
    store.raf.setScroll(0)
    from.remove()
    done()
    let time = 0.1

    if (!store.sniff.isDesktop) time = 0.5

    tl.fromTo(to, { autoAlpha: 1 }, { duration: time, autoAlpha: 1 })
    tl.play()
  }

  out({ from, done }) {
    const preload = store.preload.scene.objects
    const progress = preload.children[0].program.uniforms.uProgress

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => done(),
    })

    let time = 0.1

    if (!store.sniff.isDesktop) time = 0.5

    tl.to(progress, { duration: 1.5, value: 4, ease: 'power3.in' })
    tl.fromTo(from, { autoAlpha: 1 }, { duration: time, autoAlpha: 1 }, '-=1.5')

    tl.play()
  }
}
