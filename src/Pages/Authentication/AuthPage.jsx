import axios from "axios"
import { X } from "phosphor-react"
import { useState } from "react"
import { Navigate } from "react-router-dom"
import { env } from "../../environmentVars"
import Card from "../../Components/Card"




const AuthPage = () => {
    if (localStorage.getItem('token')) {
        window.location.href = '/'
        return null
    }
    console.log('text');

    const [isLogin, setIsLogIn] = useState(true)
    const [actionMessage, setActionMessage] = useState(false)

    const switchAuthForm = () => {
        isLogin ? setIsLogIn(false)
            : setIsLogIn(true)
    }

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const user = isLogin ? { email, password } : { name, email, password }

    const handleSubmit = (e) => {
        e.preventDefault()
        isLogin ?
            handleLogin()
            : handleSignUp()
    }

    const handleLogin = () => {
        axios.post(env.BASE_URL + "/aps/user/login", user).then((res) => {
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('uid', res.data.uid)
                window.location.href = "/"
            }
        })
            .catch((error) => {
                if (error.response.status === 400) {
                    setActionMessage({ status: 401, message: "Invalid credentials." })
                }
            })
    }

    const handleSignUp = () => {
        axios.post(env.BASE_URL + "/aps/user/signup", user)
            .then((res) => {
                if (res.status === 201) {
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('uid', res.data.uid)
                    window.location.href = "/"
                }
            })
            .catch((error) => {
                if (error.response.status === 409) {
                    setActionMessage({ status: 409, message: "User already exist." })
                }
            })
    }


    return (
        <div className="w-full h-screen md:h-full flex items-center justify-center  bg-my-green-900 p-6">
            <Card className="  flex flex-col items-center justify-center gap-6 ">

                <form className="  flex flex-col items-center justify-center gap-6 text-green-800  " onSubmit={handleSubmit}>
                    <h1 className="text-4xl font-bold "> {isLogin ? "Log in " : 'Sign Up'} </h1>
                    {
                        !isLogin && <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg "> Enter Your name  </label>
                            <input type="text" placeholder="Jhon doe" className="px-4 py-2 border border-gray-200 rounded-full bg-lime-50 focus:outline-my-green-200 focus:outline-4 focus:outline-none focus:text-green-900  " onChange={(e) => setName(e.target.value)} value={name} required></input>
                        </div>
                    }

                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-lg "> Enter email </label>
                        <input type="email" placeholder="E-mail" className="px-4 py-2 border border-gray-200 rounded-full bg-lime-50 focus:outline-my-green-200 focus:outline-4 focus:outline-none focus:text-green-900  " onChange={(e) => setEmail(e.target.value)} value={email} required></input>
                    </div>
                    <div className="flex flex-col gap-2 w-full" >
                        <label className="text-lg"> Enter password </label>
                        <input type="password" className="px-4 py-2 border border-gray-200 rounded-full bg-lime-50 focus:outline-my-green-200 focus:outline-4 focus:outline-none focus:text-green-900  " onChange={(e) => setPassword(e.target.value)} value={password} required></input>
                    </div>
                    {actionMessage ? <div className={" text-red-900 -my-2 p-2 px-2 rounded-md w-full " + `${actionMessage.status == 201 ? "bg-green-100 text-green-700" : "bg-red-100"}`}>
                        <div className="flex justify-between items-center">
                            <p>{actionMessage.message}</p>
                            <button onClick={() => setActionMessage(false)}>
                                <X size={20} />
                            </button>
                        </div>
                    </div> : null}
                    <button type="submit" className="px-4 py-2 text-white text-lg w-full bg-my-green-800  hover:bg-green-800 rounded-full"   >  {actionMessage.status == 201 && <Navigate to={'/'} />} {isLogin ? "Log in " : "Sign Up"}</button>
                </form>
                <div className="text-center space-y-4">
                    <div className="flex items-center gap-4 w-full">
                        <div className="h-[1px] bg-gray-300 w-full"></div>
                        <div>or</div>
                        <div className="h-[1px] bg-gray-300 w-full"></div>
                    </div>
                    <div className="space-x-3 flex text-nowrap flex-col">
                        <p>{isLogin ? "Don't have account?" : "Already have an account?"}

                        </p>
                        <span className="text-my-green-900 underline hover:underline cursor-pointer" onClick={() => switchAuthForm()} >
                            {isLogin ? 'Sign up' : 'Log in'}
                        </span>
                    </div>
                </div>
            </Card>

        </div>
    )
}

export default AuthPage