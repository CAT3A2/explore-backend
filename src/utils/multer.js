const req = require('express/lib/request');
const multer = require('multer');
const path = require('path');

//Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, callback) => {
    let extension = path.extname(file.originalname);
    // if (extension !== '.JPG' && extension !== '.jpeg' && extension !== '.png') {
    //   callback(new Error('File type is not supported'), false);
    //   return;
    // }
    callback(null, true);
  },
});
