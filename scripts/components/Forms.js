import { qs, qsa, growTextarea } from '../utils'
import gsap from 'gsap'
import store from '../store'

export default class Forms {
  constructor() {
    const page = store.page
    const classes = page.classList
    const obj = {}
    const pages = {
      institute: classes.contains('is-institute'),
      academy: classes.contains('is-academy'),
      collab: classes.contains('is-collab'),
    }

    this.dom = {
      forms: qsa('form'),
      inputs: qsa('input'),
      text: qs('textarea'),
      select: qs('select'),
      icons: qs('.confirm-icon'),
      message: qs('.contact-message'),
    }

    this.forms = {
      press: 'Press',
      general: 'General',
      institute: 'Institute',
      membership: 'Membership',
      academy: 'Academy',
      health: 'Health',
    }

    if (pages.institute || pages.academy || pages.collab) {
      obj.target = this.dom.select
      // if (pages.institute) this.dom.select.value = 'institute'
      if (pages.academy) this.dom.select.value = 'academy'
      if (pages.collab) this.dom.select.value = 'health'
      this.updateForm(obj)
    }

    growTextarea()

    this.init()
  }

  handleSubmit = (e, form) => {
    e.preventDefault()

    const formData = new FormData(form)

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        this.resetForm(form)
      })
      .catch((error) => console.log(error))
  }

  resetForm(form) {
    const formSuccess = qs('.contact-success', form)

    gsap.fromTo(
      formSuccess,
      { y: 20, autoAlpha: 0 },
      { duration: 0.4, y: 0, autoAlpha: 1 },
    )

    setTimeout(() => {
      gsap.fromTo(
        formSuccess,
        { y: 0, autoAlpha: 1 },
        { duration: 0.4, y: 20, autoAlpha: 0 },
      )
    }, 3000)

    form.reset()
  }

  updateForm = (e) => {
    const target = e.target
    const value = target.value
    const form = target.closest('form')
    const formName = qs('.form-name', form)
    const name = this.forms[`${value}`]
    const icon = qs('.select-icon', form)

    form.setAttribute('name', name)
    formName.setAttribute('value', name)

    gsap.to(icon, { rotate: '0deg' })
  }

  openSelect = (e) => {
    const target = e.target
    const form = target.closest('form')
    const icon = qs('.select-icon', form)
    target.focus()
    //gsap.to(icon, { rotate: '180deg' })
  }

  closeSelect = (e) => {
    const target = e.target
    const form = target.closest('form')
    const icon = qs('.select-icon', form)
    gsap.to(icon, { rotate: '0deg' })
  }

  showLabel = (e) => {
    const target = e.target
    const parent = target.parentNode
    const bullet = qs('.bullet', parent)
    const value = target.value

    if (value.length > 2) {
      gsap.to(bullet, { background: '#3c4e3d' })
    } else {
      gsap.to(bullet, { background: 'none' })
    }
  }

  handleError = (e, form) => {
    const required = qsa('[required]', form)

    required.forEach((item) => {
      const value = item.value.length
      const parent = item.parentNode

      if (value < 1) {
        parent.classList.add('-error')
      } else {
        parent.classList.remove('-error')
      }
    })
  }

  on() {
    const { forms, inputs, text, select } = this.dom
    forms.forEach((form) => {
      form.addEventListener('submit', (e) => this.handleSubmit(e, form))
    })

    inputs.forEach((input) => {
      input.addEventListener('keyup', this.showLabel)
    })

    if (select) select.addEventListener('blur', this.closeSelect)
    if (select) select.addEventListener('click', this.openSelect)
    if (select) select.addEventListener('change', this.updateForm)
    if (text) text.addEventListener('keyup', this.showLabel)
  }

  off() {
    const { forms, inputs, text, select } = this.dom
    forms.forEach((form) => {
      form.removeEventListener('submit', (e) => this.handleSubmit(e, form))
    })

    inputs.forEach((input) => {
      input.removeEventListener('keyup', this.showLabel)
    })

    if (select) select.removeEventListener('blur', this.closeSelect)
    if (select) select.removeEventListener('focus', this.openSelect)
    if (select) select.removeEventListener('change', this.updateForm)
    if (text) text.removeEventListener('keyup', this.showLabel)
  }

  destroy() {
    this.off()
  }

  init() {
    this.on()
  }
}
