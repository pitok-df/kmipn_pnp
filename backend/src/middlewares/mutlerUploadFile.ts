import fs from "fs";
import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { type } = req.query;
        const uploadDir = './public/' + type;
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Math.round(Math.random() * 1E9);
        const fileName = uniqueSuffix + '-' + file.originalname;
        cb(null, fileName)
    }

});

export const uploadFile = multer({ storage });