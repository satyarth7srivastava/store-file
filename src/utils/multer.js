import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const date = new Date().toISOString().split('T')[0];

const checkDirectory = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        checkDirectory(`Data/${date}`);
        cb(null, `Data/${date}`);
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + '-' + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

export default upload;