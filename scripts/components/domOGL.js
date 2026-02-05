import store from '../store'
import { bounds, updateSize, updateX, updateY, bindAll } from '../utils'
import { Emitter } from '../events'
import { Planes, FBO } from '.'
import { Renderer, Camera, Transform } from 'ogl'

export default class domOGL {
  constructor(obj = {}) {
    const textures = obj.textures
    const container = obj.container
    bindAll(this, 'run', 'resize', 'update')

    store.planes = []

    this.dom = {
      textures: textures,
      container: container,
      planes: [],
      total: 0,
    }

    this.state = {
      current: 0,
      scroll: 0,
      threshold: 100,
      isResizing: false,
      clock: 0,
    }

    this.time = 0
    this.init()
  }

  setup() {
    const { container } = this.dom

    const renderer = new Renderer({ dpr: 2, alpha: true, depth: false })
    const gl = renderer.gl
    const camera = new Camera(gl, { fov: 35 })
    const scene = new Transform()
    const aspectRatio = store.vw / store.vh

    gl.clearColor(1, 1, 1, 0)
    camera.position.set(0, 0, 5)
    camera.lookAt([0, 0, 0])
    camera.perspective({
      aspect: aspectRatio,
    })

    renderer.setSize(store.vw, store.vh)

    this.ogl = {
      renderer: renderer,
      gl: gl,
      camera: camera,
      scene: scene,
      texture: false,
    }

    gl.canvas.classList.add('gl-dom')
    container.appendChild(gl.canvas)
  }

  updatePlanes() {
    if (!this.dom.planes || this.state.isResizing) return

    const { camera } = this.ogl
    const { textures } = this.dom
    const { current } = this.state
    const aspectRatio = store.vw / store.vh

    if (textures.length == 0) return

    textures.forEach((texture, i) => {
      const rect = bounds(texture)
      const scale = updateSize(rect, camera, aspectRatio)
      const posX = updateX(rect, scale)
      const posY = updateY(rect, scale, -current)
      this.dom.planes[i].rect = rect
      this.dom.planes[i].scale = scale
      this.dom.planes[i].plane.mesh.scale.set(scale.size.x, scale.size.y, 1)
      this.dom.planes[i].plane.mesh.position.x = posX.x
      this.dom.planes[i].plane.mesh.position.y = posY.y
    })
  }

  getPlanes() {
    const { gl, camera, scene } = this.ogl
    const { textures } = this.dom
    const aspectRatio = store.vw / store.vh
    const { current } = this.state

    if (textures.length == 0) return

    this.dom.total = textures.length - 1

    textures.forEach((texture, i) => {
      const cache = []
      const rect = bounds(texture)
      const scale = updateSize(rect, camera, aspectRatio)
      const posX = updateX(rect, scale)
      const posY = updateY(rect, scale, -current)
      const dataset = texture.dataset.plane
      const img = texture.nextSibling
      let data

      data = new Planes({
        gl: gl,
        texture: img.src,
      })

      // if (dataset == 'fbo') {
      //   data = new FBO({
      //     gl: gl,
      //   })
      // } else {
      //   data = new Planes({
      //     gl: gl,
      //     texture: img.src,
      //   })
      // }

      cache.el = texture
      cache.rect = rect
      cache.plane = data.plane
      cache.scale = scale
      cache.plane.mesh.scale.set(scale.size.x, scale.size.y, 1)
      if (dataset == 'fbo') {
        cache.plane.mesh.position.set(posX.x, posY.y, 1)
      } else {
        cache.plane.mesh.position.set(posX.x, posY.y, 1)
      }

      cache.plane.mesh.setParent(scene)
      cache.speed = 1 // Need to update if parallax
      cache.plane.program.uniforms.uSize.value.x = scale.size.x
      cache.plane.program.uniforms.uSize.value.y = scale.size.y
      this.dom.planes.push(cache)
    })
  }

  movePlanes() {
    if (this.state.isResizing) return

    const { total, planes } = this.dom
    const { current } = this.state

    for (let i = 0; i <= total; i++) {
      const { plane, rect, scale } = planes[i]
      const { position, program } = plane
      if (!plane.mesh) return

      if (position) {
        position.render()
        position.passes[0].uniforms.uTime.value = this.time
        program.uniforms.uTime.value = this.time
        program.uniforms.positionTexture.value = position.uniform.value
      }

      const isVisible = this.isVisible(rect)
      const positionY = updateY(rect, scale, -current)
      plane.mesh.position.y = -positionY.y

      if (isVisible && !this.state.isResizing) {
        if (!plane.status && plane.timeline) {
          plane.timeline.play()
          plane.status = true
        }
      }
    }
  }

  isVisible({ top, bottom }) {
    const { current } = this.state
    const start = top - store.vh / 1.5
    const end = bottom + store.vh
    const isVisible = current > start && current < end
    return isVisible
  }

  run(e) {
    const { renderer, camera, scene } = this.ogl

    this.time += 1 / 60
    this.state.current = store.currentSmooth
    this.state.scroll = e.current
    this.state.diff = e.diff
    this.movePlanes()
    renderer.render({ scene, camera })
  }

  on() {
    Emitter.on('tick', this.run)
    Emitter.on('GlobalResize', this.resize)
    Emitter.on('smooth:resize', this.update)
  }

  off() {
    Emitter.off('tick', this.run)
    Emitter.off('GlobalResize', this.resize)
    Emitter.off('smooth:resize', this.update)
  }

  update() {
    this.updatePlanes()
  }

  resize() {
    this.state.isResizing = true
    const aspectRatio = store.vw / store.vh

    this.ogl.camera.perspective({
      aspect: aspectRatio,
    })

    this.ogl.renderer.setSize(store.vw, store.vh)
    this.state.isResizing = false
  }

  destroy() {
    this.off()
    this.dom = null
    this.state = null
  }

  init() {
    this.setup()
    this.getPlanes()
    this.on()
  }
}
