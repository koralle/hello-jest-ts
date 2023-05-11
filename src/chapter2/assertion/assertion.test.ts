const numberValue = 0;
const stringValue = "文字列";
const booleanValue = true;

describe("プリミティブ値の評価", () => {
  test("evaluates as equal for all the same primitive values when using the toBe function", () => {
    expect(numberValue).toBe(0);
    expect(stringValue).toBe("文字列");
    expect(booleanValue).toBe(true);
  });

  test("evaluates as equal for all the same primitive values when using the toEqual function", () => {
    expect(numberValue).toEqual(0);
    expect(stringValue).toEqual("文字列");
    expect(booleanValue).toEqual(true);
  });

  test("evaluates as equal for all the same primitive values when using the toStrictEqual function", () => {
    expect(numberValue).toStrictEqual(0);
    expect(stringValue).toStrictEqual("文字列");
    expect(booleanValue).toStrictEqual(true);
  });
});

describe("オブジェクトの評価", () => {
  type CanType = {
    flavor: string;
    ounces: number;
  };

  const can1: CanType = {
    flavor: "grapefruit",
    ounces: 12,
  } as const;

  const can2: CanType = {
    flavor: "grapefruit",
    ounces: 12,
  } as const;

  const can3: CanType = can2;

  class Can {
    flavor: string;
    ounces: number;

    constructor({ flavor, ounces }: CanType) {
      this.flavor = flavor;
      this.ounces = ounces;
    }
  }

  const can4 = new Can({
    flavor: "grapefruit",
    ounces: 12,
  });

  describe("toBe関数を利用したオブジェクトの評価", () => {
    test("can1 and can2 are not the exact same instance", () => {
      expect(can1).not.toBe(can2);
    });

    test("can2 and can3 are the same instance", () => {
      expect(can2).toBe(can3);
    });
  });

  describe("toEqual関数を利用したオブジェクトの評価", () => {
    test("can1 and can2 have the same properties", () => {
      expect(can1).toEqual(can2);
    });

    test("can2 and can4 have the same properties", () => {
      expect(can2).toEqual(can4);
    });
  });

  describe("toStrictEqual関数を利用したオブジェクトの評価", () => {
    test("can2 and can4 are different class", () => {
      expect(can2).not.toStrictEqual(can4);
    });
  });

  describe("toStrictEqualとtoEqualの間の、未定義のプロパティとundefinedが設定されたプロパティの違い", () => {
    test("toEqual : undefinedを持つプロパティが無視されるので、等しいと評価される", () => {
      expect({ foo: NaN, bar: undefined }).toEqual({ foo: NaN });
    });

    test("toStrictEqual : undefinedを持つプロパティもチェックされるので、等しくないと評価される", () => {
      expect({ foo: NaN, bar: undefined }).not.toStrictEqual({ foo: NaN });
    });

    test("toEqual : 未定義の要素とundefinedの要素を区別しないので、等しいと評価される", () => {
      expect([, undefined, 1]).toEqual([undefined, , 1]);
    });

    test("toStrictEqual : 未定義の要素とundefinedの要素を区別するので、等しくないと評価される", () => {
      expect([, undefined, 1]).not.toStrictEqual([undefined, , 1]);
    });
  });
});

describe("浮動小数点数の誤差を許容した数値の評価", () => {
  test("0.1 + 0.2 returns 0.3", () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3);
  });

  test("0.301 and 0.3 are different when numDigits is 3", () => {
    // 小数点第三位まで評価する場合、0.3と0.301は異なると評価される
    expect(0.3 + 0.001).not.toBeCloseTo(0.3, 3);
  });
});

describe("数値の比較", () => {
  test("0.1 + 0.2 is greater than 0.3", () => {
    expect(0.1 + 0.2).toBeGreaterThan(0.3);
  });

  test("0.1 + 0.2 is greater than 0.3 or 0.1 + 0.2 equals to 0.30000000000000004", () => {
    expect(0.1 + 0.2).toBeGreaterThanOrEqual(0.3);
    expect(0.1 + 0.2).toBeGreaterThanOrEqual(0.30000000000000004);
  });

  test("0.1 + 0.2 is less than 0.4", () => {
    expect(0.1 + 0.2).toBeLessThan(0.4);
  });

  test("0.1 + 0.2 is less than 0.4 or 0.1 + 0.2 equals to 0.30000000000000004", () => {
    expect(0.1 + 0.2).toBeLessThanOrEqual(0.4);
    expect(0.1 + 0.2).toBeLessThanOrEqual(0.30000000000000004);
  });
});

