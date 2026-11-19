// SPDX-FileCopyrightText: 2026 KTH Royal Institute of Technology.
// SPDX-License-Identifier: MIT

// Keep CRA's TypeScript 4 tooling separate from the current i18next runtime.
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const script = require.resolve("react-scripts/bin/react-scripts.js", {
  paths: [path.join(__dirname, "react-app-tools")],
});
const result = spawnSync(process.execPath, [script, ...process.argv.slice(2)], {
  cwd: process.cwd(),
  env: process.env,
  stdio: "inherit",
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
