---
id: with-query-state
title: withQueryState
---

`withQueryState` is a HOC component that passes the redux query state to an external component.

The component receives the up-to-date query state every time something is changed.

## Usage

```jsx
class _QueryStateLogger extends Component {
  render() {
    return (
      <div>
        Current query state <pre>{JSON.stringify(this.props.currentQueryState, null, 2)}</pre>
      </div>
    );
  }
}
const QueryStateLogger = withQueryState(_QueryStateLogger);
```
