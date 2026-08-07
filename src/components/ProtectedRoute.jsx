import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, isCheckingToken, children }) {
  if (isCheckingToken) {
    return null;
  }

  return isLoggedIn ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
