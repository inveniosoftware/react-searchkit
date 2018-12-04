---
id: main-concepts
title: Main Concepts
---

## App Structure

The application is split in 3 main parts:

* `UI Components`: components built with React.
* `App State`: application state built with Redux.
* `API`: layer to interact with REST APIs and the browser URL query string.

---

## UI Components

Components interact with the app using the standard Redux data flow. Each component is connected to part of the application state and receives only the data and the actions that it needs and should responsible for.
For example, the `SearchBar` component receives the current query string stored in the state and can perform the action to update it.

Some components do have also extra properties, such as default values. For example, the `SortBy` component receive a prop `defaultValue`: when mounting the component, the action to set the initial state for `sortBy` will be called.

You can find the list of components in the [Components](components/react_searck_kit.md) section.

### Look And Feel

By default, `React-SearchKit` uses [Semantic UI for React](https://react.semantic-ui.com/) to have a nice look and feel out of the box. However, you can override each component template by using the `renderElement` prop and provide your own function to render React components or simple HTML.

Read the [UI Customisation](ui_customisation.md) documentation for a detailed guide.

---

## App State

The application state is divided in 2 parts:

* `query`: it contains the user selections, the input for a search action
* `results`: it contains the results after an API call, the output of a search action

```js
state = {
    query: {
        queryString: '',
        sortBy: null,
        sortOrder: null,
        page: null,
        size: null,
        aggregations: [],
        layout: null,
    },
    results: {
        loading: false,
        data: {
            hits: [],
            total: 0,
            aggregations: {},
        },
        error: {},
    }
}
```

> Important: the app state is a fixed structure that can be changed by the components only through the available Redux actions. If you have the need to add extra state, follow the [Custom State](custom_state.md) guide.

### Query

The `query` state stores the user selection and it has the following structure:

* `queryString`: a string to store the user input for the query string.
* `page`: an integer to store the page of results to show.
* `size`: an integer to store how many results per page to show.
* `sortBy`: a string to store by which field results should be sort.
* `sortOrder`: a string to store in which order the results are sort, for example `ascending` or `descending`.
* `layout`: a string to store how the list of results is displayed, for example `list` or `grid`.
* `aggregations`: a complex array to store for which group of aggregations the results are shown.

Each component accesses to the fields of the app state it needs, renders the UI component according to the user selection and react to user input by calling predefined actions which will change the state.

> Note: even if the structure of the state is rigid, not all values are used or set by the app. Depending on which component you are going to use or implement, only a subset of the state is changed. It is the responsibility of the API layer to decide what state fields to use when performing the request.

### Results

The `results` state stores the results retrieved in response to a REST APIs request and it has the following structure:

* `loading`: a boolean to store if the network request is happening
* `data`:
    * `hits`: an array to store all results.
    * `total`: an integer to store the total number of results, normally it should correspond to `hits.length`.
    * `aggregations`: an object to store the groups of results. Aggregations will be explained later on in the guide.
* `error`: an object to store what went wrong in the last network call to provide value feedback to the user.

API responses will update this part of the state. Components that are connected to specific part of the `results` state will be automatically re-rendered with the values.

---

## API

The API layer contains 2 components:

* `SearchAPI`: an object to serialize the `query` state to search requests for your REST APIs and serialize back responses to change the `results` state.
* `UrlParamsAPI`: an object to serialize the `query` state to update the browser URL query string and vice versa.

> Note: given that the state is rigid, it is very important that the serialization of the responses complies with the `results` state structure.

The concept around `SearchAPI` and `UrlParamsAPI` will be explained in the next guides.

---

## TL;DR

* UI Components change the `query` state through Redux actions in response to user inputs. They receive `results` after a REST APIs search through props injected automatically by Redux.
* The REST APIs implementation is responsible of serializing the `query` state in a format understandable by your REST APIs and serialize the response back to change the `results` state.
