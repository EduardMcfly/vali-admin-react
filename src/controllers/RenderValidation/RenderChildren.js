import { Component } from 'react';
class RenderChildren extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, children, ...rest } = this.props;
    if (state) {
      return children;
    }
    return null;
  }
}

export default RenderChildren;
