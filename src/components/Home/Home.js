import React, { useEffect } from 'react'
import Learning from '../../assets/img/learning.svg'
import { auth } from '../../firebase'
import { withRouter } from 'react-router-dom'

const Home = (props) => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        props.history.push('/home')
      }
    })
  }, [props.history])

  return (
    <div>
      <div className='mt-3 text-center'>
        <h1>Bienvenido a Book</h1>
        <p className='font-weight-normal'>Tu red social de libros y música</p>
        <img src={Learning} alt='learning-desk' className='w-25' />
      </div>
    </div>
  )
}

export default withRouter(Home)
