import { useFirebaseAdmin } from '~/server/utils/firebaseAdmin'

export default defineEventHandler(async (event) => {
  // const { adminAuth } = useFirebaseAdmin()
  // const token = getCookie(event, 'authToken')
  // if (!token) {
  //   event.context.user = null
  //   return
  // }
  // try {
  //   const decodedToken = await adminAuth.verifyIdToken(token)
  //   event.context.user = decodedToken
  //   // setCookie(event, 'authToken', token, {
  //   //   httpOnly: true,
  //   //   secure: process.env.NODE_ENV === 'production',
  //   //   sameSite: 'strict',
  //   //   path: '/',
  //   //   maxAge: 60 * 60 * 24 * 7,
  //   // })
  // } catch (error) {
  //   event.context.user = null
  //   setCookie(event, 'authToken', '', { maxAge: -1 })
  // }
})
