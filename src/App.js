import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'
import Reset from './components/Reset'
import { auth } from './firebase'

function App() {
  const [firebaseUser, setFirebaseUser] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setFirebaseUser(user)
      } else {
        setFirebaseUser(null)
      }
    })
  }, [])

  return firebaseUser !== false ? (
    <Router>
      <div className='container-fluid'>
        <Navbar firebaseUser={firebaseUser} />
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/reset'>
            <Reset />
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <div className='d-flex justify-content-center'>Loading...</div>
  )
}

export default App
