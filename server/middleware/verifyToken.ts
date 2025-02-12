import { useFirebaseAdmin } from '~/server/utils/firebaseAdmin'

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')

  if (!authHeader?.startsWith('Bearer ')) {
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    const { adminAuth } = useFirebaseAdmin()
    const user = await adminAuth.verifyIdToken(token)
    event.context.authUser = user
  } catch (error) {
    setResponseStatus(event, 401)
    event.context.authUser = null
  }
})
