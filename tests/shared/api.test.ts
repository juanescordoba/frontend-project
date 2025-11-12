import { api } from "../../src/shared/api";

describe("api config", () => {
  it("should have baseURL set correctly", () => {
    expect(api.defaults.baseURL).toBe("https://swapi.dev/api");
  });
});
