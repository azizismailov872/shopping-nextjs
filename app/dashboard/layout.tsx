import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {

    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
        redirect('/login')
    }

    return (
        <SidebarProvider>
            <AppSidebar currentUser={data.user}/>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                    </div>
                </header>
                <main className="px-4">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
