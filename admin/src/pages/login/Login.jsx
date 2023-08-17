import { useContext, useState } from 'react';
import "./login.scss"
// import { AuthContext } from "../../context/AuthContext"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post("/auth/login", credentials)
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details })
        navigate("/")
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
    }
  }

  // console.log(user)

  return (
    <div className='login'>
      <div className="lContainer">
        <input type="text" id="username" className="lInput" placeholder='username' onChange={handleChange} />
        <input type="password" id="password" className="lInput" placeholder='password' onChange={handleChange} />
        <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
        {error && <span style={{ color: "#ff0000" }}>{error.message}</span>}
      </div>

    </div>
  )
}

export default Login
