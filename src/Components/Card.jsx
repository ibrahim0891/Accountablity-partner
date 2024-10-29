

const Card = ({ children , className='' }) => {
    return (
        <div className={`w-full p-6 rounded-3xl shadow-lg bg-my-green-50 backdrop-blur-sm border border-my-green-200 space-y-1 ${className}`}>
            {children}
        </div>
    )
}

export default Card