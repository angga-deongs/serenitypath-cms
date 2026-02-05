import store from '../store'
import { Renderer, Camera, Geometry, Program, Transform, Mesh } from 'ogl'
import { bindAll } from '../utils'
import { Emitter } from '../events'

const vertex = /* glsl */ `
attribute vec2 uv;
attribute vec3 position;
attribute vec4 random;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform float uSize;
uniform float uTime;
varying vec3 pos;

#pragma glslify: noise = require(glsl-noise/simplex/3d) 

 void main() {
    
    pos = position * 2.0 - 1.0;
    vec4 mPos = vec4(pos, 1.0);

    //mPos.z *=5.;

    float t = uTime * 1.6;
    mPos.x += sin(t * random.z + 16.28 * random.w) * mix(0.1, 2.5, random.x);
    mPos.y += sin(t * random.y + 16.28 * random.x) * mix(0.1, 2.5, random.w);
    mPos.z += sin(t * random.w + 16.28 * random.y) * mix(0.1, 2.5, random.z);
    
    vec4 mvPos = viewMatrix * mPos;
    gl_PointSize = uSize / length(mvPos.xyz) * random.x * 10.; //* (random.x + 0.1);
    gl_Position = projectionMatrix * mvPos;
}
  `

const fragment = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uAlpha;
varying vec3 pos;

vec3 toRGB(vec3 color) {
  return vec3(color.r/255., color.g/255., color.b/255.);
}

float circulito (vec2 uv, vec2 pos, float r, float blur) {

  float d = length(uv + pos);
  float c = smoothstep(r, r - blur, d);
  return c;
} 

void main() {
    vec2 uv = gl_PointCoord.xy;
    vec3 cv = pos;
    
    vec3 color = toRGB(uColor1);
    vec3 color2 = toRGB(uColor2);
    vec3 color3 = toRGB(uColor3);

    color = mix(color, color2, cv.x);
    color = mix(color, color3, cv.y);
    float d = length(uv - 0.5);
    float circle = step(d, 0.3);
    
    gl_FragColor = vec4(color, circle * uAlpha);

}
`

export default class Particles {
  constructor(obj = {}) {
    const container = obj.container
    const amount = obj.amount

    bindAll(this, 'run', 'resize')

    this.dom = {
      container,
    }

    this.settings = {
      amount,
    }

    this.particle = {}

    this.time = 0
    this.init()
  }

  setup() {
    const { container } = this.dom

    const renderer = new Renderer({ dpr: 2, alpha: true })
    const gl = renderer.gl
    const camera = new Camera(gl, { fov: 35 })
    const scene = new Transform()
    const aspectRatio = store.vw / store.vh

    gl.clearColor(231 / 255, 228 / 255, 223 / 255, 0)
    camera.position.set(0, 0, 7)
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

    gl.canvas.classList.add('gl-particles')

    container.appendChild(gl.canvas)
  }

  addParticles() {
    const { amount } = this.settings
    const { gl, scene } = this.ogl

    const position = new Float32Array(amount * 3)
    const random = new Float32Array(amount * 4)

    for (let i = 0; i < amount; i++) {
      position.set([Math.random(), Math.random(), Math.random()], i * 3)
      random.set(
        [Math.random(), Math.random(), Math.random(), Math.random()],
        i * 4,
      )
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: position },
      random: { size: 4, data: random },
    })

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 10 },
        uColor1: { value: [62, 50, 39] },
        uColor2: { value: [218, 204, 183] },
        uColor3: { value: [227, 207, 188] },
        uAlpha: { value: 0.7 },
      },
      transparent: true,
      depthTest: false,
    })

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program })

    particles.setParent(scene)

    Object.assign(this.particle, {
      particles,
      program,
    })
  }

  run() {
    const { renderer, camera, scene } = this.ogl
    const { particles, program } = this.particle
    this.time += 1 / 300
    particles.rotation.x = Math.sin(this.time * 0.05) * 1.2
    particles.rotation.y = Math.cos(this.time * 0.05) * 1.15
    particles.rotation.z += 0.005
    program.uniforms.uTime.value = this.time
    renderer.render({ scene, camera })
  }

  on() {
    Emitter.on('tick', this.run)
    Emitter.on('GlobalResize', this.resize)
  }

  off() {
    Emitter.off('tick', this.run)
    Emitter.off('GlobalResize', this.resize)
  }

  resize() {
    const aspectRatio = store.vw / store.vh

    this.ogl.camera.perspective({
      aspect: aspectRatio,
    })

    this.ogl.renderer.setSize(store.vw, store.vh)
  }

  destroy() {
    this.off()
  }

  init() {
    this.setup()
    this.addParticles()
    this.on()
  }
}
