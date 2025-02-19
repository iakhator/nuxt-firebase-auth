import { randomBytes } from 'crypto'

export default defineEventHandler((event) => {
  // const csrfToken = getCookie(event, 'csrf_token')
  // return { csrfToken }
  //

  const csrfToken = randomBytes(32).toString('hex')

  setCookie(event, 'csrfToken', csrfToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  })

  return { token: csrfToken }
})
