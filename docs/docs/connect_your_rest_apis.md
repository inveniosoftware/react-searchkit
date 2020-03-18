---
id: connect-your-rest-apis
title: Connect Your REST APIs
---

React-SearchKit comes out of the box with a working adapter for [Elasticsearch 7](https://www.elastic.co/) and [Invenio](https://inveniosoftware.org) REST APIs. However, the library has been designed to allow the creation of custom adapters to plug in any REST API service.

There are 2 ways of connecting your REST APIs:

* if you plan to use one of the available, just configure URL, headers, request and response serializers via props.
* if you have a different backend or you need full control on API requests/responses, you can implement your own adapter.

## Use one of the available

The `Elasticsearch` adapter can be configured by passing an object. The configuration will be injected directly in the [axios](https://github.com/axios/axios) instance used under the hood to perform network requests.

```jsx
const searchApi = new ESSearchApi({
  axios: {
    url: 'https://my.es.backend.org/search/',
    timeout: 5000,
  }
});

class App extends Component {
  render() {
    return (
      <ReactSearchKit searchApi={searchApi}>
        ...
      </ReactSearchKit>
    )
  }
}
```

> Note: the configuration fields need to be named as `axios` expects them.

The `Invenio` adapter works in a very similar way:

```jsx
const searchApi = new InvenioSearchApi({
  axios: {
    url: 'https://zenodo.org/api/records/',
    timeout: 5000,
    headers: { Accept: 'application/vnd.zenodo.v1+json' },
  }
});

class App extends Component {
  render() {
    return (
      <ReactSearchKit searchApi={searchApi}>
        ...
      </ReactSearchKit>
    )
  }
}
```

### Serialization

You can define your own `requestSerializer` and `responseSerializer` objects. They will be called before the request to serialize the user input and after to serialize the REST API response.

The `requestSerializer` implements the `serialize` method accepting the `query` state as parameter: its responsibility is to transform the query state to the request payload used by `axios` to perform the network request.
For example, an implementation of the request serializer could be:

```js
class MyRequestSerializer {
  serialize = stateQuery => {
    const { queryString, sortBy, sortOrder, page, size, aggregations } = stateQuery;
    const payload = ... // map the parameters to the request payload
    return payload;
  }
}
```

The `responseSerializer` implements the `serialize` method called with the `axios` response payload as parameter and it returns an object with the following format:

* `hits`: the list of results
* `total`: the number of results
* `aggregations`: an object with results groups (see more details in the related part of the documentation)

For example, an implementation of the response serializer could be:

```js
class MyResponseSerializer {
  serialize = payload => {
    return {
      hits: payload.results.map(result => ...),
      total: payload.results.length,
      aggregations: {}
    }
  }
}
```

Custom serializers can then be injected in the configuration of the adapter:

```jsx
const MyRequestSerializer = new MyRequestSerializer();
const MyResponseSerializer = new MyResponseSerializer();

const searchApi = new ESSearchAPI({
  axios: {
    url: 'https://my.es.backend.org/search/',
    timeout: 5000,
  },
  es: {
    requestSerializer: MyRequestSerializer,
    responseSerializer: MyResponseSerializer,
  },
});

class App extends Component {
  render() {
    return (
      <ReactSearchKit searchApi={searchApi}>
        ...
      </ReactSearchKit>
    )
  }
}
```

---

## Implement a new adapter

If you need to have full control on the network request/response, you can implement your own adapter.
The object needs to implement a `search` method expecting the `query` state as parameter and return a result object as documented in the `responseSerializer` above.

For example, a new adapter could be:

```js
class MySearchAPI {
  constructor() {
    this.url = 'https://api.myendpoint.org/';
  }

  search = async stateQuery => {
    ...
    const response = // perform network request
    const stateResults = // serialize response
    return stateResults
  }

}
```

The new adapter is injected as prop in the main component:

```jsx
const mySearchApi = new MySearchAPI();

class App extends Component {
  render() {
    return (
      <ReactSearchKit searchApi={mySearchApi}>
        ...
      </ReactSearchKit>
    )
  }
}
```

---

## TL;DR

* You can use available adapters and provide your own configuration
* You can create your own API adapter by implementing a new class and inject it as prop `searchApi` in the main component
