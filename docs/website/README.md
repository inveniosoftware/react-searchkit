<!---
  This file is part of React-SearchKit.
  Copyright (C) 2018 CERN.

  React-SearchKit is free software; you can redistribute it and/or modify it
  under the terms of the MIT License; see LICENSE file for more details.
-->

# React-SearchKit Documentation Website

This site is built with [Docusaurus](https://docusaurus.io/) v3.

## Getting Started

```sh
cd docs/website
npm install
npm start        # dev server at http://localhost:3000/react-searchkit/
npm run build    # static site in build/
npm run serve    # serve build/ locally
```

## Directory Structure

```
docs/website/
├── src/
│   ├── pages/          # Custom pages (homepage, help)
│   └── css/            # Global styles & theme overrides
├── static/             # Static assets (images, CSS, JS)
├── docusaurus.config.js
├── sidebars.js
└── package.json
```

## Content

Documentation source files live in `docs/docs/` and are **not** part of this directory. They are referenced via `path: "../docs"` in `docusaurus.config.js`.

- Add or edit docs in `docs/docs/`
- Update the sidebar navigation in `docs/website/sidebars.js`

## Deployment

The static site is built into `build/`. Deploy the `build/` folder to your hosting provider.

---

React-SearchKit is free software; you can redistribute it and/or modify it under the terms of the MIT License.
