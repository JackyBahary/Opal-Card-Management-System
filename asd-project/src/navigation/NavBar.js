function NavBar() {
  return (
    <div className="container mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mb-3 row-span-1">
      <p className="text-5xl text-white font-bold mb-5">
        Opal Card Manager
      </p>
        <span className="justify-end space-x-2">
        <button className=" rounded-xl justify-end bg-gradient-to-r from-yellow-600 to-red-600 p-2 text-white font-extrabold">Link Card</button>
        <button className=" rounded-xl justify-end bg-gradient-to-r from-yellow-600 to-red-600 p-2 text-white font-extrabold">View Card</button>
        <button className=" rounded-xl justify-end bg-gradient-to-r from-yellow-600 to-red-600 p-2 text-white font-extrabold">View Account</button>
        <button className=" rounded-xl justify-end bg-gradient-to-r from-yellow-600 to-red-600 p-2 text-white font-extrabold">View Saved Trips</button>
        </span>
    </div>
  );
}
export default NavBar;
