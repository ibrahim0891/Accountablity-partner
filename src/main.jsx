import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LoadingSplashPage from './Pages/LoadingSplashPage.jsx'
import DataContext from './Context/DataContext.jsx'
import axios from 'axios'
import { env } from './environmentVars.js'

// const users = [
//     {
//         id: 1,
//         name: 'MD Ibrahim',
//         email: 'nijhum0891@@gmail.com',
//         moneyRecieved : 300,
//         password: 'password123'
//     },
//     {
//         id: 2,
//         name: 'Ridoy babu',
//         email: 'legendaryhero@telegram.com',
//         moneyRecieved: 300,
//         password: 'password123'
//     }
// ]


// const data = [
//     {
//         date: '2023-07-01',
//         compensation: [
//             {
//                 id: 1,
//                 userId: 1,
//                 amount: 100
//             },
//             {
//                 id: 2,
//                 userId: 2,
//                 amount: 200
//             }
//         ]
//     },
//     {
//         date: '2023-07-02',
//         compensation: [
//             {
//                 id: 3,
//                 userId: 1,
//                 amount: 300
//             },
//             {
//                 id: 4,
//                 userId: 2,
//                 amount: 200
//             } 
//         ]
//     }
// ]

const users = [
    {
        id: 1,
        name: 'MD Ibrahim',
        email: 'nijhum0891@gmail.com',
        password: 'hashed_password_1',
        transactions: [
            { transactionId: 1, date: '2023-07-01', amount: 100 },
            { transactionId: 3, date: '2023-07-02', amount: 300 },
            { transactionId: 3, date: '2023-09-02', amount: 300 },
        ]
    },
    {
        id: 2,
        name: 'Ridoy Babu',
        email: 'legendaryhero@telegram.com',
        password: 'hashed_password_2',
        transactions: [
            { transactionId: 2, date: '2023-07-01', amount: 200 },
            { transactionId: 4, date: '2023-07-02', amount: 200 },
            { transactionId: 4, date: '2023-09-02', amount: 200 },
        ]
    }
];




const Root = () => {
    const [isDataFetched, setIsDataFetched] = useState(false)
    const [users, setUsers] = useState(false)
    useEffect(() => {


        const localToken = localStorage.getItem('token')
        const localUid = localStorage.getItem('uid')
        axios.get(env.BASE_URL + "/aps/user", {
            headers: {
                "Content-Type": "application/json",
                "token": localToken,
                "uid": localStorage.getItem('uid')
            }
        }).then(res => {
            console.log(res.data);
            setUsers(res.data)
            setIsDataFetched(true)
        }).catch(err => {
            console.log(err);
        })

         
    }, [])


    return (
        <StrictMode>
            {isDataFetched ? (
                <DataContext.Provider value={{ users }}>
                    <App />
                </DataContext.Provider>
            ) : (
                <LoadingSplashPage />
            )}
        </StrictMode>
    )
}
createRoot(document.getElementById('root')).render(
    <Root />
)
