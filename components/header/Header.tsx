import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import React from "react";
import AuthButtons from "./AuthButtons";

const Header = async() => {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    return (
        <header className="bg-white shadow-md mb-6">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-1 md:flex md:items-center md:gap-12">
                        <Link className="block text-black font-bold" href="/">
                            <span className="sr-only">Home</span>
                            <span>MussarovShop</span>
                        </Link>
                    </div>

                    <div className="md:flex md:items-center md:gap-12">

                        <AuthButtons user={user} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
