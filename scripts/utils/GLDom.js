/* 3D
   Some helpfull functions for 3d 
   ========================================================================== */

import store from '../store'

export const viewSize = (camera, aspectRatio) => {
  // https://gist.github.com/ayamflow/96a1f554c3f88eef2f9d0024fc42940f

  let distance = camera.position.z - 1
  let vFov = (camera.fov * Math.PI) / 180
  let height = 2 * Math.tan(vFov / 2) * distance
  let width = height * aspectRatio

  return { width, height, vFov }
}

export const updateSize = (rect, camera, aspectRatio) => {
  const size = {}

  const camUnit = viewSize(camera, aspectRatio)

  const { vw, vh } = store
  const x = rect.width / vw
  const y = rect.height / vh

  if (!x || !y) return

  size.x = camUnit.width * x
  size.y = camUnit.height * y

  return {
    size,
    camUnit,
  }
}

export const updateX = (rect, scale, scroll = 0) => {
  const { vw } = store
  const { left } = rect
  let x

  x = -(scale.camUnit.width / 2) + scale.size.x / 2
  x += ((left + scroll) / vw) * scale.camUnit.width

  return {
    x,
  }
}

export const updateY = (rect, scale, scroll) => {
  const { vh } = store
  const { top } = rect

  let y
  y = -(scale.camUnit.height / 2) + scale.size.y / 2
  y += ((top + scroll) / vh) * scale.camUnit.height

  return {
    y,
  }
}
