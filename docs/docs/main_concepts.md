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

Some components do have also extra properties, such as default values. For example, the `SortBy` component receive a prop `defaultValue`: when mounting the component, a specific action will be fired to set the provided value as the initial state for the `sortBy` field.

You can find the list of components in the [Components](components/react_search_kit.md) section.

### Look And Feel

By default, `React-SearchKit` uses [Semantic UI for React](https://react.semantic-ui.com/) to have a nice look and feel out of the box. However, you can override each component template by using the `renderElement` prop and provide your own function to render React components or simple HTML.

Read the [UI Customisation](ui_customisation.md) documentation for a detailed guide.

---

## App State

The application state is divided in 2 parts:

* `query`: it contains the user selections, all input for a search action
* `results`: it contains the results after an API call, the output of a search action

```js
state = {
    query: {
        queryString: '',
        sortBy: null,
        sortOrder: null,
        page: 1,
        size: 10,
        filters: [],
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

> Important: the app state is a fixed structure. Each value can be changed by the components only through the available Redux actions. If you have the need to add extra state, follow the [Extend State](extend_state.md) guide.

### Query

The `query` state stores the user selection and it has the following structure:

* `queryString`: a string to store the user input for the query string.
* `page`: an integer to store the page of results to show.
* `size`: an integer to store how many results per page to show.
* `sortBy`: a string to store by which field results should be sort.
* `sortOrder`: a string to store in which order the results are sort, for example `ascending` or `descending`.
* `layout`: a string to store how the list of results is displayed, for example `list` or `grid`.
* `filters`: a complex array to store the user selected filters for the available aggregations. Filters and aggregations will be explained later on in the guide.

Each component accesses to the fields of the app state that it needs, renders the UI component according to the user selection and react to user input by calling predefined actions.

> Note: even if the structure of the state is rigid, not all values are used or set by the app. Depending on which component you are going to use or implement, only a subset of the state is changed. It is the responsibility of the API layer to decide what state fields to use when performing the APIs request.

### Results

The `results` state stores the results retrieved in response to a HTTP search request and it has the following structure:

* `loading`: a boolean to store if the network request is happening
* `data`:
    * `hits`: an array to store all results.
    * `total`: an integer to store the total number of results, normally it should correspond to `hits.length`.
    * `aggregations`: an object to store the groups of results. Filters and aggregations will be explained later on in the guide.
* `error`: an object to store what went wrong in the last network request, useful to provide a feedback to the user.

API responses will update this part of the state. Components that are connected to specific part of the `results` state will be automatically re-rendered on each HTTP request.

---

## API

The API layer is composed of:

* `SearchAPI`: adapter for HTTP requests. Available in 2 flavors, for Elasticsearch and Invenio, it is responsible of serializing the `query` state to search requests for your REST APIs and serialize back responses to mutate the `results` state.
* `UrlHandlerApi`: an object capable of serializing the `query` state to the URL query string and vice versa, very useful for deep linking.

> Note: given the structure of the Redux state, responses serialization must be adapted to the `results` state structure.

The concept around `SearchAPI` and `UrlHandlerApi` will be explained more in details in the next guides.

---

---

## Events

You can control the app state externally using available events in `React-SearchKit`:

* `queryChanged`: `React-SearchKit` listens to this event and updates the `query` state based on the payload of the event. `React-SearchKit` will ignore any field that is passed and is not part of the store's keys.

> Note: By default `React-SearchKit` is not registering any event. To enable this behaviour you need to pass in the root component the below variable:

```jsx
class MyReactSearchKit extends Component {
  render() {
    return (
      <ReactSearchKit {...this.props} eventListenerEnabled={true}>
        {this.props.children}
      </ReactSearchKit>
    );
  }
}
```

In order to trigger the `queryChanged` event you can use the `onQueryChanged` emitter function that is part the `React-SearchKit` library. For example:


```jsx
import { onQueryChanged } from 'react-searchkit';

class MyExternalApp extends Component {
    render() {
        return (
        <Button onClick={() => onQueryChanged({queryString: 'search'})}>Trigger Search</Button>
        );
    }
}

class MyReactSearchKit extends Component {
  render() {
    return (
      <ReactSearchKit {...requiredProps} searchOnInit={false} eventListenerEnabled={true}>
        {this.props.children}
      </ReactSearchKit>
    );
  }
}

class MyApp extends Component {
    render() {
        return (
            <>
                <MyExternalApp />
                <MyReactSearchKit />
            </>
        )
    }
}
```

---

## TL;DR

* UI Components change the `query` state through Redux actions in response to user inputs. They receive the updated `results` state after a REST APIs search through props injected automatically by Redux.
* The REST APIs implementation is responsible of serializing the `query` state in a format understandable by your REST APIs and serialize the response back to change the `results` state.
