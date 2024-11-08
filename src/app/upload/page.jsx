"use client"

import { useState } from "react"
import axios from "axios"


export default function Upload() {
    const [file, setFile] = useState(null);
    const [author, setAuthor] = useState(null);
    const [descp, setDescp] = useState(null);
    const handleChange = (e) => {
        if (e.target.id === "file") {
            setFile(e.target.files[0]);
        } else if (e.target.id === "author") {
            setAuthor(e.target.value);
        } else if (e.target.id === "descp") {
            setDescp(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("author", author);
        formData.append("descp", descp);
        try {
            const res = await axios.post("/api/uploadRoute", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form 
        className="flex flex-col gap-4 items-center justify-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]"
        >
            <label
            className="block"
            htmlFor="author">Enter Your Name</label>
            <input
            onChange={handleChange}
            className="text-black border border-solid border-transparent rounded-md p-2"
            type="text" id="author" name="author" required />
            <label
            className="block"
            htmlFor="descp">Enter description</label>
            <input
            onChange={handleChange}
            className="text-black border border-solid border-transparent rounded-md p-2"
            type="text" id="descp" name="descp" required />
            <label
            className="block"
            htmlFor="file">Upload</label>
            <input
            onChange={handleChange}
            className="border border-solid border-transparent rounded-md p-2 bg-[#383838] dark:bg-[#ccc] text-background"
            type="file" id="file" name="file" required />
            <button
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                onClick={handleSubmit}
            >
                Upload
            </button>
        </form>
    )
}