


// bg - [url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]
const Page = ({ children }) => {
    return (
        <div className={`w-full h-full p-4 overflow-y-auto no-scrollbar bg-my-green-900 md:rounded-b-[22px] bg-cover bg-center bg-no-repeat flex flex-col gap-4`}>
            {children}
        </div>
    )
}


export default Page