function LinkCard() {
  return (
    <div className="container items-center align-center mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mt-0">
      <p className="text-4xl text-white font-bold mb-5 text-center">
        Link Card
      </p>
      <label className="text-white">Card Number</label>
      <label className="text-white">Password</label>
        <button className=" rounded-xl text-center bg-gradient-to-r from-yellow-600 to-red-600 p-2 px-4 text-white font-extrabold">Login</button>
    </div>
  );
}
export default LinkCard;
