import React, { useState, useEffect } from 'react'
import axios from 'axios'
import env from 'react-dotenv'
import { auth } from '../../firebase'
import crunchygirl from '../../assets/img/crunchyroll-girl.PNG'
import crunchylogo from '../../assets/img/crunchyroll.PNG'
import './styles.css'

const Feed = () => {
  const [post, setPost] = useState('')
  const [firebaseUser, setFirebaseUser] = useState(false)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setFirebaseUser(user)
      }
    })
  }, [])

  const sendPost = (e) => {
    setDisabled(true)
    e.preventDefault()
    const postInfo = {
      usuario: firebaseUser.displayName,
      descripcion: post,
    }
    axios
      .post(env.SEND_POST, postInfo)
      .then((response) => {
        setPost('')
        setDisabled(false)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  return (
    <div className='row bsn-container'>
      <div className='d-none d-sm-block col-2 text-center bsn-advertising'>
        <img src={crunchygirl} alt='anime-girl' className='anime-girl' />
        <img src={crunchylogo} alt='anime-girl' className='anime-logo' />
      </div>
      <div className='col-12 col-sm-9 col-md-7'>
        <form onSubmit={sendPost} className='text-right'>
          <div className='form-group'>
            <input
              type='text'
              value={post}
              className='form-control mt-4'
              id='inputPost'
              aria-describedby='inputPost'
              placeholder='¿Qué has leído ultimamente?'
              onChange={(e) => setPost(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-info' disabled={disabled}>
            Publicar
          </button>
        </form>
      </div>
      <div className='d-none d-md-block col-3 bsn-recommendations'></div>
    </div>
  )
}

export default Feed
