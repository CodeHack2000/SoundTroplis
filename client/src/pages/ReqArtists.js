import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

axios.defaults.withCredentials = true

export default function ReqArtists() {
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
        axios.get("http://localhost:5100/artists/getAllRequiredArtists")
            .then((res) => {
                setArtistList(res.data.response)
            })
            .catch((err) => {alert(err)})
    }, [])

    return (
        <div className="pageContainer">
            {(artistList.length > 0 ? (artistList.map((object, key) => {
                return (
                    <div key={key}>
                        <h3>Variation: {object.variation}</h3>
                        <p>Name: {object.name}</p>
                        <p>Age: {object.age}</p>
                        <p>Status: {String(object.status)}</p>
                    </div>
                )
            })) : <div>No Requested Artists...</div>)}
            <button className="buttonPage"><a href="/artists">Go Back</a></button>
        </div>
    )
}