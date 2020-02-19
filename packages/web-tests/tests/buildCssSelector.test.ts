import { BrowserContext, launch, Page } from "@qawolf/browser";
import { CONFIG } from "@qawolf/config";
import { QAWolfWeb } from "@qawolf/web";

let context: BrowserContext;
let page: Page;

beforeAll(async () => {
  context = await launch();
});

afterAll(() => context.close());

describe("buildCssSelector", () => {
  describe("click: button", () => {
    beforeAll(async () => {
      await context.goto(`localhost:3000/buttons`);
      page = await context.page();
    });

    it("returns undefined if no attribute present", async () => {
      const selector = await page.evaluate(() => {
        const qawolf: QAWolfWeb = (window as any).qawolf;
        const element = document.getElementById("#html-button")!;

        return qawolf.buildCssSelector({
          element,
          attribute: "data-qa",
          action: "click"
        });
      });

      expect(selector).toBeUndefined();
    });

    it("returns selector if attribute present", async () => {
      const selector = await page.evaluate(() => {
        const qawolf: QAWolfWeb = (window as any).qawolf;
        const element = document.querySelector(
          "[data-qa='html-button']"
        ) as HTMLElement;

        return qawolf.buildCssSelector({
          element,
          attribute: "data-qa",
          action: "click"
        });
      });

      expect(selector).toBe("[data-qa='html-button']");
    });

    it("returns selector if attribute present on ancestor", async () => {
      const selector = await page.evaluate(() => {
        const qawolf: QAWolfWeb = (window as any).qawolf;
        const element = document.getElementById("html-button-child")!;

        return qawolf.buildCssSelector({
          element,
          attribute: "data-qa",
          action: "click"
        });
      });

      expect(selector).toBe("[data-qa='html-button-with-children']");

      const selector2 = await page.evaluate(() => {
        const qawolf: QAWolfWeb = (window as any).qawolf;
        const element = document.getElementsByClassName(
          "MuiButton-label"
        )[0] as HTMLElement;

        return qawolf.buildCssSelector({
          element,
          attribute: "data-qa",
          action: "click"
        });
      });

      expect(selector2).toBe("[data-qa='material-button']");
    });
  });

  describe("click: radio", () => {
    beforeAll(async () => {
      await context.goto(`localhost:3000/radio-inputs`);
      page = await context.page();
    });

    it("returns undefined if no attribute present", async () => {
      const selector = await page.evaluate(() => {
        const qawolf: QAWolfWeb = (window as any).qawolf;
        const element = document.getElementById("another")!;

        return qawolf.buildCssSelector({
          element,
          attribute: "data-qa",
          action: "click"
        });
      });

      expect(selector).toBeUndefined();
    });

    it("returns selector if attribute present", async () => {
      const selector = await page.evaluate(() => {
        const qawolf: QAWolfWeb = (window as any).qawolf;
        const element = document.getElementById("single")!;

        return qawolf.buildCssSelector({
          element,
          attribute: "data-qa",
          action: "click"
        });
      });

      expect(selector).toBe("[data-qa='html-radio']");

      const selector2 = await page.evaluate(() => {
        const qawolf: QAWolfWeb = (window as any).qawolf;
        const element = document.getElementsByClassName(
          "MuiFormControlLabel-label"
        )[0] as HTMLElement;

        return qawolf.buildCssSelector({
          element,
          attribute: "data-qa",
          action: "click"
        });
      });

      expect(selector2).toBe("[data-qa='material-radio']");
    });

    it("returns selector if attribute present on ancestor", async () => {
      const selector = await page.evaluate(() => {
        const qawolf: QAWolfWeb = (window as any).qawolf;
        const element = document.getElementById("dog")!;

        return qawolf.buildCssSelector({
          element,
          attribute: "data-qa",
          action: "click"
        });
      });

      expect(selector).toBe("[data-qa='html-radio-group'] [value='dog']");

      const selector2 = await page.evaluate(() => {
        const qawolf: QAWolfWeb = (window as any).qawolf;
        const element = document.getElementById("blue")!;

        return qawolf.buildCssSelector({
          element,
          attribute: "data-qa",
          action: "click"
        });
      });

      expect(selector2).toBe("[data-qa='material-radio-group'] [value='blue']");
    });
  });

  describe("click: checkbox", () => {
    beforeAll(async () => {
      await context.goto(`localhost:3000/checkbox-inputs`);
      page = await context.page();
    });

    it("returns undefined if no attribute present", async () => {
      const selector = await page.evaluate(() => {
        const qawolf: QAWolfWeb = (window as any).qawolf;
        const element = document.getElementById("another")!;

        return qawolf.buildCssSelector({
          element,
          attribute: "data-qa",
          action: "click"
        });
      });

      expect(selector).toBeUndefined();
    });

    it("returns selector if attribute present", async () => {
      const selector = await page.evaluate(() => {
        const qawolf: QAWolfWeb = (window as any).qawolf;
        const element = document.getElementById("single")!;

        return qawolf.buildCssSelector({
          element,
          attribute: "data-qa",
          action: "click"
        });
      });

      expect(selector).toBe("[data-qa='html-checkbox']");

      const selector2 = await page.evaluate(() => {
        const qawolf: QAWolfWeb = (window as any).qawolf;
        const element = document.getElementsByClassName(
          "MuiFormControlLabel-label"
        )[0] as HTMLElement;

        return qawolf.buildCssSelector({
          element,
          attribute: "data-qa",
          action: "click"
        });
      });

      expect(selector2).toBe("[data-qa='material-checkbox']");
    });

    it("returns selector if attribute present on ancestor", async () => {
      const selector = await page.evaluate(() => {
        const qawolf: QAWolfWeb = (window as any).qawolf;
        const element = document.getElementById("dog")!;

        return qawolf.buildCssSelector({
          element,
          attribute: "data-qa",
          action: "click"
        });
      });

      expect(selector).toBe("[data-qa='html-checkbox-group'] [value='dog']");

      const selector2 = await page.evaluate(() => {
        const qawolf: QAWolfWeb = (window as any).qawolf;
        const element = document.getElementById("blue")!;

        return qawolf.buildCssSelector({
          element,
          attribute: "data-qa",
          action: "click"
        });
      });

      expect(selector2).toBe(
        "[data-qa='material-checkbox-group'] [value='blue']"
      );
    });
  });

  describe("type", () => {
    it("returns undefined if no attribute present", () => {});

    it("returns selector if attribute present", () => {});

    it("returns selector and target if attribute present on ancestor", () => {});

    it("return selector and target attribute for content editable", () => {});
  });

  describe("select", () => {
    it("returns undefined if no attribute present", () => {});

    it("returns selector if attribute present", () => {});

    it("returns selector and target if attribute present on ancestor", () => {});
  });
});

