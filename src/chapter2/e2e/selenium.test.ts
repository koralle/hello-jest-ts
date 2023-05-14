import {
  WebDriver,
  Builder,
  By,
  Key,
  until,
  Capabilities,
} from 'selenium-webdriver'

jest.setTimeout(20000)

describe("e2e test with selenium and chromeDriver", () => {
  let chromeDriver: WebDriver

  beforeAll(async () => {
    try {
      const chromeCapabilities = Capabilities.chrome()
      chromeCapabilities.set('goog:chromeOptions', {
        args: [
          '--no-sandbox',
          '--disable-gpu',
          '--lang=en-US'
        ]
      })

      chromeDriver = await new Builder().withCapabilities(chromeCapabilities).build()
    } catch (error) {
      console.error('Error initializing chromeDriver:', error)
    }
  })

  afterAll(async () => {
    try {
      if (chromeDriver) {
        await chromeDriver.quit()
      }
    } catch (error) {
      console.error('Error closing chromeDriver', error)
    }
  })

  test("a search keyword will be on the page title in google.com", async () => {
    await chromeDriver.get('https://www.google.com/ncr')

    await chromeDriver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN)

    const results = await chromeDriver.wait(until.titleIs('webdriver - Google Search'), 10000)

    expect(results).toBe(true)
  })
})
