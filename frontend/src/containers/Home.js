import React, { useEffect, useState } from "react"
import firebase from "../firebase"
import axios from "axios"

const Home = () => {
  let [userMeta, setUserMeta] = useState({})
  let [token, setToken] = useState({})

  useEffect(() => {
    // useEffect runs whenever a component is mounted or rerenders
    const stopListening = firebase.auth().onAuthStateChanged((user) => {
      // if user object exists, user is logged in
      if (user) {
        // grab email, user id from firebase user obj
        // and set state with it
        const { email, uid } = user
        const lastLogin = user.metadata.lastSignInTime

        setUserMeta({ email, uid, lastLogin })
        getFirebaseIdToken()
      } else {
        // user object doesnt exist, therefore user is not logged in
        console.log("user is not logged in")
      }
    })
    return () => {
      // kill firebase event listener when component unmounts
      stopListening()
    }
  }, [])

  const getFirebaseIdToken = () => {
    firebase
      .auth()
      .currentUser.getIdToken(false)
      .then((token) => {
        setToken({ token })
      })
      .catch((error) => {
        // Handle error
        console.error(error)
      })
  }

  const handleUnprotectedAPI = (e) => {
    axios
      .post("http://localhost:3001/unprotected", {
        id: userMeta.uid,
        email: userMeta.email,
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data)
      })
  }

  const handleProtectedAPI = (e) => {
    axios
      .post("http://localhost:3001/protected", token)
      .then((response) => response.data)
      .then((data) => {
        console.log(data)
      })
  }

  const handleAnonymousAPI = () => {
    axios
      .get("http://localhost:3001/anonymous")
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  if (!userMeta.email) {
    return (
      <>
        <h1>You're not logged in</h1>
        <button onClick={handleAnonymousAPI}>Unprotected anonymous API</button>
      </>
    )
  } else {
    return (
      <>
        <h2>Welcome, {userMeta.email}</h2>
        <h4>Your ID is: {userMeta.uid}</h4>
        <h4>You last signed in: {userMeta.lastLogin}</h4>
        <button onClick={handleUnprotectedAPI}>
          Unprotected API Invokation
        </button>
        <button onClick={handleProtectedAPI}>Protected API</button>
      </>
    )
  }
}

export default Home
