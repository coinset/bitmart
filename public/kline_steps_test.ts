import { anyArray, anyNumber, anyString, expect, test } from "../dev_deps.ts";
import { fetchKlineSteps } from "./kline_steps.ts";

test("fetchKlineSteps", async () => {
  await expect(fetchKlineSteps()).resolves.toEqual({
    code: 1000,
    trace: anyString(),
    message: "OK",
    data: {
      steps: anyArray(anyNumber()),
    },
  });
});
