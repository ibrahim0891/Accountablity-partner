import { useContext } from "react"
import DataContext from "../Context/DataContext"
import Card from "../Components/Card"
import Page from "../Components/Page"
import { Person, User, UserCircle } from "phosphor-react"

import Heading from "../Components/Heading"

const Dashboard = () => {
    const { users } = useContext(DataContext)
    const USER_ID = localStorage.getItem('uid')

     

    const user = users.find(user => user._id === USER_ID)

    const dates = [...new Set(users.flatMap(user => user.transactions.map(t => t.date.split('T')[0]) ))];

    console.table(dates);

    return (
        <Page>

            <Card className="text-my-green-900">
                <Heading text={user.name}/>
                <h1 className="text-sm font-medium tracking-wide  ">{user.email}</h1>
                <p>
                    <span className="font-light">Amount lost:</span>
                    <span className="text-lg"> {user.transactions.reduce((acc, t) => acc + t.amount, 0).toFixed(2)} Tk</span>
                </p>
            </Card>

            <Card className="text-my-green-900">
                <h2 className="text-xl font-semibold tracking-tight  mb-4">Compensation Details</h2>

                {dates.map((dateItem, index) => (
                    <div key={index} className="mb-8">
                        <p className="text-lg font-medium text-my-green-600 mb-4">{dateItem.split('T')[0]}</p>
                        <div className="grid grid-cols-2 gap-2">
                            {users.map((user) => {
                                const userTransaction = user.transactions.find(t => t.date.split('T')[0] === dateItem);
                                return (
                                    userTransaction && (
                                        <div
                                            key={userTransaction.transactionId}
                                            className="p-4 rounded-lg bg-my-green-100 border border-my-green-200 transition-transform duration-300 hover:shadow-md hover:translate-y-[-2px] cursor-pointer elevation-1"
                                            style={{
                                                
                                                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                                            }}
                                        >
                                            <p className="text-my-green-700 text-xs">{user.name}</p>
                                            <p className="text-lg font-semibold to-my-green-900 ">৳ {userTransaction.amount.toFixed(2)}</p>
                                        </div>
                                    )
                                );
                            })}
                        </div>
                    </div>                
                ))}
            </Card>

        </Page>
    )
}

export default Dashboard