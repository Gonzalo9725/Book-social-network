import React from 'react'
import { auth, app } from '../../firebase'
import { withRouter, useHistory } from 'react-router-dom'

const Login = (props) => {
  const history = useHistory()
  const signUpGoogle = () => {
    const provider = new app.auth.GoogleAuthProvider()

    auth
      .signInWithPopup(provider)
      .then(() => {
        history.push('/home')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='mt-5'>
      <h2 className='text-center'>Bienvenido a Book</h2>
      <div className='row justify-content-center mt-5'>
        <button
          className='btn btn-warning btn-lg color-white'
          onClick={signUpGoogle}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default withRouter(Login)
