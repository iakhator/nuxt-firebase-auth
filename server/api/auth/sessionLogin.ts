import { useFirebaseAdmin } from '@/server/utils/firebaseAdmin'

export default defineEventHandler(async (event) => {
  try {
    const { adminAuth } = useFirebaseAdmin()
    const { idToken } = await readBody(event)
    const csrfTokenHeader = getHeaders(event)['x-csrf-token']

    if (!csrfTokenHeader) {
      throw createError({ statusCode: 403, message: 'Missing CSRF token' })
    }

    // Verify Firebase ID token
    const decodedToken = await adminAuth.verifyIdToken(idToken)

    // Create a session cookie (valid for 7 days)
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: 7 * 24 * 60 * 60 * 1000,
    })

    // Set secure HTTP-only session cookie
    setCookie(event, 'session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    })

    return { success: true }
  } catch (error: any) {
    return createError({
      statusCode: 401,
      message: error.message || 'Invalid token',
    })
  }
})
