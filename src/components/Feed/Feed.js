import React, { useState, useEffect } from 'react'
import axios from 'axios'
import env from 'react-dotenv'
import { auth } from '../../firebase'
import { withRouter } from 'react-router-dom'
import crunchygirl from '../../assets/img/crunchyroll-girl.PNG'
import crunchylogo from '../../assets/img/crunchyroll.PNG'
import './styles.css'

const Feed = (props) => {
  const [post, setPost] = useState('')
  const [album, setAlbum] = useState('')
  const [book, setBook] = useState('')
  const [allPosts, setAllPosts] = useState(null)
  const [firebaseUser, setFirebaseUser] = useState(false)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setFirebaseUser(user)
      } else {
        props.history.push('/login')
      }
    })
  }, [props.history])

  useEffect(() => {
    axios
      .get(env.GET_ALL_POSTS)
      .then((response) => {
        setAllPosts(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  useEffect(() => {
    axios
      .get(env.GET_ALBUM)
      .then((response) => {
        setAlbum(response.link)
      })
      .catch((e) => {
        console.log(e)
      })
    axios
      .get(env.GET_BOOK)
      .then((response) => {
        setBook(response.link)
      })
      .catch((e) => {
        console.log(e)
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
      .then(() => {
        axios
          .get(env.GET_ALL_POSTS)
          .then((response) => {
            setAllPosts(response.data)
          })
          .catch((e) => {
            console.log(e)
          })
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
        <div className='container mt-4'>
          {allPosts &&
            allPosts.map((post) => (
              <div className='card mb-1' key={post.id}>
                <div className='card-body'>
                  <h5 className='card-title'>{post.data.usuario}</h5>
                  <h6 className='card-subtitle mb-2 text-muted'>
                    {post.data.time}
                  </h6>
                  <p className='card-text'>{post.data.descripcion}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className='d-none d-md-block col-3 text-center bsn-recommendations'>
        <h4 className='mt-5 text-muted'>Albúm del Mes</h4>
        <div>{album && <img src={album} alt='album of the month' />}</div>
        <h4 className='mt-4 text-muted'>Libro del Mes</h4>
        <div>
          {book && (
            <img className='w-50 mt-3' src={book} alt='book of the month' />
          )}
        </div>
      </div>
    </div>
  )
}

export default withRouter(Feed)
