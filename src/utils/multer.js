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

//creating filter for images and pdf only files
const filter = (req, file, cs) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
        cs(null, true);
    } else {
        cs(new Error('Only .jpeg, .png and .pdf files are allowed'));
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
const upload = multer({ storage: storage, fileFilter: filter });

export default upload;