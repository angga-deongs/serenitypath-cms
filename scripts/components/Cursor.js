import store from '../store'
import { Emitter } from '../events'
import { bindAll, lerp } from '../utils'
import gsap from 'gsap'

class CursorShape {
  constructor(obj = {}) {
    const canvas = obj.canvas
    const ctx = obj.ctx
    const colors = obj.colors
    const type = obj.type
    const size = obj.size
    const position = obj.position
    const icons = obj.icons
    const alpha = obj.alpha

    this.cursor = {
      canvas,
      ctx,
      colors,
      type,
      size,
      position,
      icons,
      alpha,
    }

    this.setup()
  }

  setup() {
    const { ctx, type } = this.cursor
    let cursor

    if (type == 'link') {
      cursor = this.getLink()
    }

    if (type == 'drag') {
      cursor = this.getDrag()
    }

    return cursor
  }

  getLink() {
    const { canvas, ctx, colors, size, position, icons } = this.cursor

    const w = canvas.width
    const h = canvas.height
    const radius = size.w / 2

    ctx.clearRect(0, 0, w, h)
    ctx.beginPath()
    ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
    ctx.fill()
    if (icons.arrow) {
      ctx.drawImage(
        icons.arrow,
        position.x - radius / 4,
        position.y - radius / 4,
        radius / 2,
        radius / 2,
      )
    }

    return ctx
  }

  getDrag() {
    const { canvas, ctx, colors, size, position, icons, alpha } = this.cursor

    const w = canvas.width
    const h = canvas.height
    const radius = size.w / 2

    ctx.clearRect(0, 0, w, h)
    ctx.beginPath()
    ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = colors.kelp
    ctx.fill()

    if (icons.drag) {
      ctx.drawImage(
        icons.drag,
        position.x - 34,
        position.y - 4,
        68 * alpha,
        8 * alpha,
      )

      ctx.fillStyle = `rgba(231, 228, 223, ${1 * alpha})`
      ctx.font = '14px Scto Grotesk'
      ctx.fillText('Drag', position.x - 18, position.y + 3)
    }

    return ctx
  }
}

export default class Cursor {
  constructor(obj = {}) {
    bindAll(this, 'run', 'enter', 'leave', 'resize')

    const container = obj.container
    const cursors = obj.cursors

    this.dom = {
      cursors,
      container,
      areas: [],
    }

    this.settings = {
      last: {
        x: 0,
        y: 0,
      },
      ease: 0.12,
      alpha: 0,
      animating: false,
    }

    this.state = {
      on: false,
    }

    this.init()
  }

  setup() {
    const { vw, vh } = store
    const { container } = this.dom

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const arrow = new Image()
    const drag = new Image()
    const scale = window.devicePixelRatio || 1

    ctx.clearRect(0, 0, vw, vh)

    // This could vary per project
    const colors = {
      kelp: '#3c4e3d',
      fern: '#607663',
      rust: '#a25b4c',
      stone: '#e7e4df',
      white: 'white',
    }

    const size = {
      w: 0,
      h: 0,
    }

    canvas.classList.add('cursor')
    canvas.width = vw * scale
    canvas.height = vh * scale

    this.canvas = {
      canvas,
      ctx,
      colors,
      size,
      icons: {},
    }

    arrow.onload = () => {
      this.canvas.icons.arrow = arrow
    }

    drag.onload = () => {
      this.canvas.icons.drag = drag
    }

    arrow.src = '/images/arrow.svg'
    drag.src = '/images/drag.svg'

    container.appendChild(canvas)
  }

  getCursors() {
    const { cursors } = this.dom
    const { canvas, ctx, colors, size } = this.canvas

    cursors.forEach((area) => {
      const type = area.dataset.cursor

      const obj = {
        area,
        type,
      }

      this.dom.areas.push(obj)
    })
  }

  updateCursor() {
    const { canvas, ctx, colors, size, icons } = this.canvas

    this.dom.areas.forEach((area) => {
      const cursor = new CursorShape({
        position: this.settings.last,
        canvas,
        colors,
        ctx,
        type: area.type,
        size,
        icons,
        alpha: this.settings.alpha,
      })
    })
  }

  run({ mouse }) {
    this.settings.last.x = lerp(this.settings.last.x, mouse.x, 0.1)
    this.settings.last.y = lerp(this.settings.last.y, mouse.y, 0.1)

    const target = mouse.target

    if (target) {
      const cls = target.classList

      if (cls.value.includes('button')) {
        gsap.set(this.canvas.size, { w: 0, h: 0 })
        gsap.set(this.settings, { alpha: 0 })
      } else {
        if (this.state.on) {
          gsap.set(this.canvas.size, { w: 120, h: 120 })
          gsap.set(this.settings, { alpha: 1 })
        }
      }
    }

    this.updateCursor()
  }

  enter(e, i) {
    this.state.on = true

    gsap.to(this.canvas.size, {
      duration: 1,
      w: 120,
      h: 120,
      ease: 'elastic.out(1.5, 1)',
    })

    gsap.to(this.settings, { duration: 0.8, alpha: 1, ease: 'power4.out' })
  }

  leave() {
    gsap.to(this.canvas.size, {
      duration: 1,
      w: 0,
      h: 0,
      ease: 'power4.inOut',
    })

    gsap.to(this.settings, { duration: 0.7, alpha: 0, ease: 'power4.in' })

    this.state.on = false
  }

  on() {
    Emitter.on('tick', this.run)
    Emitter.on('GlobalResize', this.resize)
    this.dom.areas.forEach((el, i) => {
      el.area.addEventListener('mouseenter', (e) => this.enter(e, i))
      el.area.addEventListener('mouseleave', (e) => this.leave(e, i))
    })
  }

  off() {
    Emitter.off('tick', this.run)
    Emitter.off('GlobalResize', this.resize)
    this.dom.areas.forEach((el, i) => {
      el.area.removeEventListener('mouseenter', (e) => this.enter(e, i))
      el.area.removeEventListener('mouseleave', (e) => this.leave(e, i))
    })
  }

  resize() {
    this.canvas.canvas.width = store.vw
    this.canvas.canvas.height = store.vh
  }

  destroy() {
    this.off()
    this.cursor = null
  }

  init() {
    this.setup()
    this.getCursors()
    this.on()
  }
}
