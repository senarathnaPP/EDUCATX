const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./db/dbConnect')

//routes
//const auth = require('./routes/auth')

const admin = require('./routes/adminRoutes')


//middle wares
app.use(express.json());
app.use(cors());
//app.use("/api/auth",auth);
app.use("/api/admin", admin);

// Template Route
app.use("/template", require("./routes/template"));

const port = process.env.PORT || 8000;
var server = 
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});



//Ishani
module.exports = server