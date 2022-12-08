import { useState, useEffect } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

axios.defaults.withCredentials = true

export default function AddArtist() {
    const navigate = useNavigate()

    const [artistData, setArtistData] = useState({
        variation: "",
        name: "",
        age: 0,
    })

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

    const handleAddArtist = () => {
        if (artistData.variation.length >= 3 && artistData.name.length >= 3 && artistData.age > 5) {
            axios.post("http://localhost:5100/artists/addArtist", {
            variation: artistData.variation,
            name: artistData.name,
            age: artistData.age,
            },)
                .then((res) => {
                    if (res.data.message === "Success!") {
                        alert(res.data.message)
                        setArtistData({
                            variation: "",
                            name: "",
                            age: 0,
                        })
                        navigate("/artists")
                    } else alert(res.data.message)
                })
        } else alert("Please don't leave information in blank")
    }

    const handleRequestArtist = () => {
        if (artistData.variation.length >= 3 && artistData.name.length >= 3 && artistData.age > 5) {
            axios.post("http://localhost:5100/artists/requestArtist", {
            variation: artistData.variation,
            name: artistData.name,
            age: artistData.age,
            },)
                .then((res) => {
                    if (res.data.message === "Success!") {
                        alert(res.data.message)
                        setArtistData({
                            variation: "",
                            name: "",
                            age: 0,
                        })
                        navigate("/artists")
                    } else alert(res.data.message)
                })
        } else alert("Please don't leave information in blank")
    }

    return (
        <div className="pageContainer">
            <form method="POST" className="formContainer">
                <h1>Add Artist</h1>

                <label htmlFor="variation">Variation:</label>
                <input onChange={(event) => {setArtistData({...artistData, variation: event.target.value})}} type="text" name="variation" />
                
                <label htmlFor="name">Name:</label>
                <input onChange={(event) => {setArtistData({...artistData, name: event.target.value})}} type="text" name="name" />

                <label htmlFor="age">Age:</label>
                <input onChange={(event) => {setArtistData({...artistData, age: event.target.value})}} type="number" name="age" />

                <button type="button" onClick={handleAddArtist}>Add</button>
                <button type="button" onClick={handleRequestArtist}>Request</button>
            </form>
            <button className="buttonPage"><a href="/artists">Go Back</a></button>
        </div>
    )
}