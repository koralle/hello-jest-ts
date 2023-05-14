import { chohan } from "./chohan";

jest.mock("./seed", () => {
  return {
    seed: jest
      .fn()
      .mockImplementationOnce(() => 2)
      .mockImplementationOnce(() => 1),
  };
});

describe("jest.mock()を利用したモック化", () => {
  describe("chohan", () => {
    test("returns 丁 when seed returns an even number like 2", () => {
      expect(chohan()).toBe("丁");
    });

    test("returns 半 when seed returns an even number like 1", () => {
      expect(chohan()).toBe("半");
    });
  });

});
