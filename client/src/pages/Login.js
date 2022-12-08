import {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {AuthContext} from '../contexts/AuthContext'

axios.defaults.withCredentials = true

axios.defaults.withCredentials = true

export default function Login() {
    const navigate = useNavigate()
    const {authState, setAuthState} = useContext(AuthContext)

    const [userObject, setUserObject] = useState({
        email: "",
        password: "",
    })

    const handleLogin = () => {
        axios.post("http://localhost:5000/auth/login", {
            email: userObject.email,
            password: userObject.password,
        })
            .then((res) => {
                if (res.data.error || !res.data.auth) {
                    setAuthState({...authState, status: false})
                    alert(res.data.error)
                } else {
                    setAuthState({
                        id: res.data.user.id,
                        username: res.data.user.username,
                        email: res.data.user.email,
                        status: true,
                    })
                    alert("Success!")
                    navigate("/")
                }
            })
            .catch(() => {alert("Many failed login tries, please wait 10min")})
    }

    return (
        <div className="pageContainer">
            <form method="POST" className="formContainer">
                <h1>Login</h1>

                <label htmlFor="email">Email:</label>
                <input onChange={(event) => {setUserObject({...userObject, email: event.target.value})}}  type="email" name="email" />
                
                <label htmlFor="password">Password:</label>
                <input onChange={(event) => {setUserObject({...userObject, password: event.target.value})}}  type="password" name="password" />

                <button type="button" onClick={handleLogin}>Sign in</button>
            </form>
            <button className="buttonPage"><a href="/register">Register Page</a></button>
        </div>
    )
}