// describe("getAttributeValue", () => {
//   it("returns null if data attribute not specified", async () => {
//     const attribute = await page.evaluate(() => {
//       const qawolf: QAWolfWeb = (window as any).qawolf;
//       const username = document.getElementById("username")!;
//       const result = qawolf.element.getAttributeValue(username, "");
//       return result;
//     });

//     expect(attribute).toBeNull();
//   });

//   it("returns null if element does not have specified data attribute", async () => {
//     const attribute = await page.evaluate(() => {
//       const qawolf: QAWolfWeb = (window as any).qawolf;
//       const username = document.getElementById("username")!;
//       username.setAttribute("data-other", "user");

//       const result = qawolf.element.getAttributeValue(username, "data-qa");
//       username.removeAttribute("data-other");

//       return result;
//     });

//     expect(attribute).toBeNull();
//   });

//   it("gets attribute when there are multiple specified", async () => {
//     const attribute = await page.evaluate(() => {
//       const qawolf: QAWolfWeb = (window as any).qawolf;
//       const username = document.getElementById("username")!;
//       username.setAttribute("data-qa", "user");

//       const result = qawolf.element.getAttributeValue(
//         username,
//         "data-id , data-qa "
//       );
//       username.removeAttribute("data-qa");

//       return result;
//     });

//     expect(attribute).toEqual({ attribute: "data-qa", value: "user" });
//   });

//   it("gets attribute when there is one specified", async () => {
//     const attribute = await page.evaluate(() => {
//       const qawolf: QAWolfWeb = (window as any).qawolf;
//       const username = document.getElementById("username")!;
//       const result = qawolf.element.getAttributeValue(username, "id");
//       return result;
//     });

//     expect(attribute).toEqual({ attribute: "id", value: "username" });
//   });
// });
