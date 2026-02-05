import { bounds } from '.'

export const Scale = (a, b) => {
  const aRect = bounds(a)
  const bRect = bounds(b)
  const wDiff = bRect.width - aRect.width
  const hDiff = bRect.height - aRect.height
  const wTotal = aRect.width + wDiff
  const hTotal = aRect.height + hDiff
  const wScale = (wTotal * 1) / aRect.width
  const hScale = (hTotal * 1) / aRect.height

  const obj = {
    el: a,
    wScale,
    hScale,
  }

  return obj
}

export const Distance = (a, b) => {
  const aRect = bounds(a)
  const bRect = bounds(b)

  const obj = {
    el: a,
    dx: bRect.left - aRect.left,
    dy: bRect.top - aRect.top,
  }

  return obj
}
