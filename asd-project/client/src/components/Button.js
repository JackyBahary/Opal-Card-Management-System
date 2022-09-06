function Button(props) {
    const{children, ...others} = props;
    return (
        <button {...others} className=" rounded-xl justify-end bg-gradient-to-r mb-4 from-yellow-600 to-red-600 p-2 text-white font-extrabold mx-2 justify-items-center">
            {children}
        </button>
    );
}

export default Button;