import { buildInitialCode } from "../src/buildInitialCode";

const launchOptions = {
  name: "login",
  patchHandle: "MY_PATCH_HANDLE",
  url: "http://localhost"
};

describe("buildInitialCode", () => {
  it("builds a script for a workflow", async () => {
    let code = buildInitialCode({
      ...launchOptions,
      isTest: false
    });
    expect(code).toMatchSnapshot();

    code = buildInitialCode({
      ...launchOptions,
      device: "iPhone 7",
      isTest: false
    });
    expect(code).toMatchSnapshot();
  });

  it("builds a test for a workflow", async () => {
    let code = buildInitialCode({ ...launchOptions, isTest: true });
    expect(code).toMatchSnapshot();

    code = buildInitialCode({
      ...launchOptions,
      device: "iPhone 7",
      isTest: true
    });
    expect(code).toMatchSnapshot();
  });
});
