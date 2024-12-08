import { z } from 'zod';


export const signUpSchema = z.object({
  username: z.string().min(3, 'Имя пользователя должно быть не менее 3 символов').max(20, 'Имя пользователя не может превышать 20 символов'),
  email: z.string().email('Введите корректный адрес электронной почты'),
  password: z.string().min(6, 'Пароль должен быть не менее 6 символов').max(50, 'Пароль не может превышать 50 символов'),
})

export const loginSchema = z.object({
    email: z.string().email('Введите корректный адрес электронной почты'),
    password: z.string().min(6, 'Пароль должен быть не менее 6 символов').max(50, 'Пароль не может превышать 50 символов'),
})