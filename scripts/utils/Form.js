import store from '../store'
import SmoothScroll from '../components/SmoothScroll'
import { qsa } from './Selector'

export const selectForm = () => {
  const forms = qsa('form')

  forms.forEach((form) => {
    const selects = qsa('select', form)

    selects.forEach((select) => {
      select.addEventListener('change', updateSelect)
    })
  })
}

const updateSelect = (el) => {
  const target = el.target

  if (target.value !== 'null') {
    target.classList.add('-active')
    SmoothScroll.update()
  } else {
    target.classList.remove('-active')
    SmoothScroll.update()
  }
}

export const formFocus = () => {
  const forms = qsa('form')

  forms.forEach((form) => {
    const inputs = qsa('input', form)
    const texts = qsa('textarea', form)

    inputs.forEach((input) => {
      input.addEventListener('focus', focusIn)
      input.addEventListener('focusout', focusOut)
    })

    texts.forEach((text) => {
      text.addEventListener('focus', focusIn)
      text.addEventListener('focusout', focusOut)
    })
  })
}

export const formOut = () => {
  const forms = qsa('form')

  forms.forEach((form) => {
    const inputs = qsa('input', form)
    const texts = qsa('textarea', form)

    inputs.forEach((input) => {
      input.removeEventListener('focus', focusIn)
      input.removeEventListener('focusout', focusOut)
    })

    texts.forEach((text) => {
      text.removeEventListener('focus', focusIn)
      text.removeEventListener('focusout', focusOut)
    })
  })
}

const focusIn = () => {
  store.focus = true
}
const focusOut = () => {
  store.focus = false
}

export const growTextarea = () => {
  const forms = qsa('form')

  forms.forEach((form) => {
    const tx = document.getElementsByTagName('textarea')

    for (var i = 0; i < tx.length; i++) {
      let h = parseInt(tx[i].scrollHeight) / 1.065

      tx[i].setAttribute('style', 'height:' + h + 'px;overflow-y:hidden;')

      tx[i].addEventListener('input', OnInput, false)
    }
  })
}

const OnInput = (el) => {
  const target = el.target
  const height = target.scrollHeight
  const styleHeight = parseInt(target.style.height)
  target.style.height = 'auto'
  target.style.height = target.scrollHeight + 'px'

  if (target.value.length !== 0) {
    target.classList.add('-active')
  } else {
    target.classList.remove('-active')
    target.style.height = ''
  }

  if (height !== styleHeight) SmoothScroll.update()
}
