import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import firebase from "../firebase"

const Login = () => {
  let [login, setLogin] = useState({})
  let history = useHistory()

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // when auth state changes (user logs in and `user` obj exists)
        // then redirect to homepage
        history.push("/")
      } else {
        // do nothing
      }
    })

    return () => {
      // returning a function from an effect hook will run the function 
      // whenever the component gets unmounted
      unsubscribe()
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = login

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log("Returns: ", response)
      })
      .catch((err) => {
        setLogin({ ...login, error: err.message })
      })
  }

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }

  const displayError = login.error ? (
    <div className="alert alert-danger" role="alert">
      {login.error}
    </div>
  ) : null

  return (
    <>
      <h1>Login</h1>
      {displayError}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Log in
        </button>
      </form>
    </>
  )
}

export default Login
