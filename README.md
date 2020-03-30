<!--
  This file is part of React-SearchKit.
  Copyright (C) 2018-2019 CERN.

  React-SearchKit is free software; you can redistribute it and/or modify it
  under the terms of the MIT License; see LICENSE file for more details.
-->

# React-SearchKit

[![Build Status](https://img.shields.io/travis/inveniosoftware/react-searchkit)](https://travis-ci.org/inveniosoftware/react-searchkit)
[![Release](https://img.shields.io/npm/v/react-searchkit)](https://www.npmjs.com/package/react-searchkit)
[![License](https://img.shields.io/github/license/inveniosoftware/react-searchkit)](https://github.com/inveniosoftware/react-searchkit/blob/master/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/react-searchkit)](https://www.npmjs.com/package/react-searchkit)
[![Chat](https://img.shields.io/gitter/room/inveniosoftware/invenio)](https://gitter.im/inveniosoftware/invenio)

React-SearchKit is a React library that allows you to build in an easy way your search application.

Main features:

- ready-to-use collection of UI components
- configurable REST API endpoint and serialization
- configurable URL parameters handling for deep linking

![React-SearchKit screenshot](docs/website/static/img/screenshot.png)

## Examples

You can find a collection of examples in the `src/demos` folder:

- Elasticsearch, an example on how to query Elasticsearch (see below)
- Zenodo.org, an example on how to query an Invenio 3 instance
- CERN Videos, another Invenio 3 example

Install dependencies and run the React app to try them out (see steps below).

### Elasticsearch

To run the Elasticsearch backend for the demo, you can use Docker. A `docker-compose` file with `ES 7` and `nginx` as reverse proxy is available and ready to use.
Run the services:

```bash
cd src/demos/elasticsearch/docker
docker-compose up
```

Then, init the demo data:

```bash
curl -XPUT 'http://localhost:9200/random?pretty' -H 'Content-Type: application/json' -d @es7-mappings.json
curl -XPOST 'http://localhost:9200/random/_bulk' -H 'Content-Type: application/json' --data-binary @es-random-data.json
curl -XGET 'http://localhost:9200/random/_count?pretty'
```

Demo data have been randomly generated using <https://next.json-generator.com>.

> In case you want to clear your elastic search from data you can use `curl -X DELETE 'http://localhost:9200/_all'`

## Developer guide

React-SearchKit uses [create-react-app](https://create-react-app.dev/) as development toolkit.

Install the library:

```bash
npm install
```

Start the demo application:

```bash
npm start
```

The library uses [Jest](https://jestjs.io/) as test runner. To run the tests:

```bash
npm test
```

The library uses `rollup` to build a final version inside the `/dist` folder and it will build CommonJS and ES Modules versions:

```bash
npm run build
```
