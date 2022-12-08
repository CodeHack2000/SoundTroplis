import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

axios.defaults.withCredentials = true

export default function AlterArtist() {
    const {artist} = useParams()
    const navigate = useNavigate()

    const [reviewData, setReviewData] = useState({
        id: "",
        rank: 0,
        comment: "",
        status: "true",
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

    const handleGetReviewData = () => {
        if (reviewData.id.length == 24) {
            axios.post("http://localhost:5200/reviews/getReview", {id: reviewData.id})
                .then((res) => {
                    if (res.data.message === "Success!") {
                        setReviewData({
                            id: res.data.response._id,
                            rank: res.data.response.rank,
                            comment: res.data.response.comment,
                            status: String(res.data.response.status),
                        })
                    } else alert(res.data.message)
                })
                .catch((err) => {alert(err)})
        } else alert("Invalid Review ID!")
    }

    const handleAlterReview = () => {
        if (reviewData.id.length == 24 && reviewData.rank >= 0 && reviewData.rank <= 5 && (reviewData.status === "true" || reviewData.status === "false")) {
            axios.put("http://localhost:5200/reviews/alterReview", {
                id: reviewData.id,
                rank: reviewData.rank,
                comment: reviewData.comment,
                status: reviewData.status,
            })
                .then((res) => {
                    if (res.data.message === "Success!") {
                        setReviewData({
                            id: "",
                            userId: "",
                            rank: 0,
                            comment: "",
                            status: true,
                        })
                        alert("Success!")
                        navigate(`/reviews/${artist}`)
                    } else alert(res.data.message)
                })
                .catch((err) => {alert(err)})
        } else alert("Something wrong! Check your inputs!")
    }

    return (
        <div className="pageContainer">
            <form method="POST" className="formContainer">
                <h1>Alter Review</h1>
                
                <label htmlFor="id">ReviewID:</label>
                <input onChange={(event) => {setReviewData({...reviewData, id: event.target.value})}} type="text" name="id" />
                <button type="button" onClick={handleGetReviewData}>Get Review Data</button>

                <label htmlFor="rank">Rank: (0 - 5)</label>
                <input value={reviewData.rank} onChange={(event) => {setReviewData({...reviewData, rank: event.target.value})}} type="number" name="rank" />

                <label htmlFor="comment">Comment:</label>
                <input value={reviewData.comment} onChange={(event) => {setReviewData({...reviewData, comment: event.target.value})}} type="text" name="comment" />

                <label htmlFor="status">Active: (true / false)</label>
                <input value={reviewData.status} onChange={(event) => {setReviewData({...reviewData, status: event.target.value})}} type="boolean" name="status" />

                <button className="btnExpress" onClick={handleAlterReview} type="button">Alter</button>
            </form>
            <button onClick={() => {navigate(`/reviews/${artist}`)}}>Go Back</button>
        </div>
    )
}