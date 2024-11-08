"use client"

import axios from "axios"
import { useState, useEffect } from "react"



export default function GetList() {
    const [filesmetadata, setFilesmetadata] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const res = await axios.get("/api/getlist");
                setFilesmetadata(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchFiles();
    }, []);
    const handleChange = (e) => {
        setSearch(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // change space to _ in search
            const searchURI = search.replace(" ", "_");
            const res = await axios.get(`/api/getlist?search=${searchURI}`);
            setFilesmetadata(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    const filesList = filesmetadata.map((file, index) => {
        return (
            <div key={index} className="flex gap-4">
                <p className="w-1/4">{file.filename}</p>
                <p className="w-1/4">{file.size}</p>
                <p className="w-1/4">{file.author}</p>
                <button className="w-1/4 text-blue-500" 
                    onClick = {async (file) => {
                        try {
                            const res = await axios.get(`/api/download?filename=${file.uuidName}`);
                            console.log(res.data);
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                >Here</button>
            </div>
        )
    })
    return (
        <div
            className="flex flex-col justify-center items-center"
        >
            {/* search bar */}
            <div className="flex justify-center items-center">
                <input type="text" className="text-black p-2 border-2 border-black rounded-md" placeholder="Search" onChange={handleChange}/>
                <button
                onClick={handleSubmit}
                className="p-2 bg-blue-500 text-white rounded-md">Search</button>
            </div>
            {/* list of files heading with file name file size author and download link*/}
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold">List of Files</h1>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <p className="w-1/4">File Name</p>
                        <p className="w-1/4">File Size</p>
                        <p className="w-1/4">Author</p>
                        <p className="w-1/4">Download</p>
                    </div>
                    {/* list of files */}
                    {filesList}
                </div>
            </div>
        </div>
    )
}