const express = require('express');
const multer = require('multer');
var cors = require('cors')
var path = require("path");


const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
const upload = multer({ storage: storage });

const app = express();

app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.post('/api/upload', upload.single('upload'), (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ path: req.file.filename }));
});

app.listen(3000, () => { console.log("Listening on port 3000."); });