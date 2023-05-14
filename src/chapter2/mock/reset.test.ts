describe("#reset mocks with jest.fn", () => {
  const targetDate = '2020-12-25'
  const mockDate = new Date('2019-12-25')

  beforeEach(() => {
    Date = jest.fn(() => mockDate) as unknown as jest.MockedFunction<typeof Date>
  })

  test("jest.clearAllMocks", () => {
    // 必ずmockDate
    expect(new Date(targetDate)).toEqual(mockDate)

    // new Dateの引数であるtargetDate
    expect((Date as jest.MockedFunction<typeof Date>).mock.calls).toEqual([['2020-12-25']])
    expect((Date as jest.MockedFunction<typeof Date>).mock.results).toEqual([{ type: 'return', value: mockDate }])

    // リセット
    jest.clearAllMocks()

    // mockのプロパティを全部リセット
    expect((Date as jest.MockedFunction<typeof Date>).mock.calls).toEqual([])
    expect((Date as jest.MockedFunction<typeof Date>).mock.results).toEqual([])

    // mock関数は引き続き利用できる
    expect(new Date(targetDate)).toEqual(mockDate)
  })

  test('jest.resetAllMocks', () => {
    // 必ずmockDate
    expect(new Date(targetDate)).toEqual(mockDate)

    // new Dateの引数であるtargetDate
    expect((Date as jest.MockedFunction<typeof Date>).mock.calls).toEqual([['2020-12-25']])
    expect((Date as jest.MockedFunction<typeof Date>).mock.results).toEqual([{ type: 'return', value: mockDate }])

    // リセット
    jest.resetAllMocks()

    // mockのプロパティを全部リセット
    expect((Date as jest.MockedFunction<typeof Date>).mock.calls).toEqual([])
    expect((Date as jest.MockedFunction<typeof Date>).mock.results).toEqual([])

    // mock関数もリセットされ、デフォルトでは`{}`を返す
    expect(new Date(targetDate)).toEqual({})
  })

  test('jest.restoreAllMocks', () => {
    // 必ずmockDate
    expect(new Date(targetDate)).toEqual(mockDate)

    // new Dateの引数であるtargetDate
    expect((Date as jest.MockedFunction<typeof Date>).mock.calls).toEqual([['2020-12-25']])
    expect((Date as jest.MockedFunction<typeof Date>).mock.results).toEqual([{ type: 'return', value: mockDate }])

    // リセット
    jest.resetAllMocks()

    // mockのプロパティを全部リセット
    expect((Date as jest.MockedFunction<typeof Date>).mock.calls).toEqual([])
    expect((Date as jest.MockedFunction<typeof Date>).mock.results).toEqual([])

    // mock関数もリセットされ、デフォルトでは`{}`を返す
    expect(new Date(targetDate)).toEqual({})
  })
})
