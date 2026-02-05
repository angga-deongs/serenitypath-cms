import store from '../store'
import { Vec2, Plane, Program, Mesh, Texture } from 'ogl'
import { vertex } from '../glsl/vertex'
import { fragment } from '../glsl/fragment'
import gsap from 'gsap'

export default class Planes {
  constructor(obj = {}) {
    const gl = obj.gl
    const texture = obj.texture
    this.plane = {}

    this.ogl = {
      gl: gl,
      texture: texture,
    }

    this.setup()
  }

  setup() {
    const { gl, texture } = this.ogl

    const tex = new Texture(gl, {
      generateMipmaps: false,
      minFilter: gl.LINEAR,
    })

    const tl = gsap.timeline({ paused: true })

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = texture

    img.decode().then(() => {
      tex.image = img
      program.uniforms.uSize.value.x = img.naturalWidth
      program.uniforms.uSize.value.y = img.naturalHeight
    })

    const geometry = new Plane(gl, {
      widthSegments: 32,
      heightSegments: 32,
    })

    const program = new Program(gl, {
      vertex: vertex,
      fragment: fragment,
      transparent: true,
      uniforms: {
        uTexture: { value: tex },
        uTime: { value: 0 },
        uDiff: { value: 0 },
        uScale: { value: 1 },
        uAlpha: { value: 0 },
        uScaleChange: { value: 0.9 },
        uRes: { value: new Vec2(store.vw, store.vh) },
        uOffset: { value: new Vec2(0, 0) },
        uSize: { value: new Vec2(0, 0) },
        uPlaneSizes: { value: new Vec2(0, 0) },
        uType: { value: 1 },
      },
    })

    const mesh = new Mesh(gl, {
      geometry: geometry,
      program: program,
    })

    tl.to(program.uniforms.uScale, { duration: 1.5, value: 0 })

    this.plane.geometry = geometry
    this.plane.program = program
    this.plane.mesh = mesh
    this.plane.texture = tex
    this.plane.timeline = tl
    this.plane.status = false

    return this.plane
  }
}
