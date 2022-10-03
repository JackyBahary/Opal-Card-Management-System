import {Link} from 'react-router-dom';
import Button from './Button';
import { useAuth, useAdmin } from "../App"

function NavBar() {
  const user = useAuth();
  const admin = useAdmin();

  return (
    <div className="container mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mb-3 row-span-1">
      <p className="text-5xl text-white font-bold mb-5">
        Opal Card Manager
      </p>
      {(user !== undefined) && (!admin) && ( //For User NavBar
        <div>
          <span className="justify-end space-x-2">
            <Link to = '/home'>
              <Button>Home</Button>
            </Link>
            <Button>Logout</Button>
            <Link to = '/record-trip'>
              <Button>Record Trip</Button>
            </Link>
            <Link to='/add-card'>
              <Button>Add Card</Button>
            </Link>
            <Button>Your Cards</Button>
            <Link to='/your-account'>
              <Button>Your Account</Button>
            </Link>
            <Button>Saved Trips</Button>
          </span>
          <span className="justify-end space-x-2">
            <Link to = '/trip-history'>
              <Button>Trip History</Button>
            </Link>
          </span>
        </div>
      )}
      {(user !== undefined) && (admin) && ( //For Admin NavBar
        <div>
          <span className="justify-end space-x-2">
            <Link to = '/home'>
              <Button>Home</Button>
            </Link>
            <Link to = '/admin-lost-stolen'>
              <Button>Lost/Stolen Manager</Button>
            </Link>
            <Link to = '/deactivate-card'>
              <Button>Deactivate Card</Button>
            </Link>
            <Button>Logout</Button>           
          </span>
        </div>
      )}
    </div>
  );
}
export default NavBar;
