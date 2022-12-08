import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import { useState } from 'react';
import {AuthContext} from './contexts/AuthContext'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

import AddArtist from './pages/AddArtist'
import Artists from './pages/Artists';
import AlterArtist from './pages/AlterArtist';
import DeleteArtist from './pages/DeleteArtist';
import ReqArtists from './pages/ReqArtists';

import Reviews from './pages/Reviews';
import AllReviews from './pages/AllReviews'
import AddReview from './pages/AddReview'
import AlterReview from './pages/AlterReview'
import DeleteReview from './pages/DeleteReview'

function App() {
  const [authState, setAuthState] = useState({
    id: 0,
    username: "",
    email: "",
    status: false,
  })

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/addArtist" exact element={<AddArtist />} />
            <Route path="/artists" exact element={<Artists />} />
            <Route path="/reqArtists" exact element={<ReqArtists />} />
            <Route path="/alterArtist" exact element={<AlterArtist />} />
            <Route path="/deleteArtist" exact element={<DeleteArtist />} />
            <Route path="/reviews/:artist" exact element={<Reviews />} />
            <Route path="/allReviews/:artist" exact element={<AllReviews />} />
            <Route path="/addReview/:artist" exact element={<AddReview />} />
            <Route path="/alterReview/:artist" exact element={<AlterReview />} />
            <Route path="/deleteReview/:artist" exact element={<DeleteReview />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
