import { connect } from "@/db/connectDb";
import FileMetaData from "@/models/fileMetaData";
import path from "path";
import fs from "fs";

const download = async (req, res) => {
    await connect();
    const { filename } = req.query;
    //console.log(filename);
    const file = await FileMetaData.findOne({ uuidName: filename });
    if (!file) {
        return res.status(404).send("File not found");
    }
    const { date } = file;
    // console.log(date);
    const datePath = date.toISOString().split("T")[0];
    const filePath = path.join(process.cwd(), `Data/${datePath}/${filename}`);
    // console.log(filePath);
    const read = fs.createReadStream(filePath);
    res.setHeader("Content-Disposition", `attachment; filename=${file.filename}`);
    await read.pipe(res);
    read.on("close", () => {
        res.status(200).end();
    });
}

export default download;