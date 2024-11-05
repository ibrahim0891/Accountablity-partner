import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import Home from "./Pages/Home"
import AddCompansationData from "./Pages/AddCompansationData"
import NotFound from "./Pages/NotFound"
import AuthPage from "./Pages/Authentication/AuthPage"
import {useContext, useEffect, useState} from "react"
import DataContext from "./Context/DataContext"

import {BatteryHigh, Bluetooth, CellSignalFull, CellSignalMedium, Info, WifiHigh, X} from "phosphor-react"
import UserProfile from "./Pages/UserProfile"
import Heading from "./Components/Heading"
import Card from "./Components/Card"
import {Fade, Flip, Hinge, Roll, Slide, Zoom} from "react-awesome-reveal"


function App() { 

    const [whatsNewVisible, setWhatsNewVisible] = useState(false)

    const releaseNotes = [
        "Migrated to a more robust backend service provider for improved performance and reliability",
        "Enhanced UI/UX with a fresh, modern design",
        "Optimized app responsiveness and loading times",
        "Added new animations and transitions for a smoother experience",
        "Improved error handling and user feedback",
        "Added this cute looking whats new page"
    ]


    return (

        <>
            {/* android Device Frame  */}
            <div
                className="relative md:w-96 md:aspect-[1/2] mx-auto rounded-[32px] shadow-2xl shadow-gray-400/50 hover:shadow-gray-400/70 transition-shadow md:mt-12 md:border-8 md:border-gray-900 flex flex-col ring-8 ring-my-green-500/10 hover:ring-my-green-500  ring-offset-8 hover:ring-offset-0">
                <div className=" hidden md:block">

                    {/* Punch HOLE camera */}
                    <div
                        className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-black z-10 "></div>

                    {/* Power Button */}
                    <div
                        className="absolute top-[130px] -right-[12px] w-[8px] h-14 bg-gray-900 rounded-l z-10 rounded-md "></div>

                    {/* Volume Rpckers */}
                    <div
                        className="absolute top-[130px] -left-[12px] w-[8px] h-16  rounded-r z-10 bg-gray-900 rounded-md "></div>
                    <div
                        className="absolute top-[210px] -left-[12px] w-[8px] h-16 rounded-r z-10 bg-gray-900  rounded-md "></div>

                    {/* home bar */}
                    <div
                        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-14 h-1 bg-slate-100 shadow-sm rounded-full"></div>

                    {/* Android System Status bar */}
                    <div
                        className="flex items-center justify-between px-6 pb-2 pt-3 text-my-green-800 bg-my-green-50 rounded-t-[24px]">
                        <p className="font-semibold ">{new Date().toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                        })}</p>
                        <div className="flex items-center  gap-1 ">
                            <Bluetooth weight="duotone"> </Bluetooth>
                            <WifiHigh weight="fill"></WifiHigh>
                            <CellSignalMedium weight="fill"></CellSignalMedium>
                            <CellSignalFull weight="fill"></CellSignalFull>
                            <BatteryHigh weight="fill" size={18}></BatteryHigh>
                        </div>
                    </div>
                </div>

                {/* Android Application view (Demo , btw this is not a real app) */}
                <div className="md:overflow-auto flex-1 no-scrollbar">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/auth" element={<AuthPage></AuthPage>}>
                            </Route>
                            <Route path="/" element={localStorage.getItem('token') ? <Home/> : <Navigate to="/auth"/>}>
                                <Route index element={<Dashboard/>}/><Route path="/compensation"
                                                                            element={<AddCompansationData/>}/>
                                <Route path="/user" element={<UserProfile/>}/>
                            </Route>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>

            <button className="animate-pulse fixed bottom-0 left-0 m-6 text-my-green-500"
                    onClick={() => setWhatsNewVisible(true)}><Info size={42}> </Info></button>
            {whatsNewVisible &&
                <div>
                    <div className="fixed inset-0 z-10 bg-black/40 backdrop-blur-sm transition-all duration-300"
                         onClick={() => {
                             setWhatsNewVisible(false)
                         }}></div>
                    <div
                        className="fixed bottom-0 left-0 right-0  rounded-3xl  w-80 p-8 border m-6 bg-my-green-100 z-20">
                        <div className="flex justify-between items-center w-full pb-4">
                            <h1 className="text-2xl font-semibold text-my-green-800"> What&#39;s New! v1.2</h1>
                            <X size={20} className="text-my-green-400 hover:text-my-green-700"
                               onClick={() => setWhatsNewVisible(false)}></X>
                        </div>
                        <p>
                            <Fade cascade damping={0.1} delay={0.1}>
                                <span className="text-lg">  I&#39;ve made some exciting updates! 🚀 </span>

                                <ul className="list-disc pl-4 space-y-2 text-my-green-800  mt-4  transition-colors">
                                    {releaseNotes.map((item, index) => <li key={index} className="">{item}</li>)}
                                </ul>
                            </Fade>
                        </p>
                        <button
                            className="w-full mt-6 px-4 py-3 text-sm font-extrabold text-my-green-100 bg-my-green-500  hover:shadow-lg rounded-full transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-my-green-400 focus:ring-opacity-50"
                            onClick={() => setWhatsNewVisible(false)}>
                            Cool!! 😎
                        </button>
                    </div>
                </div>
            }
        </>
    )
}

export default App