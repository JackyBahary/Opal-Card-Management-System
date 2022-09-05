/* eslint-disable react-hooks/rules-of-hooks */
import { Navigate } from 'react-router-dom';
import { useAuth } from '../App';

function ProtectRoute(Component) {
  return (props) => {
    const user = useAuth();
    if (user !== undefined) {
      return <Component {...props} />
    }
    return <Navigate to="/" />
  }
}

export default ProtectRoute;
