import Link from "next/link"
import GetList from "@/components/getlist"


export default function Home() {
    return (
        <div
        className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-6 sm:p-20 font-[family-name:var(--font-geist-sans)]"
        >
            <h1
                className="text-4xl font-bold text-center p-8"
            >Welcome To Store File :)</h1>
            <div
                className="flex flex-col gap-8 row-start-2 items-center sm:items-start"
            >
                <p className="text-center">This is a simple file store app that allows you to upload files and download them.</p>
                <p className="text-center">To upload you file click below:-</p>
                <Link
                    href="/upload"
                    className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5" 
                >
                    Upload File
                </Link>
            </div>
            <GetList />
        </div>
    )
}