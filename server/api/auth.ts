import { useFirebaseAdmin } from '~/server/utils/firebaseAdmin'

export default defineEventHandler(async (event) => {
  const { adminAuth } = useFirebaseAdmin()

  const token = getCookie(event, 'authToken')

  if (!token) {
    return { user: null }
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token)
    // console.log(decodedToken, 'token')
    return { user: decodedToken }
  } catch (error) {
    return { user: null }
  }
})
