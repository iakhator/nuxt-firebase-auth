import { useFirebaseAdmin } from '@/server/utils/firebaseAdmin'

export default defineEventHandler(async (event) => {
  const { adminAuth } = useFirebaseAdmin()
  const sessionCookie = getCookie(event, 'session')

  if (!sessionCookie) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized: No session found',
    })
  }

  try {
    // ✅ Verify session cookie
    const decodedToken = await adminAuth.verifySessionCookie(
      sessionCookie,
      true
    )

    // ✅ Return user data
    return {
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email,
      },
    }
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized: Invalid session',
    })
  }
})
