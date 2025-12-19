import {useState} from 'react'
import {useNavigate, Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()
  const jwtToken = Cookies.get('jwt_token')

  const onSubmitSuccess = jwtToken => {
    
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    
    // 2. Navigate to the home route immediately
    // Using replace: true prevents the login page from staying in history
    navigate('/', {replace: true})
  }

  const onSubmitFailure = msg => {
    setShowSubmitError(true)
    setErrorMsg(msg)
  }

  const submitForm = async event => {
    event.preventDefault()
    
    if (username === '' || password === '') {
      onSubmitFailure('Please enter both username and password')
      return
    }

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      
      if (response.ok === true) {
        onSubmitSuccess(data.jwt_token)
      } else {
        onSubmitFailure(data.error_msg)
      }
    } catch (error) {
      onSubmitFailure('Something went wrong. Please try again.')
    }
  }

  // If the token already exists, redirect to home immediately
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="login-form-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        className="login-website-logo-mobile-img"
        alt="website logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        className="login-img"
        alt="website login"
      />
      <form className="form-container" onSubmit={submitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-desktop-img"
          alt="website logo"
        />
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="username-input-field"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="password-input-field"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  )
}

export default LoginForm