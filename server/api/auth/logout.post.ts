export default defineEventHandler((event) => {
  const csrfTokenHeader = event.node.req.headers['x-csrf-token']
  const csrfTokenCookie = getCookie(event, 'csrfToken')

  if (!csrfTokenHeader || csrfTokenHeader !== csrfTokenCookie) {
    throw createError({ statusCode: 403, message: 'Invalid CSRF token' })
  }

  deleteCookie(event, 'session')
  return { message: 'Logged out' }
})
