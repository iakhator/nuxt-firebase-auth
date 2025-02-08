import { useFirebaseAdmin } from "~/server/utils/firebaseAdmin";

export default defineEventHandler(async (event) => {
    try {
        const {adminAuth } = useFirebaseAdmin();
        const { email, password } = await readBody(event)
        const user = await adminAuth.createUser({email, password})

        setResponseStatus(event, 200)
        return { user}
        // return 'user'
    } catch (error) {
        console.log(error)
        
    }
})
