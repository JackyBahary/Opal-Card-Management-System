import {Link} from 'react-router-dom';
import Button from './Button';

function NavBar() {
  return (
    <div className="container mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mb-3 row-span-1">
      <p className="text-5xl text-white font-bold mb-5">
        Opal Card Manager
      </p>
        <span className="justify-end space-x-2">
          <Link to = '/'>
            <Button>Home</Button>
          </Link>
          <Button>Login</Button>
          <Button>Record Trip</Button>
          <Link to='/add-card'>
            <Button>Add Card</Button>
          </Link>
          <Button>View Cards</Button>
          <Button>View Account</Button>
          <Button>View Saved Trips</Button>
        </span>
    </div>
  );
}
export default NavBar;
