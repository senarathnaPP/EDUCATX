require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('./db/db')
// const uploads = require('./models/uploads')


const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));
express.Router()

const studentRoutes = require('./routes/stdRoutes');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/apiRoutes');
const registerTopicRoutes = require('./routes/registerTopicRoutes');

const groupRoutes = require('./routes/groupRoutes');

const submissionApiRoutes = require("./routes/submissions");

/**file upload*/
const fileUpload = require('express-fileupload');
const { patch } = require('./routes/submissions');



//midlewares
app.use(express.json());
app.use(cors());



app.use("/api/student", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/topic", registerTopicRoutes);

app.use("/api/student", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes)
app.use("/api/student", require('./routes/submissions'));

app.use("/template", require("./routes/template"));


/**file upload */
app.use(fileUpload())
// app.use("/uploads")

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 8000;
var server = 
app.listen(port, () => {
    console.log(`Listning on port ${port}`)
});

//Ishani
module.exports = server