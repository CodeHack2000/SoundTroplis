import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

axios.defaults.withCredentials = true

export default function AlterArtist() {
    const navigate = useNavigate()

    const [artistData, setArtistData] = useState({
        variation: "",
        name: "",
        age: 0,
        status: true,
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

    const handleGetArtistData = () => {
        if (artistData.variation.length >= 3) {
            axios.post("http://localhost:5100/artists/getArtist", {variation: artistData.variation})
                .then((res) => {
                    setArtistData({
                        variation: res.data.response.variation,
                        name: res.data.response.name,
                        age: res.data.response.age,
                        status: res.data.response.status,
                    })
                })
                .catch((err) => {alert(err)})
        } else alert("Invalid Artist!")
    }

    const handleAlterArtist = () => {
        if (artistData.variation.length >= 3 && artistData.name.length >= 3 && artistData.age > 7) {
            axios.put("http://localhost:5100/artists/alterArtist", {
                variation: artistData.variation,
                name: artistData.name,
                age: artistData.age,
                status: artistData.status,
            })
                .then((res) => {
                    if (res.data.message === "Success!") {
                        setArtistData({
                            variation: "",
                            name: "",
                            age: 0,
                            status: true,
                        })
                        alert("Success!")
                        navigate("/artists")
                    } else alert(res.data.message)
                })
                .catch((err) => {alert(err)})
        }
    }

    return (
        <div className="pageContainer">
            <form method="POST" className="formContainer">
                <h1>Alter Artist</h1>
                
                <label htmlFor="variation">Variation:</label>
                <input onChange={(event) => {setArtistData({...artistData, variation: event.target.value})}} type="text" name="variation" />
                <button type="button" onClick={handleGetArtistData}>Get Artist Data</button>

                <label htmlFor="name">Name:</label>
                <input value={artistData.name} onChange={(event) => {setArtistData({...artistData, name: event.target.value})}} type="text" name="name" />

                <label htmlFor="age">Age:</label>
                <input value={artistData.age} onChange={(event) => {setArtistData({...artistData, age: event.target.value})}} type="number" name="age" />

                <label htmlFor="status">Status:</label>
                <input value={artistData.status} onChange={(event) => {setArtistData({...artistData, status: event.target.value})}} type="text" name="status" />

                <button className="btnExpress" onClick={handleAlterArtist} type="button">Alter</button>
            </form>
            <button className="buttonPage"><a href="/artists">Go Back</a></button>
        </div>
    )
}