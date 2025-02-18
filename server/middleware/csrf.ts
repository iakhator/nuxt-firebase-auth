import crypto from 'crypto'

export default defineEventHandler((event) => {
  // let csrfToken = getCookie(event, 'csrf_token')
  // if (!csrfToken) {
  //   csrfToken = crypto.randomBytes(32).toString('hex')
  //   setCookie(event, 'csrf_token', csrfToken, {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: 'strict',
  //     path: '/',
  //   })
  // }
  // event.node.res.setHeader('X-CSRF-Token', csrfToken)
})
