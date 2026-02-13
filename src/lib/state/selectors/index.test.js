/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018-2022 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import * as Selectors from "./index";

describe("selectors/index", () => {
  it("should export updateQueryFilters", () => {
    expect(Selectors.updateQueryFilters).toBeDefined();
  });
});
