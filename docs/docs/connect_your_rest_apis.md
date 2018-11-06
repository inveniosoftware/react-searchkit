---
id: connect-your-rest-apis
title: Connect Your REST APIs
---

React-SearchKit comes out of the box with a working connection to [Invenio](https://inveniosoftware.org) REST APIs. However, the React-SearchKit has been designed to allow connecting any other REST APIs.

There are 2 ways of defining the connection to your REST APIs:

* configure simple parameters, like URL, headers, request and response serializers.
* have full control on API requests/responses and implement your own connector.

## Configure SearchAPI

The `SearchAPI` object can be configured by injecting the prop `searchConfig` in the main component `ReactSearchKit`. The provided configuration will be then passed directly to the [axios](https://github.com/axios/axios) instance used under the hood to perform network request.

```jsx
<ReactSearchKit
  searchConfig={{
    url: 'https://api.myendpoint.org/',
    timeout: 5000,
    headers: {},
  }}
>
  ...
</ReactSearchKit>
```

> Note: the `searchConfig` fields need to be named as `axios` expect them.

### Serialization

You can define your own `requestSerializer` and `responseSerializer` objects. They will be called before the request to serialize the user input and after to serialize the REST API response.

The `requestSerializer` implements the `serialize` method called with the `query` state as parameter and it returns the payload used by `axios` to perform the network request.
For example, an implementation of the request serializer could be:

```js
class MyRequestSerializer {
  serialize = stateQuery => {
    const { queryString, sortBy, sortOrder, page, size, aggregations } = stateQuery;
    const payload = ... // map the parameters to your request payload
    return payload;
  }
}
```

The `responseSerializer` implements the `serialize` method called with the `axios` response payload as parameter and it returns an object with the following format:

* `hits`: the list of results
* `total`: the number of results
* `aggregations`: an object with results groups (it will be explained later on)

For example, an implementation of the response serializer could be:

```js
class MyResponseSerializer {
  serialize = payload => {
    return {
      hits: [ ... ],
      total: ...
      aggregations: {}
    }
  }
}
```

Serializers are injected in the main component:

```jsx
const myRequestSerializer = new MyRequestSerializer();
const myResponseSerializer = new MyResponseSerializer();

<ReactSearchKit
  searchConfig={{
    url: 'https://api.myendpoint.org/',
    timeout: 5000,
    headers: {},
    requestSerializer: myRequestSerializer,
    responseSerializer: myResponseSerializer,
  }}
>
  ...
</ReactSearchKit>
```

---

## Implement a new connector

If you need to have full control on the network request/response, you can implement your own connector.
The object needs to implement a `search` method expecting the `query` state as parameter and returning a result object as documented in the `responseSerializer` above.

For example, a new connector could be:

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

The new connector is injected in the main component:

```jsx
const mySearchApi = new MySearchAPI();

<ReactSearchKit
  searchApi={mySearchApi}
>
  ...
</ReactSearchKit>
```

---

## TL;DR

* You can override specific config providing a `searchConfig` object injected as prop in the main component
* You can implement your own API connector by implementing the same interface as `SearchAPI` and inject it as prop `searchApi` in the main component
