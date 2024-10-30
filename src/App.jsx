import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import Home from "./Pages/Home"
import AddCompansationData from "./Pages/AddCompansationData"
import NotFound from "./Pages/NotFound"
import AuthPage from "./Pages/Authentication/AuthPage"
import userContext from "./Context/UserContext"
import { useContext } from "react"
import DataContext from "./Context/DataContext"

import iphone from '../src/assets/iPhone.png'
import { BatteryHigh, Bluetooth, CellSignalFull, CellSignalMedium, WifiHigh } from "phosphor-react"
import UserProfile from "./Pages/UserProfile"


function App() {
    const user = useContext(DataContext)
    const token = localStorage.getItem('token')


    return (
        <>
            {/* android Device Frame  */}
            <div className="relative md:w-[345px]  md:aspect-[9/18] mx-auto rounded-[32px] shadow-2xl shadow-gray-400/50 hover:shadow-gray-400/70 transition-shadow md:mt-12 md:border-8 md:border-gray-900 flex flex-col">
                <div className=" hidden md:block">

                    {/* Punch HOLE camera */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-black z-10 "></div>

                    {/* Power Button */}
                    <div className="absolute top-[130px] -right-[12px] w-[8px] h-14 bg-gray-900 rounded-l z-10 rounded-md "></div>

                    {/* Volume Rpckers */}
                    <div className="absolute top-[130px] -left-[12px] w-[8px] h-16  rounded-r z-10 bg-gray-900 rounded-md "></div>
                    <div className="absolute top-[210px] -left-[12px] w-[8px] h-16 rounded-r z-10 bg-gray-900  rounded-md "></div>

                    {/* home bar */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-14 h-1 bg-slate-100 shadow-sm rounded-full"></div>

                    {/* Android System Status bar */}
                    <div className="flex items-center justify-between px-6 pb-2 pt-3 text-slate-800 bg-my-green-50 rounded-t-[24px]">
                        <p className="font-semibold ">{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
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
                            <Route path="/" element={localStorage.getItem('token') ? <Home /> : <Navigate to="/auth" />}>
                                <Route index element={<Dashboard />} />
                                <Route path="/compensation" element={<AddCompansationData />} />
                                <Route path="/user" element={<UserProfile />} />
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </>
    )
} export default App
