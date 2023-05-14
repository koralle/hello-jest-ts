describe("Math.random with spyOn", () => {
  let spy

  afterEach(() => {
    spy.mockRestore()
  })

  test("Math.random return 1", () => {
    spy = jest.spyOn(Math, "random").mockImplementation(() => 1)
    expect(Math.random()).toBe(1)
  })

  test("Math.random return under 1", () => {
    expect(Math.random()).toBeLessThan(1)
  })
})
