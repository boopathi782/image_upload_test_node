const express = require('express');
const bodyParser = require('body-parser');
/* var mysql = require('mysql'); */
var multer = require('multer')

/* var jwt = require('jsonwebtoken');  */
var cors = require("cors");
var path = require('path');

 
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// serving static files
app.use('/uploads', express.static('uploads'));


  // handle storage using multer
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
       cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
  });
  
  var upload = multer({ storage: storage });

  // app.post('/upload_profile', upload.single('dataFile'), (req, res, next) => {

    app.post('/upload_profile', upload.single('resume'), (req, res, next) => {

        console.log( req.body.name);   
        console.log( req.body.mobile);
        console.log( req.file); 
        // console.log( req.headers); 
      
        const file = req.file;
        if (!file) {
           return res.status(400).send({ message: 'Please upload a file.' });
        }
        var name = req.body.name;
        var mobile = req.body.mobile;
        var file_name = "uploads/"+req.file.filename;


        console.log("--------------------");
        console.log("---------name-----------",name);
        console.log("---------mobile-----------",mobile);
        console.log("---------file location-----------",file_name);
      
     
            return res.send({ message: 'File is successfully.',
            /* + result.insertId, */   
            /* data: result */     
            data: {
                    'name': name ,
                    'mobile': mobile ,
                    'file_name': file_name
                 }

            });  
      });
      
      
      const port = 3012;
      app.listen(port, () => {
        // console.log(`Example app listening at http://localhost:${port}`)

        console.log(`Example app listening at http://localhost:${port}`)
        // console.log("Example app listening at http://localhost:",port)
      });