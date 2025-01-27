import { CONFIG } from "@qawolf/config";
import { QAWolfWeb } from "@qawolf/web";
import { readdir } from "fs-extra";
import { pick } from "lodash";
import { getDevice } from "../../src/context/device";
import { launch } from "../../src/context/launch";

describe("launch", () => {
  it("injects qawolf", async () => {
    const context = await launch({ url: CONFIG.sandboxUrl });

    const isLoaded = () => {
      const qawolf: QAWolfWeb = (window as any).qawolf;
      return !!qawolf;
    };

    const pageZero = await context.page({ page: 0 });
    const zeroIsLoaded = await pageZero.evaluate(isLoaded);
    expect(zeroIsLoaded).toBeTruthy();

    // check it loads on a new page
    await context.newPage();
    const pageOne = await context.page({ page: 1 });
    const oneIsLoaded = await pageOne.evaluate(isLoaded);
    expect(oneIsLoaded).toBeTruthy();

    await context.close();
  });

  it("emulates device", async () => {
    const context = await launch({
      device: "iPhone 7",
      url: CONFIG.sandboxUrl
    });

    const expectedSize = pick(
      getDevice("iPhone 7").viewport,
      "width",
      "height"
    );
    const pageZero = await context.page({ page: 0 });
    expect(pageZero.viewportSize()).toEqual(expectedSize);

    // check it emulates on a new page
    await context.newPage();
    const pageOne = await context.page({ page: 1 });
    expect(pageOne.viewportSize()).toEqual(expectedSize);

    await context.close();
  });

  it("records dom replay", async () => {
    const domFiles = await readdir(CONFIG.artifactPath!);

    expect(
      domFiles.filter((f: string) => f.includes(".html")).length
    ).toBeGreaterThan(0);
  });
});
