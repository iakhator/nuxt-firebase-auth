export default defineEventHandler((event) => {
  const csrfToken = getCookie(event, 'csrf_token')
  return { csrfToken }
})
