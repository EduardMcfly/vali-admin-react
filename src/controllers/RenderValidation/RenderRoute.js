import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

class AuthUser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      component: Component,
      authenticated,
      redirectTo,
      ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          authenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: redirectTo,
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  }
}

AuthUser.propTypes = {
  authenticated: PropTypes.bool,
  redirectTo: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};

AuthUser.defaultProps = {
  authenticated: false,
};

export default AuthUser;
