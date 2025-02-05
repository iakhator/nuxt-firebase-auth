import { firebaseAdmin } from "#imports"

export default defineEventHandler(async (event) => {
    console.log(firebaseAdmin, 'admin')
    return {g: 'nuxt'}
})
