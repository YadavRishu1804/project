// THIS FILE IS FOR THE MIDDLEWARE FOR FILE UPLOAD

// Import the multer module which is used for file upload
const multer = require('multer');

// Create a storage object with the destination and filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './temp_uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Create an upload object with the storage object
const upload = multer({ storage });

// Export the upload object, this will be used in the analyze.js file
module.exports = upload;