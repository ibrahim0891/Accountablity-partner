import { useContext, useState } from "react"
import Card from "../Components/Card"
import Page from "../Components/Page"
import axios from "axios"
import userContext from "../Context/UserContext"
import DataContext from "../Context/DataContext"
import { ArrowsClockwise } from "phosphor-react"
import { env } from "../environmentVars"
import { Navigate } from "react-router-dom"





const AddCompansationData = () => {
    const [compensation, setCompensation] = useState(0)
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])

    const [confirmationDialog, setConfirmationDialog] = useState(false)

    const { users } = useContext(DataContext)

    const [responseMessage, setResponseMessage] = useState(false)

    const user = users.find(user => user._id === localStorage.getItem('uid'))

    function logout() {
        localStorage.removeItem('token')
        window.location.href = '/auth'
        axios.post(env.BASE_URL + "/aps/user/login", {

        }).then((res) => {
            console.log(res.data);
        })
    }

    function deleteAccount() {
        const accountID = localStorage.getItem('uid')
        axios.delete(env.BASE_URL + "/aps/user/deleteAccount", {
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token'),
                "uid": localStorage.getItem('uid'),
                "email": user.email,
            }
        }).then((res) => res.data).then((res) => {
            localStorage.removeItem('token')
            window.location.href = '/auth'
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(compensation <= 0) {
            setResponseMessage('শূন্য দিয়ে অথবা ফাঁকা ইনপুট গ্রহণযোগ্য নয়! আবার চেষ্টা করুন।')
            return
        }
        axios.post(env.BASE_URL + "/aps/user/addTransaction", {
            date: new Date().toISOString(),
            amount: compensation,

        }, {
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token'),
                "email": user.email,
            }
        }).then((res) => {
            setResponseMessage('Compensation added successfully. Please refresh the page to see the changes.')
        })
    }


    return (
        <Page>
            <Card>
                <h1 className="text-xl font-semibold tracking-tight text-gray-900 mb-6">Add Compensation Data</h1>
                <form className="space-y-6 "   >
                    <div className="relative">
                        <input
                            id="compensation"
                            type="number"
                            name="compensation"
                            className="peer h-14 w-full   border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-my-green-500 transition-colors bg-transparent pt-4"
                            placeholder="Enter compensation amount"
                            onChange={(e) => setCompensation(e.target.value)}
                            required
                        />
                        <label
                            htmlFor="compensation"
                            className="absolute left-0 -top-3.5 text-sm text-my-green-600 transition-all 
                                     peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                                     peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-sm 
                                     peer-focus:text-my-green-700-500"
                        >
                            Compensation Amount
                        </label>
                        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gray-300 transition-all 
                                      peer-focus:h-0.5 peer-focus:bg-my-green-500"></div>
                    </div>

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full h-14 bg-my-green-500 text-white rounded-full hover:bg-my-green-600 
                                 transition-colors shadow-lg hover:shadow-xl active:shadow-md 
                                 flex items-center justify-center text-lg font-medium"
                    >
                        Submit
                    </button>
                    <div className={`${responseMessage ? 'block' : 'hidden'}`}>
                        <div className="bg-amber-200 text-amber-800 p-2 rounded-md flex items-center justify-evenly">
                            <p className="text-sm" >{responseMessage}</p>
                            <button
                                title="Refresh" onClick={(e) =>{ e.preventDefault() ; window.location.href='/'}  }
                                className="ml-2 hover:rotate-180 transition-transform duration-300"
                            >
                                <ArrowsClockwise></ArrowsClockwise>
                            </button>
                        </div>
                    </div>

                    <div className="flex float-start gap-2">
                        <button className=" hover:underline" onClick={logout}> Log out </button>
                        <button className=" hover:underline" onClick={(e) => { e.preventDefault(); setConfirmationDialog(true) }}> Delete Account </button>
                    </div>
                </form>
            </Card>
            <div className={"h-full flex items-end justify-end absolute top-0 left-0 w-full z-50  backdrop-blur-sm backdrop-filter backdrop-brightness-50 p-4 rounded-3xl " + (confirmationDialog ? 'flex' : 'hidden') }>

                <Card className={'bg-red-50 text-red-800 space-y-3   ' }>
                    <h1 className="text-xl font-semibold tracking-tight   mb-3 text-center text-red-900">Delete Account</h1>
                    <p className="text-xl"> Are you sure to delete your account?
                        <br />
                        <span className="font-bold text-sm"> This action cannot be undone. </span>
                    </p>
                    <div className="flex gap-5 item-end justify-end">
                        <button className="block rounded-md   text-red-500 hover:bg-red-100 px-3 py-2 " onClick={deleteAccount}> Delete </button>
                        <button className="block rounded-md  bg-red-100 hover:bg-transparent text-red-800 hover:bg-red-100 px-3 py-2  " onClick={() => setConfirmationDialog(false)}> Cancel </button>
                    </div>
                </Card>
            </div>
        </Page>
    )
}

export default AddCompansationData