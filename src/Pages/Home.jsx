import { Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar"
import axios from "axios"
import { ArrowsClockwise } from "phosphor-react"




const Home = () => {
    
    return (
        <div className="w-full h-full flex flex-col">
            <div className="bg-my-green-50 border-b border-[#d1d1d6] shadow-lg transition-all duration-300 ease-in-out sticky top-0 z-10">
                <div className="text-my-green-800 text-center text-xl  font-bold px-6 py-3 tracking-tight flex items-center justify-between">
                    Accountablity Partner
                    <button className="hover:animate-spin" onClick={() => window.location.reload()}><ArrowsClockwise /></button>
                </div>
                <Navbar className="animate-fade-in" />
            </div>        
            <div className="flex-grow h-full overflow-x-auto overflow-y-auto"> 
                    <Outlet /> 
            </div>
        </div>    
        )
}

export default Home