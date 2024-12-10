import Link from "next/link";
import React from "react";
import AuthButtons from "./AuthButtons";
import CartNav from "../cart/CartNav";
import { User } from "@supabase/supabase-js";

interface Props {
    user: User | null;
    cartList: any;
}

const Header = async ({user,cartList}: Props) => {

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
                        <CartNav cart={cartList} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
