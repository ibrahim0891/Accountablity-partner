import { useContext, useState } from "react"
import Card from "../Components/Card"
import Page from "../Components/Page"
import axios from "axios"
import userContext from "../Context/UserContext"
import DataContext from "../Context/DataContext"
import { ArrowsClockwise } from "phosphor-react"
import { env } from "../environmentVars"
import { Navigate } from "react-router-dom"
import { Fade } from "react-awesome-reveal"





const AddCompansationData = () => {
    const [compensation, setCompensation] = useState(0)
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])



    const { users } = useContext(DataContext)

    const [responseMessage, setResponseMessage] = useState(false)

    const user = users.find(user => user._id === localStorage.getItem('uid'))




    const handleSubmit = (e) => {
        e.preventDefault();
        if (compensation == '') {
            setResponseMessage('ফাঁকা ইনপুট গ্রহণযোগ্য নয়! আবার চেষ্টা করুন।')
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
                    <h1 className="text-xl font-semibold tracking-tight text-my-green-900 mb-6">Add Compensation Data</h1>
                    <div className="space-y-2 pb-3">
                        <h1 className="text-md tracking-tight text-my-green-900">Instruction:</h1>
                        <div className="text-sm text-my-green-800 pl-4">
                            1. ফাইন না থাকলে এখানে কিছু করার প্রয়োজন নেই ।
                            <br />
                            2. ফাইন থাকলে সেটি এখানে লিখে সাবমিট করুন ।
                        </div>
                    </div>

                    <form className="space-y-6"   >
                        <div className="relative ">
                            <input
                                id="compensation"
                                type="number"
                                name="compensation"
                                className="peer h-14 w-full   border-gray-300 text-my-green-900 placeholder-transparent focus:outline-none focus:border-my-green-500 transition-colors bg-transparent pt-4"
                                placeholder="Enter compensation amount"
                                onChange={(e) => setCompensation(e.target.value)}
                                required
                            />
                            <label
                                htmlFor="compensation"
                                className="absolute left-0 -top-3 text-sm text-my-green-600 transition-all 
                                     peer-placeholder-shown:text-base peer-placeholder-shown:text-my-green-500 
                                     peer-placeholder-shown:top-4 peer-focus:-top-1 peer-focus:text-sm 
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
                                    title="Refresh" onClick={(e) => { e.preventDefault(); window.location.href = '/' }}
                                    className="ml-2 hover:rotate-180 transition-transform duration-300"
                                >
                                    <ArrowsClockwise></ArrowsClockwise>
                                </button>
                            </div>
                        </div>

                    </form>
                </Card> 
        </Page>
    )
}

export default AddCompansationData