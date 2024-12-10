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
import { signUpSchema } from "@/utils/validation/auth";
import { signUp } from "@/actions/auth";


type SignUpForm = z.infer<typeof signUpSchema>

export default function SignUpForm() {
    const form  = useForm<SignUpForm>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        }
    });

    const onSubmit = async (formData: SignUpForm) => {
        if(formData && formData !== null) {
            signUp(formData)
        }
    }

    return (
        <Card className="mx-auto max-w-md w-full bg-black border text-white">
            <CardHeader>
                <CardTitle className="text-2x">회원가입하기</CardTitle>
                <CardDescription className="text-white">
                    새 계정에 가입하려면 아래에 귀하의 정보를 입력하세요.
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
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input className="text-black" placeholder="Username" {...field} />
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
                                회원가입하기
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            이미 계정이 있으신가요?
                            <Link href="/login" className="underline">
                                로그인
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
