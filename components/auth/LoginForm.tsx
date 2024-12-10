"use client";


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {z} from 'zod'
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema} from "@/utils/validation/auth";
import { login } from "@/actions/auth";


type LoginFormData = z.infer<typeof loginSchema>

export default function LoginForm() {
    const form  = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = async (formData: LoginFormData) => {
        if(formData && formData !== null) {
            const error = await login(formData)

			if(error) {
				form.setError('email',{message: 'Invalied email or password'})
				form.setError('password',{message: 'Invalied email or password'})
			}
        }
    }

    return (
        <Card className="mx-auto max-w-md w-full bg-black border text-white">
            <CardHeader>
                <CardTitle className="text-2x">로그인</CardTitle>
                <CardDescription className="text-white">
                    귀하의 계정에 로그인하려면 아래에 이메일을 입력하세요.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input className="text-black" placeholder="Email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input className="text-black" type="password" placeholder="Passowrd" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                variant={"secondary"}
                                className="w-full hover:bg-white bg-white text-black"
                            >
                                Login
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            계정이 없습니까?
                            <Link href="/sign-up" className="underline">
                                회원가입하기
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
