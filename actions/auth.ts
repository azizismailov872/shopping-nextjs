"use server"

import { z } from "zod"
import { createClient } from "@/utils/supabase/server"
import { loginSchema, signUpSchema } from "@/utils/validation/auth"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"


type signUpData = z.infer<typeof signUpSchema>

type loginData = z.infer<typeof loginSchema>

export const signUp = async(formData: signUpData) => {
    const supabase = await createClient()

    if(!formData) {
        const error = {
            message: 'Invalid form data'
        }

        return error
    }

    const {error} = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
            data: {
                username: formData.username ? formData.username : ''
            }
        }

    })

    if(error) {
        console.log('sign up error: ',error)

        return error
    }
    
    revalidatePath('/','layout')

    redirect('/')
}

export const login = async(formData: loginData) => {
    const supabase = await createClient()

    if(!formData && formData == null) {
        console.log('error data not exist')
        const error = {
            message: 'Invalid form data'
        }

        return error 
    }

    const { error } = await supabase.auth.signInWithPassword(formData)

    if (error) {
        console.log('login error: ',error)

        return error
    }

    revalidatePath('/', 'layout')
    redirect('/')
}