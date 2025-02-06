import { adminAuth } from "~/server/utils/firebaseAdmin";

export default defineEventHandler(async (event) => {
    try {
        const { email, password } = await readBody(event)
        const user = await adminAuth.createUser({email, password})

        setResponseStatus(event, 200)
        return { user}
    } catch (error) {
        console.log(error)
        
    }
})
