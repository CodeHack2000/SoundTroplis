import {useEffect, useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

axios.defaults.withCredentials = true

export default function Dashboard() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        id: "",
        role: "",
    })
    const [targetEmail, setTargetEmail] = useState("")

    useEffect(() => {
        const interval = setInterval(() => {
            window.location.reload()
        }, 1800000)
    }, [])

    useEffect(() => {
        axios.get("http://localhost:5000/auth/isAuth")
            .then((res) => {
                if (!res.data.auth) {
                    axios.get("http://localhost:5000/auth/newToken")
                        .then((res) => {
                            if (!res.data.state) navigate("/login")
                        })
                }
            })
    }, [])

    const handleLogout = () => {
        axios.post("http://localhost:5000/auth/logout")
            .then(() => {
                navigate("/login")
            })
    }

    const handleUserData = () => {
        axios.get("http://localhost:5000/auth/userData")
            .then((res) => {
                if (res.data.user) setUserData(res.data.user)
                else alert("Sorry for the inconvenience, but please try again!")
            })
    }

    const handlePermissions = () => {
        axios.get("http://localhost:5000/auth/highPermissions")
            .then((res) => {
                alert(res.data.message)
            })
    }
    
    const handleGivePermissions = () => {
        if (targetEmail.length >= 12) {
            axios.post("http://localhost:5000/auth/givePermissions", {
                email: targetEmail,
            })
                .then((res) => {
                    if (!res.data.state) alert("Sorry for the inconvenience, but please try again!")
                    else alert("Success!")
                })
        } else alert("Email must have 12 or more characters")
    }

    return (
        <div className="dashboardContainer">
            <h2>Dashboard</h2>

            <p>{userData.id} - {userData.role} </p>

            <button><a href="/artists">Artist List</a></button>
            <button onClick={handleUserData}>Get User Data</button>
            <button onClick={handlePermissions}>Check Permissions</button>
            {userData.role === "Admin" && (
                <div className="rightsContainer">
                    <h3>Give or Take Away Moderator Rights </h3>
                    <label>Email:</label>
                    <input onChange={(event) => setTargetEmail(event.target.value)} type="email" placeholder='User Email...' />
                    <button onClick={handleGivePermissions}>Apply</button>
                </div>
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}