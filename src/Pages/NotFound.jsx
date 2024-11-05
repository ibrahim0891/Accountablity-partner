const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full rounded-3xl bg-gray-50 px-4">
            <div className="text-center space-y-6">

                <h1 className="text-8xl font-thin text-gray-900">404</h1>
                <h2 className="text-xl text-gray-600 font-light">Page Not Found</h2>
                <p className="text-gray-500">The page you're looking for doesn't exist or has been moved.</p>
                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-2 text-sm text-blue-500 border border-blue-500 rounded-full hover:bg-blue-50 transition-colors"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};
export default NotFound;