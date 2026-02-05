import store from '../store'
import { Emitter } from '../events'
import { Renderer, Camera, Transform, Program, Plane, Mesh } from 'ogl'
import { qs, bounds, viewSize, updateSize } from '../utils'

const vertex = `
attribute vec2 uv;
attribute vec3 position;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
varying vec2 vUv;


void main() {
  vUv = uv;  
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`

const fragment = `
precision mediump float;
varying vec2 vUv;
uniform float uProgress;
uniform float uMagnitud;
uniform int uType;
uniform float uTime;
uniform vec2 uOffset;

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
  {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
  }


float hash12(vec2 p) {
  float h = dot(p,vec2(127.1,311.7));	
  return fract(sin(h)*43758.5453123);
}

vec3 toRGB(vec3 color) {
  return vec3(color.r/255., color.g/255., color.b/255.);
}

void main() {

  vec2 uv = vUv;
  vec2 size = uv;
  vec3 dColor = toRGB(vec3(231., 228., 223.));
  vec3 tColor = vec3(0.51, 1., 0.1);
  float hash =  1. + hash12(uv);
  float distortion = 1.;
  float back = 8.;

  back -= uProgress;

  //vec3 tex = toRGB(vec3(40., 40., 40.));

  float offx = uOffset.x * uv.x + sin(uv.y + uTime * .1);
  float offy = uOffset.y * uv.y - uTime * 0.1 - cos(uTime * .001) * .01;

   if(uType==0) {
      //distortion = (back * uProgress) + snoise(vec3(offx , offy, uTime * .6) * uMagnitud)  * 10. * uProgress;

      distortion = (back * uProgress) + snoise(vec3(offx , offy, uTime * .6) * uMagnitud)  * 10. * uProgress;
   }

  float norm = smoothstep(1.4, 12. * hash, distortion + uProgress * 10.);
  //vec3 fColor = mix(dColor, tex, norm);

  gl_FragColor = vec4(vec3(dColor), norm);
}
`

export default class Preload {
  constructor(obj = {}) {
    const container = obj.container || store.body

    this.scene = {
      name: 'Default',
      renderer: null,
      camera: null,
      objects: null,
      orbit: null,
      container,
    }

    this.time = 0
    this.init()
  }

  setup() {
    this.render()
    this.camera()
    this.mesh()
    //store.webgl.scenes.push(this.scene)
  }

  render() {
    const { container } = this.scene
    const { vw, vh } = store
    const renderer = new Renderer({ dpr: 2, alpha: true })
    const gl = renderer.gl

    gl.clearColor(0, 0, 0, 0)
    gl.canvas.classList.add('gl-preload')
    renderer.setSize(vw, vh)
    container.appendChild(gl.canvas)

    Object.assign(this.scene, {
      renderer,
    })
  }

  camera() {
    const { vw, vh } = store
    const { renderer } = this.scene
    const { gl } = renderer
    const camera = new Camera(gl, { fov: 35 })
    const aspectRatio = vw / vh

    camera.position.set(0, 0, 7)
    camera.lookAt([0, 0, 0])
    camera.perspective({
      aspect: aspectRatio,
    })

    Object.assign(this.scene, {
      camera,
    })
  }

  mesh() {
    const { renderer, camera } = this.scene
    const { vw, vh } = store
    const { gl } = renderer
    const objects = new Transform()
    const aspectRatio = vw / vh
    const planeGeometry = new Plane(gl)

    const program = new Program(gl, {
      vertex: vertex,
      fragment: fragment,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 4 },
        uType: { value: 0 },
        uMagnitud: { value: 2.4 },
        uOffset: { value: [1, 1] },
      },
      cullFace: null,
    })

    let distance = camera.position.z
    let vFov = (camera.fov * Math.PI) / 180
    let height = 2 * Math.tan(vFov / 2) * distance
    let width = height * aspectRatio

    const plane = new Mesh(gl, { geometry: planeGeometry, program: program })
    plane.scale.set(width, height)
    plane.name = 'Plane'
    plane.setParent(objects)

    Object.assign(this.scene, {
      objects,
    })
  }

  tick = () => {
    const { renderer, camera, objects, orbit } = this.scene

    this.time += 1 / 300
    objects.children.forEach((obj) => {
      obj.program.uniforms.uTime.value = this.time
    })

    renderer.render({ scene: objects, camera: camera })
  }

  on() {
    Emitter.on('tick', this.tick)
    Emitter.on('GlobalResize', this.resize)
  }

  off() {
    Emitter.off('tick', this.tick)
    Emitter.off('GlobalResize', this.resize)
  }

  resize = () => {
    const { vw, vh } = store
    const { objects, camera } = this.scene
    const aspectRatio = vw / vh
    this.scene.camera.perspective({
      aspect: aspectRatio,
    })

    let distance = camera.position.z
    let vFov = (camera.fov * Math.PI) / 180
    let height = 2 * Math.tan(vFov / 2) * distance
    let width = height * aspectRatio

    objects.children.forEach((obj) => {
      obj.scale.set(width, height)
    })

    this.scene.renderer.setSize(vw, vh)
  }

  destroy() {
    this.off()
  }

  init() {
    this.setup()
    this.on()
    this.resize()
  }
}
