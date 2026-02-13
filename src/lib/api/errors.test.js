/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { RequestCancelledError } from "./errors";

describe("RequestCancelledError", () => {
  it("should create an instance of RequestCancelledError", () => {
    const error = new RequestCancelledError();
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(RequestCancelledError);
  });

  it("should have Error prototype chain", () => {
    const error = new RequestCancelledError();
    expect(error instanceof Error).toBe(true);
  });

  it("should have name property from Error", () => {
    const error = new RequestCancelledError();
    expect(error.name).toBe("Error");
  });

  it("should have message property like Error", () => {
    const error = new RequestCancelledError();
    expect(error.message).toBeDefined();
  });

  it("should be throwable and catchable", () => {
    expect(() => {
      throw new RequestCancelledError();
    }).toThrow(RequestCancelledError);
  });

  it("should be catchable as Error", () => {
    expect(() => {
      throw new RequestCancelledError();
    }).toThrow(Error);
  });

  it("should work in try-catch as Error", () => {
    let caughtError;
    try {
      throw new RequestCancelledError();
    } catch (e) {
      caughtError = e;
    }
    expect(caughtError).toBeInstanceOf(Error);
    expect(caughtError).toBeInstanceOf(RequestCancelledError);
  });
});
