export const fragment = /* glsl */ `
precision mediump float;
uniform sampler2D uTexture;
//uniform float uDiff;
uniform float uScale;
uniform float uAlpha;
uniform float uScaleChange;
uniform vec2 uRes;
uniform int uType;
uniform vec2 uPlaneSizes;
uniform vec2 uSize;
varying vec2 vUv;

float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
  uv -= disc_center;
  uv*=uRes;
  float dist = sqrt(dot(uv, uv));
  return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
}

float circle2 (vec2 uv, vec2 pos, float r, float blur) {

  float d = length(uv + pos);
  float c = smoothstep(r, r - blur, d);

  return c;
} 

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

float remap(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

float hash12(vec2 p) {
  float h = dot(p,vec2(127.1,311.7));	
  return fract(sin(h)*43758.5453123);
}

// #define HASHSCALE3 vec3(.1031, .1030, .0973)
vec2 hash2d(vec2 p)
{
  vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yzx+19.19);
    return fract((p3.xx+p3.yz)*p3.zy);
}


void main() {


  vec2 uv = vUv;
  vec4 color = vec4(1.,0.,0.,1.);
  vec2 ratio = vec2(
    min((uPlaneSizes.x / uPlaneSizes.y) / (uSize.x / uSize.y), 1.0),
    min((uPlaneSizes.y / uPlaneSizes.x) / (uSize.y / uSize.x), 1.0)
  );

  vec2 vv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );
  
  if(uType==0) {
    vec3 tex = texture2D(uTexture, uv ).xyz;
    color = vec4(tex, 1.);
  }

  if(uType==1) {
    float hash = hash12(vUv*10.);
    uv -= 0.5;
    float c = circle2(uv, vec2(-.0, .0), uScale, 4.0 );
    
    vec2 warpedUV = vUv + vec2(hash )*c;
    color = texture2D(uTexture,warpedUV) + texture2D(uTexture,warpedUV)*vec4(vec3(c),1.);
  }

  

 
  gl_FragColor = color;



}
`
