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

    useEffect( () => {
        axios.post("http://localhost:5200/reviews/getAllActiveReviewsOfArtist", {
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
            <div className="navbar">
                <button onClick={() => {navigate(`/allReviews/${artist}`)}}>All Reviews of {artist}</button>
                <button onClick={() => {navigate(`/addReview/${artist}`)}}>Add Review</button>
                <button onClick={() => {navigate(`/alterReview/${artist}`)}}>Alter Review</button>
                <button onClick={() => {navigate(`/deleteReview/${artist}`)}}>Delete Review</button>
                <button><a href="/artists">Go Back</a></button>
            </div>
            {(reviewsList.length > 0 ? (reviewsList.map((object, key) => {
                return (
                    <div key={key}>
                        <h3>Artist: {object.artist}</h3>
                        <p>UserID: {object.userId}</p>
                        <h4>ReviewID: {object._id}</h4>
                        <p>Rank: {object.rank}</p>
                        <p>Comment: {object.comment}</p>
                    </div>
                )
            })) : <div>No Reviews...</div>)}
        </div>
    )
}