import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDA9oACrLKlxxXEicm408VmreKrXWSb4jQ',
  authDomain: 'social-network-7ca44.firebaseapp.com',
  databaseURL: 'https://social-network-7ca44.firebaseio.com',
  projectId: 'social-network-7ca44',
  storageBucket: 'social-network-7ca44.appspot.com',
  messagingSenderId: '172591255057',
  appId: '1:172591255057:web:52db7141b94226ccea6bb0',
}

app.initializeApp(firebaseConfig)

const db = app.firestore()
const auth = app.auth()

export { db, auth }
