import axios from "axios"
import apiUtils from "../utils/apiUtils"
import { useState } from "react"

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [msgColor, setMsgColor] = useState("");

  const URL = apiUtils.getUrl()

  const handleUsername = (evt) => {
    setUserName(evt.target.value)
  }

  const handlePassword = (evt) => {
    setUserPass(evt.target.value)
  }

  const registerUser = async () => {
    try {
      await axios.post(URL + '/user/register', {
        userName: userName,
        userPass: userPass
      })
      setMsgColor('#4caf50');
      setStatusMessage('Account was registered successfully!');
    } catch (error) {
      setStatusMessage("Username already exists")
      setMsgColor('#FF0000')
    }
  }

  return (
    <div>
      <div className="center">
        <h1>Register</h1>
        <p className="statusMsg" style={{ color: msgColor }}>{statusMessage}</p>
        <form className="form-group" >
          <input onChange={handleUsername} className="loginInput" placeholder="Username" id="username" />
          <br></br>
          <input onChange={handlePassword} className="loginInput" type="password" placeholder="Password" id="password" />
          <br></br>
        </form>
        <button onClick={registerUser} className="btn btn-primary loginButton">Sign up</button>
      </div>
    </div>
  )
}

export default Register