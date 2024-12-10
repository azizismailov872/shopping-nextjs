"use client";

import { User } from "@supabase/supabase-js";
import React from "react";
import UserNav from "./UserNav";
import Link from "next/link";


interface Props {
    user: User | null;
}

const AuthButtons = ({ user }: Props) => {

    if(user) {
        return (
            <UserNav user={user} />
        )
    }

    return (
        <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
                <Link
                    className="border border-black px-3 py-2 text-sm font-medium text-black"
                    href="/login"
                >
                    로그인
                </Link>

                <div className="hidden sm:flex">
                    <Link
                        className="border border-black px-3 py-2 text-sm font-medium text-black"
                        href="/sign-up"
                    >
                        회원가입하기
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AuthButtons;
