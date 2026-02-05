

/* Math
   Some helpfull math functions
   ========================================================================== */

   export const lerp = (a, b, n)=> {
    return a * (1 - n) + b * n;
  }

  export const norm = (val, min, max) => {
    return (val - min) / (max - min )
  }

  export const clamp = (val, min, max) => {
    return Math.min( Math.max(val, min), max )
  }

  export const round = (n, p) => {
    var p = p !== undefined ? Math.pow(10, p) : 1000
    return Math.round(n * p) / p
  }
