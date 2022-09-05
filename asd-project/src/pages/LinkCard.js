function LinkCard() {
  return (
    <div className="container items-center align-center mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mt-0">
      <p className="text-4xl text-white font-bold mb-5 text-center pb-8">
        Link Card
      </p>
        <div className=" justify-self-center w-full grid-cols-2 pb-8">
        <label className="text-white text-2xl p-8 w-100">Card Number</label>
        <input className="rounded-l text-2xl w-max"></input>
        </div>
        <div className=" justify-self-center w-full grid-cols-2 pb-8">
        <label className="text-white text-2xl p-8 w-100">Email</label>
        <input className="rounded-l text-2xl w-max"></input>
        </div>
        <div className=" justify-self-center w-full grid-cols-2 pb-8">
        <label className="text-white text-2xl p-8 w-100">Password</label>
        <input className="rounded-l text-2xl w-max"></input>
        </div>
        <div className="w-full">
          <button className=" justify-center self-center rounded-xl text-center bg-gradient-to-r from-yellow-600 to-red-600 p-2 px-4 text-white font-extrabold">Login</button>
        </div>
    </div>
  );
}
export default LinkCard;
