/*
 * SPDX-FileCopyrightText: 2019 CERN.
 * SPDX-License-Identifier: MIT
 */

import { createRoot } from "react-dom/client";
import App from "./demos/App";
import "semantic-ui-css/semantic.min.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
