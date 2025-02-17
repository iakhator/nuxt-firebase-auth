import {
  initializeApp,
  cert,
  getApps,
  ServiceAccount,
} from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import serviceAccountKey from '~/serviceAccountKey'

export function useFirebaseAdmin() {
  // const config = useRuntimeConfig();

  if (!getApps().length) {
    try {
      initializeApp({
        credential: cert(serviceAccountKey as ServiceAccount),
      })
    } catch (error) {
      console.error('❌ Firebase Admin Initialization Failed:', error)
    }
  }

  return {
    adminAuth: getAuth(),
    adminFirestore: getFirestore(),
  }
}
