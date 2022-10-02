
function AdminLostStolen() {
    return (
      <div className="container items-center align-center mx-auto w-1/2 bg-gray-900 rounded-xl shadow border p-8 m-10 mt-0">
        <p className="text-4xl text-white font-bold mb-5 text-center pb-8">
          Lost/Stolen Card Manager
        </p>
          <div className=" justify-self-center w-full pb-8">
            <div className="overflow-scroll max-h-60 rounded-xl bg-white">
            <div className="text-white text-2xl p-2 w-11/12 mx-auto items-center align-center self-center my-6 bg-gradient-to-r from-yellow-600 to-red-600 rounded-xl">
              <p className="inline-block">card No</p>
              <input className="inline-block float-right" type="checkbox"></input>
              </div>
              <div className="text-white text-2xl p-2 w-11/12 mx-auto my-6 bg-gradient-to-r from-yellow-600 to-red-600 rounded-xl">
              <p className="inline-block">card No</p>
              <input className="inline-block float-right" type="checkbox"></input>
              </div>
              <div className="text-white text-2xl p-2 w-11/12 mx-auto my-6 bg-gradient-to-r from-yellow-600 to-red-600 rounded-xl">
              <p className="inline-block">card No</p>
              <input className="inline-block float-right" type="checkbox"></input>
              </div>
              <div className="text-white text-2xl p-2 w-11/12 mx-auto my-6 bg-gradient-to-r from-yellow-600 to-red-600 rounded-xl">
              <p className="inline-block">card No</p>
              <input className="inline-block float-right" type="checkbox"></input>
              </div>
              <div className="text-white text-2xl p-2 w-11/12 mx-auto my-6 bg-gradient-to-r from-yellow-600 to-red-600 rounded-xl">
              <p className="inline-block">card No</p>
              <input className="inline-block float-right" type="checkbox"></input>
              </div>
            </div>
          </div>
          <div className="w-full">
            <button className=" justify-center self-center rounded-xl text-center bg-gradient-to-r from-yellow-600 to-red-600 p-2 px-4 text-white font-extrabold">Submit</button>
          </div>
      </div>
    );
  }
  
  export default AdminLostStolen;