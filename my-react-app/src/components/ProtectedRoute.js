import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children, ...rest }) {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user && user.role === 'admin' ? (
          children
        ) : (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        )
      }
    />
  );
}

export default ProtectedRoute;