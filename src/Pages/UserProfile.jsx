import { useContext, useState } from "react";
import Page from "../Components/Page"
import DataContext from "../Context/DataContext";
import Card from "../Components/Card";
import { DotsNine, DotsThreeVertical, PencilSimple, SignOut, Trash } from "phosphor-react";
import axios from "axios";
import { env } from "../environmentVars";




const UserProfile = () => {
    const { users } = useContext(DataContext)
    const USER_ID = localStorage.getItem('uid')

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [confirmationDialog, setConfirmationDialog] = useState(false)

    const user = users.find(user => user._id === USER_ID)

    function logout() {
        localStorage.removeItem('token')
        window.location.href = '/auth'
        axios.post(env.BASE_URL + "/aps/user/logout", {

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


    return (
        <Page>
            <Card className="w-full mx-auto p-6 space-y-6">
                <div className="flex justify-between items-center -mb-2 ">
                    <h1 className="text-3xl font-medium  flex-1 text-my-green-800 ">Your Profile </h1>
                    <button className=" font-bold p-2 hover:bg-my-green-200   rounded-2xl relative" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <DotsThreeVertical weight='fill' size={32} />
                        {isDropdownOpen && (
                            <>
                                <div className="fixed inset-0" onClick={() => setIsDropdownOpen(false)}></div>
                                <div className="absolute top-10 right-0 bg-white text-green-900 shadow-lg rounded-lg p-2 w-44 z-10 text-sm">
                                    <button className=" w-full text-left px-4 py-2 hover:bg-my-green-100 flex items-center gap-3 opacity-50 cursor-not-allowed" disabled><PencilSimple size={20} /> Edit Profile </button>
                                    <button className=" w-full text-left px-4 py-2 text-yellow-600 hover:bg-amber-50 flex items-center gap-3" onClick={logout} >  <SignOut size={20} /> Logout</button>
                                    <button className=" w-full text-left px-4 py-2 text-red-800 text-nowrap hover:bg-rose-50 flex items-center gap-3" onClick={(e) => { e.preventDefault(); setConfirmationDialog(true) }}><Trash size={20} /> Delete Profile</button>                                </div>
                            </>
                        )}
                    </button>
                </div>

                <div className="mb-6 text-my-green-800">
                    <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
                    <p className=""><span className="font-medium">Name:</span> {user.name}</p>
                    <p className=""><span className="font-medium">Email:</span> {user.email}</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4 text-my-green-800">Transaction History</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-my-green-100 text-my-green-800">
                                    <th className="text-left p-3">Date</th>
                                    <th className="text-left p-3 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.transactions.map(transaction => (
                                    <tr key={transaction.transactionId} className="border-b">
                                        <td className="p-3">{transaction.date.split('T')[0]}</td>
                                        <td className="p-3 text-right">{transaction.amount} tk</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Card>
            <div className={"h-full flex items-end justify-end fixed md:absolute top-0 left-0 w-full z-50  backdrop-blur-sm backdrop-filter backdrop-brightness-50 p-4 rounded-3xl " + (confirmationDialog ? 'flex' : 'hidden')}>

                <Card className={'bg-red-50 text-red-800 space-y-3   '}>
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
    );
};

export default UserProfile;