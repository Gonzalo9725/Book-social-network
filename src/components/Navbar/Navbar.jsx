import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { auth } from '../../firebase'
import { withRouter } from 'react-router-dom'
import './styles.css'

const Navbar = (props) => {
  const [firebaseUser, setFirebaseUser] = useState(false)

  const cerrarSesion = () => {
    auth.signOut().then(() => {
      props.history.push('/login')
    })
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setFirebaseUser(user)
      }
    })
  }, [])

  return (
    <div className='navbar bsn-navbarcolor'>
      <Link to='/home' className='bsn-logo'>
        Book
      </Link>
      <div>
        <div className='d-flex'>
          {props.firebaseUser !== null ? (
            <>
              <img
                src={firebaseUser.photoURL}
                alt='profile'
                className='bsn-profile-photo'
              />
              <button
                className='btn bsn-navbarcolor text-white'
                onClick={() => cerrarSesion()}
              >
                Sign Out
              </button>
            </>
          ) : (
            <NavLink className='btn bsn-navbarcolor text-white' to='/login'>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  )
}

export default withRouter(Navbar)
