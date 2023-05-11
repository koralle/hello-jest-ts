describe("jest.fn()を利用したモックオブジェクトの作成", () => {
  describe("jest.fn())", () => {
    describe("mock object specification", () => {
      const mockFunction = jest.fn();

      test("mockFunction関数の返り値はundefined", () => {
        expect(mockFunction("foo", "bar")).toBe(undefined);
      });

      test("mockプロパティを持ってる", () => {
        expect(mockFunction).toHaveProperty("mock");
      });

      test("mockプロパティはcallsプロパティを持ってる", () => {
        expect(mockFunction.mock).toHaveProperty("calls");
      });

      test("1回呼び出された", () => {
        expect(mockFunction.mock.calls).toHaveLength(1);
      });

      test("1回呼び出された際に、引数は'foo'と'bar'だった", () => {
        expect(mockFunction.mock.calls[0]).toEqual(["foo", "bar"]);
      });

      test("mockプロパティはresultsプロパティを持ってる", () => {
        expect(mockFunction.mock).toHaveProperty("results");
      });

      test("1回呼び出された", () => {
        expect(mockFunction.mock.results).toHaveLength(1);
      });

      test("1回目の返り値はundefined", () => {
        expect(mockFunction.mock.results[0].value).toBe(undefined);
      });

      test("1回目の呼び出しが正常終了した", () => {
        expect(mockFunction.mock.results[0].type).toBe("return");
      });
    });
  });

  describe("モックオブジェクトの返り値を設定", () => {
    test('return "Hello"', () => {
      const mockFunction = jest.fn().mockImplementation(() => "Hello");
      expect(mockFunction()).toBe("Hello");
    });

    test('return "Hello"', () => {
      const mockFunction = jest
        .fn()
        .mockImplementationOnce(() => "Hello")
        .mockImplementationOnce(() => "Goodbye");

      expect(mockFunction()).toBe("Hello");
      expect(mockFunction()).toBe("Goodbye");
      expect(mockFunction()).toBe(undefined);
    });
  });
});
