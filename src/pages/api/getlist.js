import { connect } from "@/db/connectDb";
import FileMetaData from "@/models/fileMetaData";

const getlist = async (req, res) => {
    await connect();
    const {search} = req.query;
    let files = [];
    if (search) {
        files = await FileMetaData.find({filename: new RegExp(search, "i")});
    } else {
        files = await FileMetaData.find();
    }
    res.status(200).json(files);
}

export default getlist;