import { JSDOM, DOMWindow } from 'jsdom';
import fs from 'fs'
import path from  'path'

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8')

describe('simple ui test', () => {
  let document: Document
  let window: DOMWindow

  beforeEach(() => {
    window = new JSDOM(html, { runScripts: 'dangerously'}).window
    document = window.document
  })

  test("doesn't show a message at the initial state", () => {
    const message = document.querySelector('#message > p')
    expect(message).toBe(null)
  })

  test("show a message after clicking the button", () => {
    const button = document.querySelector("#showMessage")
    const click = new window.MouseEvent("click")
    button?.dispatchEvent(click)

    const message = document.querySelector('#message > p')
    expect(message?.textContent).toBe('You Passed!!!')
  })

  test("show only one message after clicking the button twice", () => {
    const button = document.querySelector("#showMessage")
    const click = new window.MouseEvent("click")
    button?.dispatchEvent(click)
    button?.dispatchEvent(click)

    const messages = document.querySelectorAll('#message > p')
    expect(messages.length).toBe(1)
    expect(messages[0].textContent).toBe('You Passed!!!')
  })
})
