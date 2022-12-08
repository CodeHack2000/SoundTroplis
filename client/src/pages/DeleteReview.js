import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"

axios.defaults.withCredentials = true

export default function DeleteReview() {
    const {artist} = useParams()
    const navigate = useNavigate()
    const [reviewId, setReviewId] = useState("")

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

    const handleDeleteReview = () => {
        if (reviewId.length == 24) {
            axios.post("http://localhost:5200/reviews/delReview", {
                id: reviewId
            })
                .then((res) => {
                    if (res.data.message === "Success!") {
                        setReviewId("")
                        alert("Success!")
                        navigate(`/reviews/${artist}`)
                    } else alert(res.data.message)
                })
                .catch((err) => {alert(err)})
        }
    }

    return (
        <div className="pageContainer">
            <form method="POST" className="formContainer">
                <h1>Delete Review</h1>
                
                <label htmlFor="id">ReviewID:</label>
                <input onChange={(event) => {setReviewId(event.target.value)}} type="text" name="id" />

                <button className="btnExpress" onClick={handleDeleteReview} type="button">Delete</button>
            </form>
            <button onClick={() => {navigate(`/reviews/${artist}`)}}>Go Back</button>
        </div>
    )
}