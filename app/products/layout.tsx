import Header from "@/components/header/Header";


export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {

    return (
        <>
            <Header />
            {
                children
            }
        </>
    );
}
