import { FindElementOptions, Selector } from "@qawolf/types";
import { Page } from "playwright";
import { find } from "./find";

export const findProperty = async (
  page: Page,
  selector: Selector,
  property: string,
  options: FindElementOptions
): Promise<string | null | undefined> => {
  const element = await find(page, selector, options);

  const propertyHandle = await element.getProperty(property);
  if (!propertyHandle) return undefined;

  const propertyValue = await propertyHandle.jsonValue();
  return propertyValue;
};
