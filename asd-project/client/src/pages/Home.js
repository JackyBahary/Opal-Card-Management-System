import {Link} from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from "../App"

function Home() {
  const user = useAuth();
  return (
    <div className="container mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mb-3 row-span-1">
      {(user !== undefined) && (
        <span className="justify-end space-x-2">
          <p className="text-5xl text-white font-bold mb-5">
            Welcome {user} !
          </p>
        </span>
      )}
    </div>
  );
}
export default Home;