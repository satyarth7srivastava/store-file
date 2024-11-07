import upload from "@/utils/multer";
import { createRouter } from "next-connect";

const apiRoute = createRouter();

export const config = {
    api: {
        bodyParser: false,
    },
}

apiRoute.use(upload.single("file")).post((req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send("Please upload a file");
    }
    console.log(file);
    res.status(200).json({ message: "File uploaded successfully" });
});


const handler = apiRoute.handler({
    onError(error, req, res) {
        res.status(500).end(error.toString());
    }
})

export default handler;