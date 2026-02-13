import { UrlParamValidator } from "./UrlParamValidator";

describe("UrlParamValidator", () => {
  const validator = new UrlParamValidator();
  const mockUrlHandler = {
    urlFilterSeparator: "-",
  };

  describe("isValid", () => {
    it("should validate 'queryString' parameter correctly", () => {
      expect(validator.isValid(mockUrlHandler, "queryString", "test query")).toBe(true);
      expect(validator.isValid(mockUrlHandler, "queryString", "")).toBe(true);
      expect(validator.isValid(mockUrlHandler, "queryString", "search")).toBe(true);
    });

    it("should validate 'sortBy' parameter correctly", () => {
      expect(validator.isValid(mockUrlHandler, "sortBy", "bestmatch")).toBe(true);
      expect(validator.isValid(mockUrlHandler, "sortBy", "name")).toBe(true);
      expect(validator.isValid(mockUrlHandler, "sortBy", "date")).toBe(true);
    });

    it("should validate 'sortOrder' parameter correctly", () => {
      expect(validator.isValid(mockUrlHandler, "sortOrder", "asc")).toBe(true);
      expect(validator.isValid(mockUrlHandler, "sortOrder", "desc")).toBe(true);
      expect(validator.isValid(mockUrlHandler, "sortOrder", "other")).toBe(false);
      expect(validator.isValid(mockUrlHandler, "sortOrder", "")).toBe(false);
    });

    it("should validate 'page' parameter correctly", () => {
      expect(validator.isValid(mockUrlHandler, "page", 1)).toBe(true);
      expect(validator.isValid(mockUrlHandler, "page", 10)).toBe(true);
      expect(validator.isValid(mockUrlHandler, "page", 100)).toBe(true);
      expect(validator.isValid(mockUrlHandler, "page", 0)).toBe(false);
      expect(validator.isValid(mockUrlHandler, "page", -1)).toBe(false);
    });

    it("should validate 'size' parameter correctly", () => {
      expect(validator.isValid(mockUrlHandler, "size", 10)).toBe(true);
      expect(validator.isValid(mockUrlHandler, "size", 100)).toBe(true);
      expect(validator.isValid(mockUrlHandler, "size", 1)).toBe(true);
      expect(validator.isValid(mockUrlHandler, "size", 0)).toBe(false);
      expect(validator.isValid(mockUrlHandler, "size", -1)).toBe(false);
    });

    it("should validate 'layout' parameter correctly", () => {
      expect(validator.isValid(mockUrlHandler, "layout", "list")).toBe(true);
      expect(validator.isValid(mockUrlHandler, "layout", "grid")).toBe(true);
      expect(validator.isValid(mockUrlHandler, "layout", "other")).toBe(false);
      expect(validator.isValid(mockUrlHandler, "layout", "")).toBe(false);
    });

    it("should validate 'filters' parameter correctly", () => {
      expect(validator.isValid(mockUrlHandler, "filters", ["type:paper"])).toBe(true);
      expect(validator.isValid(mockUrlHandler, "filters", ["type:book"])).toBe(true);
      expect(validator.isValid(mockUrlHandler, "filters", ["status:open"])).toBe(true);
      expect(
        validator.isValid(mockUrlHandler, "filters", ["type:paper", "status:open"])
      ).toBe(true);
      expect(validator.isValid(mockUrlHandler, "filters", ["type-paper"])).toBe(false);
      expect(validator.isValid(mockUrlHandler, "filters", ["type"])).toBe(false);
      expect(validator.isValid(mockUrlHandler, "filters", ["type:"])).toBe(true); // empty value is valid
      expect(validator.isValid(mockUrlHandler, "filters", [":paper"])).toBe(true); // empty key is valid
    });

    it("should validate single filter value", () => {
      expect(validator.isValid(mockUrlHandler, "filters", "type:paper")).toBe(true);
      expect(validator.isValid(mockUrlHandler, "filters", "status:open")).toBe(true);
    });

    it("should validate 'hiddenParams' parameter correctly", () => {
      expect(validator.isValid(mockUrlHandler, "hiddenParams", ["type:paper"])).toBe(
        true
      );
      expect(validator.isValid(mockUrlHandler, "hiddenParams", "type:book")).toBe(true);
    });

    it("should return false for unknown parameters", () => {
      expect(validator.isValid(mockUrlHandler, "unknown", "value")).toBe(false);
      expect(validator.isValid(mockUrlHandler, "random", "test")).toBe(false);
    });

    it("should handle filters with custom separator", () => {
      const customUrlHandler = {
        urlFilterSeparator: ",",
      };
      expect(validator.isValid(customUrlHandler, "filters", ["type:paper"])).toBe(true);
      expect(validator.isValid(customUrlHandler, "filters", ["status:open"])).toBe(
        true
      );
      expect(
        validator.isValid(customUrlHandler, "filters", ["type:paper,status:open"])
      ).toBe(true);
      expect(
        validator.isValid(customUrlHandler, "filters", ["type:paper", "status:open"])
      ).toBe(true);
    });
  });
});
