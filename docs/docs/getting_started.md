---
id: getting-started
title: Getting Started
---

## Create a new app

Let's create a simple search app using [create-react-app](https://github.com/facebook/create-react-app):

```console
npx create-react-app search-app
cd search-app
```

Then, install the React-SearchKit.

```console
npm install react-searchkit
```

## Bootstrap it

Open the App component `src/App.js` file and add the main `react-searchkit` component.

First, import the main component `ReactSearchKit`.
```jsx
import { ReactSearchKit } from "react-searchkit";
```

Then, replace the content of `render()` to render [ReactSearchKit](components/react_search_kit.md). You should have something similar to:

```jsx
import React, { Component } from "react";
import { ReactSearchKit } from "react-searchkit";

class App extends Component {
  render() {
    return (
      <ReactSearchKit>
        <h1>My search UI</h1>
      </ReactSearchKit>
    );
  }
}

export default App;
```

## Connect REST API endpoint

Change the `ReactSearchKit` props to define the REST API endpoint. For this example we are going to use [Zenodo APIs](https://zenodo.org).

```jsx
render() {
  return (
    <ReactSearchKit
      searchConfig={{
        url: 'https://zenodo.org/api/records/',
        timeout: 5000,
        headers: { Accept: 'application/vnd.zenodo.v1+json' },
      }}
    >
      <h1>My search UI</h1>
    </ReactSearchKit>
  );
}
```

> Note: out of the box, `React-SearchKit` is compatible with [Invenio](https://inveniosoftware.org) REST APIs. To connect your own REST APIs, you can override the default configuration or provide your own connector implementation. Follow the next steps of this guide for detailed instructions on how to do it.

## Add the first component

Import the [SearchBar](components/search_bar.md) component.

```jsx
import { ReactSearchKit, SearchBar } from "react-searchkit";
```

Then, add the component as a child of `ReactSearchKit`.

```jsx
import React, { Component } from "react";
import { ReactSearchKit, SearchBar } from "react-searchkit";

class App extends Component {
  render() {
    return (
      <ReactSearchKit>
        <div style={{ margin: "2em auto", width: "50%" }}>
          <SearchBar />
        </div>
      </ReactSearchKit>
    );
  }
}

export default App;
```

The page should look like to this:

![Screenshot showing search bar component](assets/getting_started_search.png)

If you hit `Search`, you should see a network request happens with the search query string you have input.

## Display the results

Import the [ResultsList](components/results_list.md) component.

```jsx
import { ReactSearchKit, SearchBar, ResultsList } from "react-searchkit";
```

Then, add the component below the search bar.

```jsx
import React, { Component } from "react";
import { ReactSearchKit, SearchBar, ResultsList } from "react-searchkit";

class App extends Component {
  render() {
    return (
      <ReactSearchKit>
        <div style={{ margin: "2em auto", width: "50%" }}>
          <SearchBar />
          <ResultsList />
        </div>
      </ReactSearchKit>
    );
  }
}

export default App;
```

After reload, you should the list of results when you insert a query string and hit `Search`.

![Screenshot showing results list component](assets/getting_started_resultslist.png)
