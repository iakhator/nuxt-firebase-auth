import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(() => {
  const config = {
    apiKey: 'AIzaSyBAjpPVYVAISsTdfORUmW277ljVd_G7mVo',
    authDomain: 'nuxt-auth-3893a.firebaseapp.com',
    projectId: 'nuxt-auth-3893a',
    storageBucket: 'nuxt-auth-3893a.firebasestorage.app',
    messagingSenderId: '361342646',
    appId: '1:361342646:web:f58b033c222ca26ed0a817',
    measurementId: 'G-3KLG637QFM',
  }

  const firebaseApp = initializeApp(config)
  const auth = getAuth(firebaseApp)
  const firestore = getFirestore(firebaseApp)

  return {
    provide: {
      auth,
      firestore,
    },
  }
})
