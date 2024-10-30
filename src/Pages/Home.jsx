import { Link, Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar"
import axios from "axios"
import { ArrowsClockwise, UserCircle } from "phosphor-react"




const Home = () => {

    return (
        <div className="w-full h-full flex flex-col">
            <div className="bg-white md:bg-my-green-50 border-b border-[#d1d1d6] shadow-lg transition-all duration-300 ease-in-out sticky top-0 z-10">
                <div className="text-my-green-800 text-center text-xl  font-bold px-6 pt-5 pb-3 tracking-tight flex items-center justify-between">
                    <button> <Link to={'/user'}><UserCircle weight='fill' size={25} className="hover:fill" />  </Link>  </button>
                    <span> Accountablity Partner  </span>
                    <button className="hover:animate-spin" onClick={() => window.location.reload()}><ArrowsClockwise size={24} /></button>

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