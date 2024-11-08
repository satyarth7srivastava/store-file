import upload from "@/utils/multer";
import { createRouter } from "next-connect";
import { connect } from "@/db/connectDb";
import FileMetaData from "@/models/fileMetaData";

const apiRoute = createRouter();

export const config = {
    api: {
        limit: "30mb",
        bodyParser: false,
    },
}

const storeDb = async (author, descp, file) => {
    await connect();
    const { filename, size, originalname } = file;
    const fileData = new FileMetaData({
        filename: originalname,
        size: size,
        uuidName: filename,
        author: author,
        descp: descp
    })
    await fileData.save();
    // console.log("File data saved to db");
}

apiRoute.use(upload.single("file")).post((req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send("Please upload a file");
    }
    // console.log(file);
    const { author, descp } = req.body;
    storeDb(author, descp, file);
    res.status(200).json({ message: "File uploaded successfully", success:true });
});


const handler = apiRoute.handler({
    onError(error, req, res) {
        res.status(500).end(error.toString());
    }
})

export default handler;