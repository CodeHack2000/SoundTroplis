import { useEffect, useState } from "react"
import axios from "axios"
import {useParams, useNavigate} from 'react-router-dom'

axios.defaults.withCredentials = true

export default function Reviews() {
    const navigate = useNavigate()
    let {artist} = useParams()
    const [reviewsList, setReviewsList] = useState([])

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
        axios.post("http://localhost:5200/reviews/getAllReviewsOfArtist", {
            artist: artist
        })
            .then((res) => {
                if (res.data.message === "Invalid Artist!") {
                    alert("Invalid Artist!")
                    navigate("/artists")
                } else {
                    setReviewsList(res.data.response)
                }
            })
    }, [])

    return (
        <div className="pageContainer">
            {(reviewsList.length > 0 ? (reviewsList.map((object, key) => {
                return (
                    <div key={key}>
                        <h3>Artist: {object.artist}</h3>
                        <p>UserID: {object.userId}</p>
                        <p>Rank: {object.rank}</p>
                        <h4>ReviewID: {object._id}</h4>
                        <p>Comment: {object.comment}</p>
                        <p>Active: {String(object.status)}</p>
                    </div>
                )
            })) : <div>No Reviews...</div>)}
            <button onClick={() => {navigate(`/reviews/${artist}`)}}>Go Back</button>
        </div>
    )
}