import { BrowserContext, launch, Page } from "@qawolf/browser";
import { CONFIG } from "@qawolf/config";
import { QAWolfWeb } from "@qawolf/web";
import { AttributeValuePair } from "../../web/src/buildCssSelector";

let context: BrowserContext;
let page: Page;

const buildCssSelector = async (
  selector: string,
  isClick: boolean = false
): Promise<string | undefined> => {
  const result = await page.evaluate(
    (selector, isClick) => {
      const qawolf: QAWolfWeb = (window as any).qawolf;
      const target = document.querySelector(selector) as HTMLElement;

      return qawolf.buildCssSelector({
        target,
        attribute: "data-qa",
        isClick
      });
    },
    selector,
    isClick
  );

  return result;
};

const getAttributeValue = async (
  selector: string,
  attribute: string
): Promise<AttributeValuePair | null> => {
  const result = await page.evaluate(
    (selector, attribute) => {
      const qawolf: QAWolfWeb = (window as any).qawolf;
      const button = document.querySelector(selector) as HTMLElement;

      return qawolf.getAttributeValue(button, attribute);
    },
    selector,
    attribute
  );

  return result;
};

beforeAll(async () => {
  context = await launch();
  page = await context.page();
});

afterAll(() => context.close());

describe("buildCssSelector", () => {
  it("returns undefined if there is no attribute", async () => {
    await context.goto(`${CONFIG.sandboxUrl}buttons`);

    const selector = await buildCssSelector("#html-button", true);
    expect(selector).toBeUndefined();
  });

  describe("click: button", () => {
    beforeAll(async () => {
      await context.goto(`${CONFIG.sandboxUrl}buttons`);
    });

    it("selects the target", async () => {
      const selector = await buildCssSelector("[data-qa='html-button']", true);
      expect(selector).toBe("[data-qa='html-button']");
    });

    it("selects the ancestor", async () => {
      const selector = await buildCssSelector("#html-button-child", true);
      expect(selector).toBe("[data-qa='html-button-with-children']");

      const selector2 = await buildCssSelector(".MuiButton-label", true);
      expect(selector2).toBe("[data-qa='material-button']");
    });
  });

  describe("click: date picker button", () => {
    it("selects the ancestor and clickable descendant", async () => {
      await context.goto(`${CONFIG.sandboxUrl}date-pickers`);

      const selector = await buildCssSelector(
        '[data-qa="material-date-picker"] path',
        true
      );
      expect(selector).toBe("[data-qa='material-date-picker'] button");
    });
  });

  describe("click: radio", () => {
    beforeAll(async () => {
      await context.goto(`${CONFIG.sandboxUrl}radio-inputs`);
    });

    it("selects the target radio button/label", async () => {
      const selector = await buildCssSelector("#single", true);
      expect(selector).toBe("[data-qa='html-radio']");

      const selector2 = await buildCssSelector(
        ".MuiFormControlLabel-label",
        true
      );
      expect(selector2).toBe("[data-qa='material-radio']");
    });

    it("selects the ancestor group and descendant value", async () => {
      const selector = await buildCssSelector("#dog", true);
      expect(selector).toBe("[data-qa='html-radio-group'] [value='dog']");

      const selector2 = await buildCssSelector("#blue", true);
      expect(selector2).toBe("[data-qa='material-radio-group'] [value='blue']");
    });
  });

  describe("click: checkbox", () => {
    beforeAll(async () => {
      await context.goto(`${CONFIG.sandboxUrl}checkbox-inputs`);
    });

    it("selects the target checkbox/label", async () => {
      const selector = await buildCssSelector("#single", true);
      expect(selector).toBe("[data-qa='html-checkbox']");

      const selector2 = await buildCssSelector(
        ".MuiFormControlLabel-label",
        true
      );
      expect(selector2).toBe("[data-qa='material-checkbox']");
    });

    it("selects the ancestor group and descendant value", async () => {
      const selector = await buildCssSelector("#dog", true);
      expect(selector).toBe("[data-qa='html-checkbox-group'] [value='dog']");

      const selector2 = await buildCssSelector("#blue", true);
      expect(selector2).toBe(
        "[data-qa='material-checkbox-group'] [value='blue']"
      );
    });
  });

  describe("type: input", () => {
    beforeAll(async () => {
      await context.goto(`${CONFIG.sandboxUrl}text-inputs`);
    });

    it("select the target input/textarea", async () => {
      const selector = await buildCssSelector('[type="password"]');
      expect(selector).toBe("[data-qa='html-password-input']");

      const selector2 = await buildCssSelector("textarea");
      expect(selector2).toBe("[data-qa='html-textarea']");
    });

    it("selects the ancestor and descendant input/textarea", async () => {
      const selector = await buildCssSelector(
        '[data-qa="material-text-input"] input'
      );
      expect(selector).toBe("[data-qa='material-text-input'] input");

      const selector2 = await buildCssSelector(
        "[data-qa='material-textarea'] textarea"
      );
      expect(selector2).toBe("[data-qa='material-textarea'] textarea");
    });
  });

  describe("type: content editable", () => {
    beforeAll(async () => {
      await context.goto(`${CONFIG.sandboxUrl}content-editables`);
    });

    it("selects the ancestor and descendant content editable", async () => {
      const selector = await buildCssSelector("[data-qa='content-editable']");
      expect(selector).toBe("[data-qa='content-editable']");

      const selector2 = await buildCssSelector(
        "[data-qa='draftjs'] [contenteditable='true']"
      );
      expect(selector2).toBe("[data-qa='draftjs'] [contenteditable='true']");

      const selector3 = await buildCssSelector(
        "[data-qa='quill'] [contenteditable='true']"
      );
      expect(selector3).toBe("[data-qa='quill'] [contenteditable='true']");
    });
  });

  describe("select", () => {
    beforeAll(async () => {
      await context.goto(`${CONFIG.sandboxUrl}selects`);
    });

    it("selects the target select", async () => {
      const selector = await buildCssSelector("[data-qa='html-select']");
      expect(selector).toBe("[data-qa='html-select']");
    });

    it("selects the target and descendant select", async () => {
      const selector = await buildCssSelector(
        "[data-qa='material-select-native'] select"
      );
      expect(selector).toBe("[data-qa='material-select-native'] select");
    });
  });
});

describe("getAttributeValue", () => {
  beforeAll(async () => {
    await context.goto(`${CONFIG.sandboxUrl}buttons`);
  });

  it("returns null if attribute not specified", async () => {
    const attribute = await getAttributeValue("#html-button", "");
    expect(attribute).toBeNull();
  });

  it("returns null if element does not have specified attribute", async () => {
    const attribute = await getAttributeValue("#html-button", "data-qa");
    expect(attribute).toBeNull();
  });

  it("returns attribute when there is one specified", async () => {
    const attribute = await getAttributeValue(
      "[data-qa='html-button']",
      "data-qa"
    );
    expect(attribute).toEqual({ attribute: "data-qa", value: "html-button" });
  });

  it("returns attribute when there are multiple specified", async () => {
    const attribute = await getAttributeValue(
      "[data-qa='html-button']",
      "data-qa,data-test"
    );
    expect(attribute).toEqual({ attribute: "data-qa", value: "html-button" });
  });

  it("ignores whitespace in the attribute", async () => {
    const attribute = await getAttributeValue("#html-button", " id ");
    expect(attribute).toEqual({ attribute: "id", value: "html-button" });

    const attribute2 = await getAttributeValue("#html-button", "data-qa, id ");
    expect(attribute2).toEqual({ attribute: "id", value: "html-button" });
  });
});
