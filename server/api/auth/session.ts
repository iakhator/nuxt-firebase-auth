import { useFirebaseAdmin } from '@/server/utils/firebaseAdmin'

export default defineEventHandler(async (event) => {
  const { adminAuth } = useFirebaseAdmin()
  const body = await readBody(event)
  const csrfTokenHeader = event.node.req.headers['x-csrf-token']
  const csrfTokenCookie = getCookie(event, 'csrf_token')

  if (!csrfTokenHeader || csrfTokenHeader !== csrfTokenCookie) {
    throw createError({ statusCode: 403, message: 'Invalid CSRF token' })
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(body.idToken)
    const sessionCookie = await adminAuth.createSessionCookie(body.idToken, {
      expiresIn: 60 * 60 * 24 * 5 * 1000, // 5 days
    })

    setCookie(event, 'session', sessionCookie, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 5, // 5 days
    })

    return { message: 'Session set', user: decodedToken }
  } catch {
    throw createError({ statusCode: 401, message: 'Invalid token' })
  }
})
