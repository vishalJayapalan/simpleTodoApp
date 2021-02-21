import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Login () {
  const [login, setLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState([])

  async function userLogin (event) {
    event.preventDefault()
    try {
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='login-container'>
      <div className='form-container'>
        <div className='register-login-title-container'>
          <h1 className='heading'>Login</h1>
        </div>
        <form onSubmit={userLogin}>
          <div className='error-message'>{errorMsg}</div>
          <div className='form-row'>
            <label>Email</label>
            <input
              type='email'
              value={email}
              placeholder='Enter Email'
              pattern='.{6,}'
              onChange={e => setEmail(e.target.value)}
              required
              title='Enter a valid email address with atleast 6 characters'
            />
          </div>
          <div className='form-row'>
            <label>Password</label>
            <input
              type='password'
              value={password}
              placeholder='Enter Password'
              required
              pattern='.{6,}'
              title='6 characters minimum'
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='form-row'>
            <button type='submit'>Log In</button>
          </div>
          <div className='form-footer'>
            <Link to='/'>Dont have an account,click here to Register</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
