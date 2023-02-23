const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");


const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

// connect to db

app.use(cors());
app.use(bodyParser.json());


mongoose.connect(
    process.env.DB_CONNECT,
     { useUnifiedTopology: true, useNewUrlParser: true },
     () => console.log("connected to db")
);



// import routes

const employeeRoutes = require("./routes/employee");

// route middleware

app.use("/api/employee", employeeRoutes)
app.use("/api/Login", employeeRoutes)



app.listen(4000, () => console.log("server up and running on port 4000---"))
