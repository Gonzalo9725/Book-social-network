import app from 'firebase/app'
import env from 'react-dotenv'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  databaseURL: env.DATABASE_URL,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
}

app.initializeApp(firebaseConfig)

const db = app.firestore()
const auth = app.auth()

export { db, auth }
