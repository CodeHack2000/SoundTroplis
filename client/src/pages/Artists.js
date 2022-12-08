import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

axios.defaults.withCredentials = true

export default function Artists() {
    const navigate = useNavigate()
    const [artistList, setArtistList] = useState([])

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

    useEffect(() => {
        axios.get("http://localhost:5100/artists/getAllArtists")
            .then((res) => {
                setArtistList(res.data.response)
            })
            .catch((err) => {alert(err)})
    }, [])

    return (
        <div className="pageContainer">
            <div className="navbar">
                <button><a href="/reqArtists">Requested Artists</a></button>
                <button><a href="/addArtist">Add Artist</a></button>
                <button><a href="/alterArtist">Alter Artist</a></button>
                <button><a href="/deleteArtist">Delete Artist</a></button>
                <button><a href="/">Home</a></button>
            </div>
            {(artistList.length > 0 ? (artistList.map((object, key) => {
                return (
                    <div key={key}>
                        <h3>Variation: {object.variation}</h3>
                        <p>Name: {object.name}</p>
                        <p>Age: {object.age}</p>
                        <button onClick={() => {navigate(`/reviews/${object.variation}`)}}>Reviews</button>
                    </div>
                )
            })) : <div>No Artists...</div>)}
        </div>
    )
}