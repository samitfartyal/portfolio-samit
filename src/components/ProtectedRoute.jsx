import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const auth = localStorage.getItem('auth')
  if (auth !== 'true') {
    return <Navigate to="/admin" replace />
  }
  return children
}

export default ProtectedRoute
