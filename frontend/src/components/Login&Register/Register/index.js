import React, { useState, useEffect } from 'react'
import { getCookie, setCookie } from '../../../util/cookie'
import { Link, Redirect } from 'react-router-dom'

export default function Register () {
  const [login, setLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [errMsg, setErrMsg] = useState([])
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const token = getCookie('x-auth-token')
    token && getUser()
  }, [])

  async function getUser () {
    const response = await window.fetch('user/getuser/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      const jsonData = await response.json()
      console.log('USER DETAILS', jsonData)
      setLogin(true)
    } else {
      console.log('error in geting users')
    }
  }

  async function userRegister (event) {
    event.preventDefault()
    try {
      const response = await window.fetch('user/', {
        method: 'POST',
        body: JSON.stringify({
          email,
          name,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        const jsonData = await response.json()
        setEmail('')
        setName('')
        setPassword('')
        setLogin(true)
      } else {
        const jsonData = await response.json()
        setErrMsg(jsonData.msg)
        throw new Error(jsonData.msg)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return login ? (
    <Redirect to='/todo' />
  ) : (
    <div className='register-container'>
      <div className='form-container'>
        <div className='register-login-title-container'>
          <h1 className='heading'>Register</h1>
        </div>
        <form onSubmit={userRegister}>
          <div className='error-message'>{errMsg}</div>
          <div className='form-row'>
            <label>Full Name</label>
            <input
              value={name}
              placeholder='Enter Full Name'
              onChange={e => setName(e.target.value)}
              required
              title='enter a valid email address'
            />
          </div>
          <div className='form-row'>
            <label>Email</label>
            <input
              type='email'
              value={email}
              placeholder='Enter Email'
              onChange={e => setEmail(e.target.value)}
              required
              title='enter a valid email address'
            />
          </div>
          <div className='form-row'>
            <label>Password</label>
            <input
              type='password'
              value={password}
              placeholder='Enter password'
              required
              pattern='.{6,}'
              title='6 characters minimum'
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='form-row'>
            <button type='submit'>Register</button>
          </div>
          <div className='form-footer'>
            <Link to='/login'>Already have an Account?Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
