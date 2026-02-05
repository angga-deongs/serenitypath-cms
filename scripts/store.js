import { Sniffer, qs, getViewport, getWindowSizes } from './utils'

export default {
  title: 'Atria',
  author: 'Non-Linear',
  link: 'http://non-linear.studio/',
  body: document.body,
  main: qs('main'),
  header: qs('header'),
  page: qs('.page'),
  footer: qs('footer'),
  vw: getViewport().width,
  vh: getViewport().height,
  sniff: Sniffer.sniff,
  window: getWindowSizes(),
  flags: {
    smooth: true,
    locked: true,
    dropdown: false,
    resize: false,
  },
}
