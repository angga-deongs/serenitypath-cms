import { bindAll } from '.'
import { Emitter } from '../events'
import store from '../store'
import gsap from "gsap"

export default class Grid {

  constructor(obj) {

    bindAll(this, 'gridSetup', 'visibility')

    const desktop = obj.desktop
    const mobile = obj.mobile

    this.state = {
      toggle: false
    }
  
    this.data = {
      background: obj.background ? obj.background : 'red',
      desktop: {
        colums: desktop ? desktop.columns : 0,
        rows: desktop ? desktop.rows : 0,
        gutter: desktop ? desktop.gutter : 0,
        size: desktop ? desktop.size : 0,
      },
      mobile : {
        colums :mobile ? mobile.columns : 0,
        rows: mobile ? mobile.rows : 0,
        gutter: mobile ? mobile.gutter : 0,
        size: mobile ? mobile.size : 0,
      }
    }

    this.container = document.createElement('div')

    this.gridSetup()
    this.on()

  }

  gridSetup() {

    const {desktop, mobile, background} = this.data
    const rows = document.createElement('div')
    const columns = document.createElement('div')
    const cols = store.window.M_UP ? desktop.colums : mobile.colums
    const gutter = store.window.M_UP ? desktop.gutter : mobile.gutter
    const size =  store.window.M_UP ? desktop.size : mobile.size
    let offset = 0

    this.container.innerHTML = ''

    if(gutter !== 0 && gutter) {

      const vw = (gutter * 100) / size
      offset = 100 - (vw * 2)
      this.container.style.width = `${offset}vw`
    } else {

      offset = 100
      this.container.style.width = `100%`
    }

    if(cols !== 0) {

      columns.className = 'cols'
     
      for( let i = 0; i < cols; i++ ) {
        const inner = document.createElement('div')

        const w = (offset) / cols
      
       
        Object.assign(inner.style, {
          background: background,
          opacity: i % 2 == 0 ? 0.6 : 1,
          height: '100%',
          width: `${w}vw`  
        })

        inner.className = `inner-col  col-${i}`
        columns.appendChild(inner)
      }

      this.container.appendChild(columns)

    }
  }

  addGrid() {

    this.container.className = 'grid'
    store.body.appendChild( this.container)

  }

  visibility(e) {

    if(e.key === 'g' && e.ctrlKey) {

      if(!this.state.toggle) {
        gsap.to(this.container, {duration: 0.5, autoAlpha: 0.2})
        this.state.toggle = true
      } else {
        gsap.to(this.container, {duration: 0.5, autoAlpha: 0})
        this.state.toggle = false
      }

     
    } 

  }

  on() {

    document.addEventListener('keypress', this.visibility)
    Emitter.on('GlobalResize', this.gridSetup)
  }


}