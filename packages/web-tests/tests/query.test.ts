import { BrowserContext, launch, Page } from "@qawolf/browser";
import { CONFIG } from "@qawolf/config";
import { QAWolfWeb } from "@qawolf/web";

let context: BrowserContext;
let page: Page;

beforeAll(async () => {
  context = await launch({ url: `${CONFIG.sandboxUrl}login` });
  page = await context.page();
});

afterAll(() => context.close());

describe("queryElements", () => {
  it("returns all elements for click action", async () => {
    const actionElementCount = await page.evaluate(() => {
      const qawolf: QAWolfWeb = (window as any).qawolf;
      const actionElements = qawolf.find.queryElements("click");

      return actionElements.length;
    });

    expect(actionElementCount).toBeGreaterThanOrEqual(12);
  });

  it("returns only input elements for input action", async () => {
    const actionElements = await page.evaluate(() => {
      const qawolf: QAWolfWeb = (window as any).qawolf;
      const actionElements = qawolf.find.queryElements("type");

      return actionElements.map((el: HTMLElement) => qawolf.xpath.getXpath(el));
    });

    expect(actionElements).toEqual([
      "//*[@id='username']",
      "//*[@id='password']"
    ]);
  });

  it("does not include elements that are not visible", async () => {
    const actionElementXpaths = await page.evaluate(() => {
      const qawolf: QAWolfWeb = (window as any).qawolf;
      const username = document.getElementById("username")!;
      username.style.border = "0";
      username.style.padding = "0";
      username.style.width = "0";

      const actionElements = qawolf.find.queryElements("type");

      return actionElements.map((el: HTMLElement) => qawolf.xpath.getXpath(el));
    });

    expect(actionElementXpaths).toEqual(["//*[@id='password']"]);

    await context.goto(`${CONFIG.sandboxUrl}login`); // reset styles
  });
});

describe("queryVisibleElements", () => {
  it("returns only visible elements for a given selector", async () => {
    const visibleElementXpaths = await page.evaluate(() => {
      const qawolf: QAWolfWeb = (window as any).qawolf;
      const username = document.getElementById("username")!;
      username.style.border = "0";
      username.style.padding = "0";
      username.style.width = "0";

      const actionElements = qawolf.find.queryVisibleElements("input");

      return actionElements.map((el: HTMLElement) => qawolf.xpath.getXpath(el));
    });

    expect(visibleElementXpaths).toEqual(["//*[@id='password']"]);
  });
});
