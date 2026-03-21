const multer = require('multer');
const path = require('path');

// storage configuration for multer

/* First need to store in folder

const storage = multer.diskStorage({
   destination:function(req,file,cb){
    
    cb(null,'uploads/');

   },
   filename:function(req,file,cb){
   cb(null,Date.now() + path.extname(file.originalname));
   }
});

*/

const storage = multer.memoryStorage();


// file filter for multer

const fileFilter = (req,file,cb)=>{
   const allowType = /jpeg|jpg|png/;

   const isValid = allowType.test(file.mimetype);

   if(isValid){
     cb(null,true);
   } else {
     cb(new Error('Only jpeg/jpg/png files are allowed'), false);
   }
}


const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024*1024*5 }
});


module.exports = upload;




