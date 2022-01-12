import { anyArray, anyString, expect, test } from "../dev_deps.ts";
import { fetchSymbols } from "./symbols.ts";
import { isSnakeCase } from "./_utils.ts";

test("fetchSymbols", async () => {
  await expect(fetchSymbols()).resolves.toEqual({
    code: 1000,
    trace: anyString(),
    message: "OK",
    data: {
      symbols: anyArray(anyString(isSnakeCase)),
    },
  });
});
