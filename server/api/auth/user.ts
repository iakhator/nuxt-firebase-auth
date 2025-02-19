import { useFirebaseAdmin } from '@/server/utils/firebaseAdmin'

export default defineEventHandler(async (event) => {
  const { adminAuth } = useFirebaseAdmin()
  try {
    const sessionCookie = getCookie(event, 'session')
    if (!sessionCookie) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    const decodedToken = await adminAuth.verifySessionCookie(sessionCookie)
    const user = await adminAuth.getUser(decodedToken.uid)
    return { user }
  } catch (error) {
    return createError({ statusCode: 401, message: 'Invalid session' })
  }
})
