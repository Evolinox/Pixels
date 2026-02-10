const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/');
    },
    filename: (req, file, cb) => {
        const userId = req.user?.id;
        const timestamp = Math.floor(Date.now() / 1000);
        const ext = path.extname(file.originalname);
        cb(null, `${userId}_${timestamp}${ext}`);
    }
});

const upload = multer({ storage });

module.exports = upload;