import matchers from "@testing-library/jest-dom/matchers.js";
import { beforeAll, afterEach, afterAll, expect } from "vitest";
import { server } from "./src/mocks/server.js";
import "whatwg-fetch";

expect.extend(matchers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
