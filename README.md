<!--
  This file is part of React-SearchKit.
  Copyright (C) 2018 CERN.

  React-SearchKit is free software; you can redistribute it and/or modify it
  under the terms of the MIT License; see LICENSE file for more details.
-->

# React-SearchKit

[![Build Status](https://img.shields.io/travis/inveniosoftware/react-searchkit.svg)](https://travis-ci.org/inveniosoftware/react-searchkit)
[![Coveralls coverage](https://img.shields.io/coveralls/inveniosoftware/react-searchkit.svg)](https://coveralls.io/r/inveniosoftware/react-searchkit)
[![Release](https://img.shields.io/npm/v/react-searchkit.svg)](https://www.npmjs.com/package/react-searchkit)
[![License](https://img.shields.io/github/license/inveniosoftware/react-searchkit.svg)](https://github.com/inveniosoftware/react-searchkit/blob/master/LICENSE)


React-SearchKit is a React library that allows you to build in an easy way your search application.
Read more

Main features:

* ready-to-use collection of UI components
* configurable REST API endpoint and serialization
* configurable URL parameters handling

![React-SearchKit screenshot](docs/website/static/img/screenshot.png)

## Demo

The repository includes a `demo` folder with a simple example using ElasticSearch APIs as example.

### How to run the demo

Run ElasticSearch 6 using Docker (see [here](https://www.elastic.co/guide/en/elasticsearch/reference/6.7/docker.html) the documentation):

```console
$ docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e "http.cors.enabled=true" -e "http.cors.allow-origin=*" docker.elastic.co/elasticsearch/elasticsearch:6.7.1
```

Create the index and init the demo data:

```console
$ cd react-searchkit
$ ./demo/init.sh
```

Run the React-SearchKit demo app:

```console
$ npm install
$ npm start
```

The browser should open automatically, otherwise open a new browser window at the address <http://localhost:3000>.

## Developer guide

React-SearchKit uses [nwb](https://github.com/insin/nwb) as development toolkit.

The library uses [Jest](https://jestjs.io/) as test runner. To run the tests:

```
npm test
```

### Integration with hot reloading

If you need to integrate React-SearchKit in your application but in the meantime be able to edit the library, you can do the following.

Create a global link of React-SearchKit:

```
cd react-searchkit
npm link
```

Use the global link in your application:

```
cd myapplication
npm link react-searchkit
```

Start the react-searchkit build with hot reloading:

```
npm run build:watch
```
