function Button(props) {
    const{children, ...others} = props;
    return (
        <button {...others} className=" rounded-xl justify-end bg-gradient-to-r from-yellow-600 to-red-600 p-2 text-white font-extrabold">
            {children}
        </button>
    );
}

export default Button;