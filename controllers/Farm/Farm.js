import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const AuthFarm = ({ component: Component, authenticatedFarm, redirectTo, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => (
        authenticatedFarm ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: redirectTo,
            state: { from: props.location }
          }}
          />
        )
      )}
    />
  )
}

AuthFarm.propTypes = {
  authenticatedFarm: PropTypes.bool,
  redirectTo: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
}

AuthFarm.defaultProps = {
  authenticatedFarm: false,
}

export default AuthFarm;
