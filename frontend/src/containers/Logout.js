import React, { useEffect } from "react"
import firebase from "../firebase"
import { useHistory } from "react-router-dom"

const Logout = () => {
  const history = useHistory()

  useEffect(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("logging out...")
        history.push("/")
      })
      .catch((err) => {
        console.error(err)
      })
    return () => {}
  }, [history])

  return <div>Logging out...</div>
}

export default Logout