describe("文字列の部分一致", () => {
  const log1 =
    '10.0.0.3 - - [30/Jan/2023:12:20:12 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.74.0" "-"';
  const log2 =
    '10.0.0.11 - - [30/Jan/2023:12:20:40 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.74.0" "-"';
  const log3 =
    '10.0.0.99 - - [30/Jan/2023:12:20:40 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.74.0" "-"';

  test("contains 10.0.0.3 IP address", () => {
    expect(log1).toEqual(expect.stringContaining("10.0.0.3"));
  });

  describe("contain IP address between 10.0.0.0 and 10.0.0.99", () => {
    const expected = /^10.0.0.([1-9]?[0-9]) /;

    describe("expect.stringMatching", () => {
      expect(log1).toEqual(expect.stringMatching(expected));
      expect(log2).toEqual(expect.stringMatching(expected));
      expect(log3).toEqual(expect.stringMatching(expected));
    });

    describe("toMatch", () => {
      expect(log1).toMatch(expected);
      expect(log2).toMatch(expected);
      expect(log3).toMatch(expected);
    });

    describe("toBe", () => {
      const regex = new RegExp(expected);
      expect(regex.test(log1)).toBe(true);
      expect(regex.test(log2)).toBe(true);
      expect(regex.test(log3)).toBe(true);
    });
  });
});

describe("配列の部分一致", () => {
  describe("配列の要素がプリミティブ型の場合", () => {
    const fruitList = ["Apple", "Lemon", "Orange"];

    test("contains Apple in fruitList", () => {
      expect(fruitList).toContain("Apple");
    });

    test("contains Apple and Orange in fruitList", () => {
      expect(fruitList).toEqual(expect.arrayContaining(["Apple", "Orange"]));
    });
  });

  describe("配列の要素がオブジェクト型の場合", () => {
    const itemList = [
      { name: "Apple", price: 100 },
      { name: "Lemon", price: 150 },
      { name: "Orange", price: 120 },
    ];

    test("contains Apple in itemList", () => {
      expect(itemList).toContainEqual({ name: "Apple", price: 100 });
    });

    test("contains Apple and Orange in itemList", () => {
      expect(itemList).toEqual(
        expect.arrayContaining([
          { name: "Apple", price: 100 },
          { name: "Orange", price: 120 },
        ])
      );
    });
  });
});

describe("オブジェクトの部分一致", () => {
  const ciBuild = {
    number: 1,
    duration: 12000,
    state: "success",
    triggerParameters: {
      is_scheduled: true,
    },
    type: "scheduled_pipeline",
    actor: {
      login: "Taka",
    },
  };

  describe("一つのプロパティを検証する", () => {
    test("build state should be success", () => {
      expect(ciBuild).toHaveProperty("state", "success");
    });
  });

  describe("ネストしたプロパティを検証する", () => {
    test("actor should be Taka", () => {
      expect(ciBuild).toHaveProperty("actor.login", "Taka");
    });
  });

  describe("複数のプロパティを検証する", () => {
    test("triggered by the scheduled pipeline", () => {
      expect(ciBuild).toEqual(
        expect.objectContaining({
          triggerParameters: expect.objectContaining({ is_scheduled: true }),
          type: "scheduled_pipeline",
        })
      );
    });
  });
});

describe("Errorの評価", () => {
  class User {
    name: string;
    password: string;

    constructor({ name, password }: { name: string; password: string }) {
      if (password.length < 6)
        throw new Error("The password length must be at least 6 characters.");
      this.name = name;
      this.password = password;
    }
  }

  test("creates a new user with a 6-character password", () => {
    expect(new User({ name: "hoge", password: "123456" })).toEqual({
      name: "hoge",
      password: "123456",
    });
  });

  describe("throw Error", () => {
    test("[case 1]: throw Error when the length of password is less than 6", () => {
      expect(() => new User({ name: "hoge", password: "12345" })).toThrow();
    });

    test("[case 2]: throw Error when the length of password is less than 6", () => {
      expect(() => new User({ name: "hoge", password: "12345" })).toThrow(
        Error
      );
    });

    test("[case 3]: throw Error when the length of password is less than 6", () => {
      expect(() => new User({ name: "hoge", password: "12345" })).toThrow(
        // "The password length must be at least 6 characters."
        /^The password length must be at least 6 characters.$/
      );
    });
  });
});

describe("Callback関数を利用した非同期な関数の結果の評価", () => {
  const fetchDataWithCallback = (callback) => {
    setTimeout(callback, 3000, "lemon");
  };

  test("return lemon", (done) => {
    const callback = (data) => {
      expect(data).toBe("lemon");
      done();
    };
    fetchDataWithCallback(callback);
  });
});

describe("Promiseを利用した非同期な関数の結果の評価", () => {
  describe(".resolvesを利用した非同期な関数の結果の評価", () => {
    const fetchDataWithPromiseResolve = () =>
      new Promise((resolve) => setTimeout(resolve, 1000, "lemon"));

    test("return lemon", () => {
      return expect(fetchDataWithPromiseResolve()).resolves.toBe("lemon");
    });

    test("return lemon with async/await", async () => {
      await expect(fetchDataWithPromiseResolve()).resolves.toBe("lemon");
    });
  });

  describe(".rejectsを利用した非同期な関数の結果の評価", () => {
    const fetchDataWithPromiseReject = () =>
      new Promise((_, reject) =>
        setTimeout(reject, 1000, new Error("lemon does not exist"))
      );

    test("return lemon", () => {
      return expect(fetchDataWithPromiseReject()).rejects.toThrow(
        "lemon does not exist"
      );
    });

    test("return lemon with async/await", async () => {
      await expect(fetchDataWithPromiseReject()).rejects.toThrow(
        /^lemon does not exist$/
      );
    });
  });
});
