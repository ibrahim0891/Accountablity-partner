import Spinner from "../Components/Spinner"



const LoadingSplashPage = () => {
    return (
        <div className="flex items-center justify-center h-screen flex-col space-y-6">
            <Spinner size={18}/>
            <p className="text-gray-600"> Initializing...</p>
        </div>
    )
}

export default LoadingSplashPage