---
id: with-state
title: withState
---

`withState` is a high order component, which is used to expose the redux state and
actions to external components.

The component receives the up-to-date state every time something is changed and
through its props it gains access to

- `currentResultsState`
- `currentQueryState`
- `updateQueryState`

> Do **not** mutate directly the state inside your wrapped component. Instead, use the function `updateQueryState` to pass your new query.

## Usage

```jsx
class _StateLogger extends Component {
  render() {
    return (
      <div>
        Current query state <pre>{JSON.stringify(this.props.currentQueryState, null, 2)}</pre>
      </div>
      <div>
        Current results state <pre>{JSON.stringify(this.props.currentResultsState, null, 2)}</pre>
      </div>
    );
  }
}

const StateLogger = withState(_StateLogger);
```
