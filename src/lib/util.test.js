import { buildUID } from "./util";

describe("buildUID", () => {
  it("should build a UID with only element name", () => {
    expect(buildUID("MyElement")).toBe("MyElement");
  });

  it("should build a UID with element name and overridableId", () => {
    expect(buildUID("MyElement", "custom")).toBe("MyElement.custom");
  });

  it("should build a UID with element name and appName", () => {
    expect(buildUID("MyElement", "", "MyApp")).toBe("MyApp.MyElement");
  });

  it("should build a UID with all parameters", () => {
    expect(buildUID("MyElement", "custom", "MyApp")).toBe("MyApp.MyElement.custom");
  });

  it("should handle empty overridableId correctly", () => {
    expect(buildUID("MyElement", "", "MyApp")).toBe("MyApp.MyElement");
    expect(buildUID("MyElement", "")).toBe("MyElement");
  });

  it("should handle empty appName correctly", () => {
    expect(buildUID("MyElement", "custom", "")).toBe("MyElement.custom");
    expect(buildUID("MyElement", "")).toBe("MyElement");
  });
});
