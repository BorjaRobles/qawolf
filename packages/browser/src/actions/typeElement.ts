import { logger } from "@qawolf/logger";
import { TypeOptions } from "@qawolf/types";
import { isNil, sleep } from "@qawolf/web";
import { ElementHandle, Page as PlaywrightPage } from "playwright";
import { selectElementContent } from "./selectElementContent";
import { deserializeStrokes } from "../keyboard";

export const typeElement = async (
  page: PlaywrightPage,
  elementHandle: ElementHandle,
  value: string | null,
  options: TypeOptions = {}
): Promise<void> => {
  logger.verbose("typeElement: focus");

  await elementHandle.evaluate(element => {
    console.log("qawolf: type into", element);
  });

  await elementHandle.focus();

  let text = value || "";

  if (options.replace) {
    await selectElementContent(elementHandle);

    // default empty value to backspace when options.replace = true
    if (!value) text = "↓Backspace↑Backspace";
  } else {
    await elementHandle.evaluate((element: HTMLElement) => {
      // blur will fix the placement for date inputs
      element.blur();
      element.focus();

      if ((element as HTMLInputElement).setSelectionRange) {
        try {
          // more caret to end of inputs / text areas
          const len = (element as HTMLInputElement).value.length;
          (element as HTMLInputElement).setSelectionRange(len, len);
        } catch (e) {}
        return;
      }

      // place caret at end of content editable
      // https://stackoverflow.com/a/4238971/230462
      if (
        !element.isContentEditable ||
        !window.getSelection ||
        !document.createRange
      )
        return;

      const selection = window.getSelection();
      if (!selection) return;
      selection.removeAllRanges();

      const range = document.createRange();
      range.selectNodeContents(element);
      range.collapse(false);
      selection.addRange(range);
    });
  }

  const strokes = deserializeStrokes(text);

  if (!strokes) {
    // type seems to work better than sendCharacters so use it when possible
    // https://github.com/microsoft/playwright/issues/1057
    await elementHandle.type(text);
    return;
  }

  // logging the keyboard codes below will leak secrets
  // which is why we have it hidden behind the DEBUG flag
  // since we default logs to VERBOSE
  for (const stroke of strokes) {
    if (stroke.type === "↓") {
      logger.debug(`keyboard.down("${stroke.value}")`);
      await page.keyboard.down(stroke.value);
      await sleep(isNil(options.delayMs) ? 300 : 0);
    } else if (stroke.type === "↑") {
      logger.debug(`keyboard.up("${stroke.value}")`);
      await page.keyboard.up(stroke.value);
      await sleep(isNil(options.delayMs) ? 300 : 0);
    } else if (stroke.type === "→") {
      logger.debug(`keyboard.sendCharacter("${stroke.value}")`);
      await page.keyboard.sendCharacters(stroke.value);
      await sleep(options.delayMs || 0);
    }
  }
};
