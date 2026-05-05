/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2019 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { createRoot } from "react-dom/client";
import App from "./demos/App";
import "semantic-ui-css/semantic.min.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
