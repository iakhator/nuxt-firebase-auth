import { randomBytes } from 'crypto'

export default defineEventHandler((event) => {
  let csrfToken = getCookie(event, 'csrfToken')

  if (!csrfToken) {
    csrfToken = randomBytes(32).toString('hex')
    setCookie(event, 'csrfToken', csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    })
  }
  return { token: csrfToken }
})
