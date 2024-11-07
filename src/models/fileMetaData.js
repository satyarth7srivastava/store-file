import mongoose from "mongoose";

const fileMetaDataSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    uuidName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        required: true
    },
    descp: {
        type: String,
        required: false
    }
});

const FileMetaData = mongoose.models.FileMetaDatas || mongoose.model("FileMetaDatas", fileMetaDataSchema);
export default FileMetaData;