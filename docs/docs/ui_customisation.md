---
id: ui-customisation
title: Customise The Look And Feel
---

React-SearchKit uses [Semantic UI React](https://react.semantic-ui.com/) as UI framework.

The best way to style each available component is to follow the recommended way documented in Semantic UI React [Theming section](https://react.semantic-ui.com/theming).

Asides from styling, RSK components can be overridden completely (using [React overridable](https://github.com/indico/react-overridable) internally).
 
By passing a map with IDs and components we can override the default components with our own custom components.
To allow for this functionality you should wrap your RSK app with the react-overridable "OverridableContext" and 
pass it a map of components you have defined. 

In the following example you can see a simplified setup.
```jsx
const CustomResultsListItem = (overriddenComponentProps) =>  (
  <Item>
    <Item.Header>
      {overriddenComponentProps.title}
    </Item.Header>
  </Item>
)

const overriddenComponents = {
  'ResultsList.item': CustomResultsListItem
};

<OverridableContext.Provider value={overriddenComponents}>
          <ReactSearchKit/>
</OverridableContext.Provider>

```
 
The ID used for overriding a component can be found by searching the component in the RSK [library](https://github.com/inveniosoftware/react-searchkit/tree/master/src/lib/components)
and looking at the ID passed to the `Overridable` component. The ID is built using a function called `buildUID` which allows us to namespace our IDs if needed.

```jsx
//If there is no `appName` prop passed to the main RSK component`
const id = buildUID('Count.Element'); // outputs 'Count.Element'
const id2 = buildUID('Count.Element', 'ExampleOverridenId'); // outputs 'Count.Element.ExampleOverridenId'
// If there is an `appName` prop passed with value 'exampleAppName' (namespacing)
const id3 = buildUID('Count.Element'); // outputs 'exampleAppName.Count.Element'

<Overridable id={id} > </Overridable>
```

For elaborated examples please have a look at our [code demos](https://github.com/inveniosoftware/react-searchkit/tree/master/src/demos). 
