import { CONFIG } from "@qawolf/config";
import { BrowserContext, launch, Page } from "../../src";
import { hasText } from "../../src/find/hasText";

let context: BrowserContext;
let page: Page;

beforeAll(async () => {
  context = await launch({ url: `${CONFIG.sandboxUrl}login` });
  page = await context.page();
});

afterAll(() => context.close());

describe("BrowserContext.click", () => {
  it("clicks on paragraph in button", async () => {
    const hasInvalidUsernameText = await hasText(page, "username is invalid", {
      timeoutMs: 250
    });
    expect(hasInvalidUsernameText).toBe(false);

    await context.click({ html: "<p>Log in</p>" });

    const hasInvalidUsernameText2 = await hasText(page, "username is invalid");
    expect(hasInvalidUsernameText2).toBe(true);
  });
});

describe("Page.click", () => {
  it("clicks on link", async () => {
    await page.goto(CONFIG.sandboxUrl);

    await Promise.all([
      page.waitForNavigation(),
      page.qawolf().click({ html: "<a>Buttons</a>" })
    ]);

    expect(page.url()).toBe(`${CONFIG.sandboxUrl}buttons`);
  });

  it("clicks on a custom element", async () => {
    const clickPromise = page.evaluate(() => {
      customElements.define(
        "custom-element",
        class extends HTMLElement {
          constructor() {
            super();

            // create a custom element without a click method
            // this was somehow encountered by a user in our gitter
            // so we want to make sure it works
            (this as any).click = undefined;
          }
        }
      );

      const customElement = document.createElement("custom-element");
      customElement.innerText = "custom element";
      document.body.appendChild(customElement);

      return new Promise(resolve => (customElement.onclick = resolve));
    });

    await page.qawolf().click({
      html: "<custom-element>custom element</custom-element>"
    });

    await clickPromise;
  });
});
