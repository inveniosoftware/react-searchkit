import React from 'react';
import { Loader } from 'semantic-ui-react';

export default function WithLoader(Component) {
  return function WihLoadingComponent({ loading, ...props }) {
    const loader = <Loader active inline="centered" />;
    return loading ? loader : <Component {...props} />;
  };
}
