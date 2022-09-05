function Button(props) {
    return (
        <button className=" rounded-xl justify-end bg-gradient-to-r from-yellow-600 to-red-600 p-2 text-white font-extrabold">
            {props.children}
        </button>
    );
}

export default Button;