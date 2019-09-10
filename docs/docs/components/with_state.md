---
id: with-state
title: withState
---

`withState` is a HOC component that passes the redux state to an external component.

The component receives the up-to-date state every time something is changed.

**Note**: do **not** mutate the state inside your wrapped component!

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
