import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CircleAnimation extends Component {
  render() {
    return (
      <div
        className="m-loader mr-2 mx-auto"
        style={{ width: this.props.width, maxWidth: '200px' }}
      >
        <svg className="m-circular" viewBox="25 25 50 50">
          <circle
            className="path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="4"
            strokeMiterlimit="10"
          />
        </svg>
      </div>
    );
  }
}

CircleAnimation.propTypes = {
  width: PropTypes.string,
};

CircleAnimation.defaultProps = {
  width: '40px',
};
export default CircleAnimation;
