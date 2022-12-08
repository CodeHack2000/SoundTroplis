import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

axios.defaults.withCredentials = true

export default function DeleteArtist() {
    const navigate = useNavigate()
    const [variation, setVariation] = useState("")

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

    const handleDeleteArtist = () => {
        if (variation.length >= 3) {
            axios.post("http://localhost:5100/artists/delArtist", {
                variation: variation
            })
                .then((res) => {
                    if (res.data.message === "Success!") {
                        setVariation("")
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
                <h1>Delete Artist</h1>
                
                <label htmlFor="variation">Variation:</label>
                <input onChange={(event) => {setVariation(event.target.value)}} type="text" name="variation" />

                <button className="btnExpress" onClick={handleDeleteArtist} type="button">Delete</button>
            </form>
            <button className="buttonPage"><a href="/artists">Go Back</a></button>
        </div>
    )
}