import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

axios.defaults.withCredentials = true

export default function Register() {
    const navigate = useNavigate()

    const [userObject, setUserObject] = useState({
        username: "",
        email: "",
        password: "",
    })

    const handleRegister = () => {
        axios.post("http://localhost:5000/auth/register", {
            username: userObject.username,
            email: userObject.email,
            password: userObject.password,
        })
            .then((res) => {
                if (res.data.error) {
                    alert(res.data.error)
                } else {
                    alert("Successfully Registered!")
                    navigate("/login")
                }
            })
    }

    return (
        <div className='pageContainer'>
            <form method="POST" className="formContainer">
                <h1>Register</h1>
                
                <label htmlFor="username">Username:</label>
                <input onChange={(event) => {setUserObject({...userObject, username: event.target.value})}} type="text" name="username" />

                <label htmlFor="email">Email:</label>
                <input onChange={(event) => {setUserObject({...userObject, email: event.target.value})}}  type="email" name="email" />
                
                <label htmlFor="password">Password:</label>
                <input onChange={(event) => {setUserObject({...userObject, password: event.target.value})}}  type="password" name="password" />

                <button type="button" onClick={handleRegister}>Create Account</button>
            </form>
            <button className="buttonPage"><a href="/login">Login Page</a></button>
        </div>
    )
}