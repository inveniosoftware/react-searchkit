import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';
import { ShouldRender } from '@app/components';

export default class Count extends Component {
  constructor(props) {
    super(props);
    this.renderElement = props.renderElement || this._renderElement;
  }

  _renderElement(total) {
    return <Label color={'blue'}>{total}</Label>;
  }

  render() {
    const { total, loading } = this.props;
    return (
      <ShouldRender condition={!loading && total > 0}>
        {this.renderElement(total)}
      </ShouldRender>
    );
  }
}

Count.propTypes = {
  total: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  renderElement: PropTypes.func,
};

Count.defaultProps = {
  renderElement: null,
};
