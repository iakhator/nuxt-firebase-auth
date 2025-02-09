import { H3Event } from 'h3'
import { useFirebaseAdmin } from '~/server/utils/firebaseAdmin'

interface UserResponse {
  userDetails: {
    uid: string
    email?: string
    displayName?: string
  }
  token: string
}

interface ErrorResponse {
  statusCode: number
  statusMessage: string
}

export default defineEventHandler(
  async (event: H3Event): Promise<UserResponse | ErrorResponse> => {
    try {
      const { adminAuth } = useFirebaseAdmin()
      const { email, password, displayName } = await readBody(event)

      const user = await adminAuth.createUser({ email, password, displayName })
      const token = await adminAuth.createCustomToken(user.uid)

      setResponseStatus(event, 200)
      return {
        userDetails: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        },
        token,
      }
    } catch (error: any) {
      if (error.code === 'auth/email-already-exists') {
        setResponseStatus(event, 400)
        return { statusCode: 400, statusMessage: error.message }
      }

      setResponseStatus(event, 500)
      return { statusCode: 500, statusMessage: error.message }
    }
  }
)
