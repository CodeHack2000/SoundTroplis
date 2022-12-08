import { useState, useEffect } from "react";
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'

axios.defaults.withCredentials = true

export default function AddArtist() {
    const {artist} = useParams()
    const navigate = useNavigate()

    const [reviewData, setReviewData] = useState({
        rank: 0,
        comment: "",
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

    const handleAddReview = () => {
        if (reviewData.rank >= 0 && reviewData.rank <= 5) {
            axios.post("http://localhost:5200/reviews/addReview", {
            artist: artist,
            rank: reviewData.rank,
            comment: reviewData.comment,
            },)
                .then((res) => {
                    if (res.data.message === "Success!") {
                        alert(res.data.message)
                        setReviewData({
                            rank: 0,
                            comment: "",
                        })
                        navigate(`/reviews/${artist}`)
                    } else alert(res.data.message)
                })
        } else alert("Please don't leave information in blank")
    }

    return (
        <div className="pageContainer">
            <form method="POST" className="formContainer">
                <h1>Add Review for {artist}</h1>
                
                <label htmlFor="rank">Rank: (0 - 5)</label>
                <input onChange={(event) => {setReviewData({...reviewData, rank: event.target.value})}} type="number" name="rank" />

                <label htmlFor="comment">Comment:</label>
                <input onChange={(event) => {setReviewData({...reviewData, comment: event.target.value})}} type="text" name="comment" />

                <button type="button" onClick={handleAddReview}>Add</button>
            </form>
            <button onClick={() => {navigate(`/reviews/${artist}`)}}>Go Back</button>
        </div>
    )
}