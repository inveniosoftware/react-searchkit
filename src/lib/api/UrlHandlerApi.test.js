/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import Qs from "qs";
import { UrlHandlerApi } from ".";

class MockedUrlParser {
  parse = (queryString = "") => {
    return Qs.parse(queryString, { ignoreQueryPrefix: true });
  };
}

class MockedUrlParamValidator {
  isValid = () => {
    return true;
  };
}

describe("test UrlHandlerApi", () => {
  describe("test injected configuration", () => {
    it("should use the provided configuration", () => {
      const expectedUrlParamsMapping = {
        queryString: "q1",
        sortBy: "sort1",
        sortOrder: "order1",
        page: "p1",
        size: "s1",
        layout: "l1",
        filters: "f1",
      };
      const expectedKeepHistory = false;
      const expectedUrlParamValidator = new MockedUrlParamValidator();
      const expectedUrlParser = new MockedUrlParser();
      const expectedUrlFilterSeparator = "-";

      const expectedFromUrlParamsMapping = {};
      Object.keys(expectedUrlParamsMapping).forEach((stateKey) => {
        expectedFromUrlParamsMapping[expectedUrlParamsMapping[stateKey]] = stateKey;
      });

      const handler = new UrlHandlerApi({
        urlParamsMapping: expectedUrlParamsMapping,
        keepHistory: expectedKeepHistory,
        urlParamValidator: expectedUrlParamValidator,
        urlParser: expectedUrlParser,
        urlFilterSeparator: expectedUrlFilterSeparator,
      });

      expect(handler.urlParamsMapping).toMatchObject(expectedUrlParamsMapping);
      expect(handler.fromUrlParamsMapping).toMatchObject(expectedFromUrlParamsMapping);
      expect(handler.keepHistory).toBe(expectedKeepHistory);
      expect(handler.urlParamValidator).toBe(expectedUrlParamValidator);
      expect(handler.urlParser).toBe(expectedUrlParser);
      expect(handler.urlFilterSeparator).toBe(expectedUrlFilterSeparator);
    });

    it("should throw error when wrong configuration provided", () => {
      expect(() => {
        new UrlHandlerApi({
          keepHistory: "history",
        });
      }).toThrow();

      expect(() => {
        new UrlHandlerApi({
          urlFilterSeparator: true,
        });
      }).toThrow();
    });
  });

  describe("test url params", () => {
    const { history, location } = window;

    beforeEach(() => {
      delete window.history;
      delete window.location;
      window.history = { pushState: jest.fn(), replaceState: jest.fn() };
      window.location = {
        search: "",
      };
    });

    afterEach(() => {
      window.history = history;
      window.location = location;
    });

    describe("test get url params", () => {
      it("should parse correctly string and int from url params", () => {
        const validURLSearch = "?q=text&s=15&p=3";
        window.location.search = validURLSearch;

        const currentQueryState = {
          queryString: "",
          size: -1,
          page: -1,
        };
        const handler = new UrlHandlerApi();
        const newQueryState = handler.get(currentQueryState);

        expect(newQueryState).toMatchObject({
          queryString: "text",
          size: 15,
          page: 3,
        });
        expect(typeof newQueryState["queryString"]).toEqual("string");
        expect(typeof newQueryState["size"]).toEqual("number");
        expect(typeof newQueryState["page"]).toEqual("number");
      });

      it("should parse correctly complex query strings from url params", () => {
        const handler = new UrlHandlerApi();

        function doTest(locationSearch, expectedQueryString) {
          window.location.search = locationSearch;
          const currentQueryState = {
            queryString: "",
          };
          const newQueryState = handler.get(currentQueryState);

          expect(newQueryState).toMatchObject({
            queryString: expectedQueryString,
          });
          expect(typeof newQueryState["queryString"]).toEqual("string");
        }

        doTest("?q=123", "123");
        doTest("?q=true", "true");
        doTest("?q=%22text%22", '"text"');
        doTest(
          "?q=text%20OR%20%22another%20text%22%20OR%20title%3A%22text%22",
          'text OR "another text" OR title:"text"'
        );
        doTest("?q=10.7483%2FADOI.9S5F.BY3B", "10.7483/ADOI.9S5F.BY3B");
      });

      it("should merge the current query state with the url params", () => {
        const validURLSearch = "?q=test&f=category%3Avideo";
        window.location.search = validURLSearch;

        const currentQueryState = {
          queryString: "",
          filters: [],
        };
        const handler = new UrlHandlerApi();
        const newQueryState = handler.get(currentQueryState);

        expect(newQueryState).toMatchObject({
          queryString: "test",
          filters: [["category", "video"]],
        });
        expect(window.history.pushState).toHaveBeenCalledTimes(0);
        expect(window.history.replaceState).toHaveBeenCalledWith(
          { path: validURLSearch },
          "",
          validURLSearch
        );
      });

      it("should ignore any other extra url params", () => {
        const validURLSearch = "?q=test";
        window.location.search = `${validURLSearch}&a=b`;

        const currentQueryState = {
          queryString: "",
        };
        const handler = new UrlHandlerApi();
        const newQueryState = handler.get(currentQueryState);

        expect(newQueryState).toMatchObject({
          queryString: "test",
        });
        expect(window.history.pushState).toHaveBeenCalledTimes(0);
        expect(window.history.replaceState).toHaveBeenCalledWith(
          { path: validURLSearch },
          "",
          validURLSearch
        );
      });
    });

    describe("test set url params", () => {
      it("should push url params with the new state", () => {
        window.location.search = `?q=test&a=b`;

        const currentQueryState = {
          queryString: "",
          page: 1,
          size: 10,
        };
        const handler = new UrlHandlerApi();
        handler.set(currentQueryState);

        const newValidURLSearch = `?q=&p=1&s=10`;
        expect(window.history.replaceState).toHaveBeenCalledTimes(0);
        expect(window.history.pushState).toHaveBeenCalledWith(
          { path: newValidURLSearch },
          "",
          newValidURLSearch
        );
      });

      it("should replace url params with the new state", () => {
        window.location.search = `?q=test&a=b`;

        const currentQueryState = {
          queryString: "",
          page: 1,
          size: 10,
        };
        const handler = new UrlHandlerApi({ keepHistory: false });
        handler.set(currentQueryState);

        const newValidURLSearch = `?q=&p=1&s=10`;
        expect(window.history.pushState).toHaveBeenCalledTimes(0);
        expect(window.history.replaceState).toHaveBeenCalledWith(
          { path: newValidURLSearch },
          "",
          newValidURLSearch
        );
      });
    });

    describe("test filters child separator", () => {
      it("should parse filters when different separator provided", () => {
        window.location.search = "?q=test&f=category%3Avideo-video%3Anew&f=type%3Apdf";

        const currentQueryState = {
          queryString: "",
          filters: [],
        };
        const handler = new UrlHandlerApi({ urlFilterSeparator: "-" });
        const newQueryState = handler.get(currentQueryState);

        expect(newQueryState).toMatchObject({
          queryString: "test",
          filters: [
            ["category", "video", ["video", "new"]],
            ["type", "pdf"],
          ],
        });
      });
    });

    describe("test filters errors", () => {
      it("should filter the parameter when wrong format", () => {
        window.location.search = "?q=test&f=category-video";

        const currentQueryState = {
          queryString: "",
          filters: [],
        };

        const handler = new UrlHandlerApi({
          urlFilterSeparator: "-",
        });
        const newQueryState = handler.get(currentQueryState);

        expect(newQueryState).toMatchObject({
          queryString: "test",
          filters: [],
        });
      });
    });
  });
});
