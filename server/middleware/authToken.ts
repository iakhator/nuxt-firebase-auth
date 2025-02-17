import { useFirebaseAdmin } from '~/server/utils/firebaseAdmin'

export default defineEventHandler(async (event) => {
  const { adminAuth } = useFirebaseAdmin()
  const token = getCookie(event, 'authToken')

  if (!token) {
    event.context.user = null
    return
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token)
    event.context.user = decodedToken
  } catch (error) {
    event.context.user = null
    setCookie(event, 'authToken', '', { maxAge: -1 })
  }
})
