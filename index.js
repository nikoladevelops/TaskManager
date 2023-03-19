const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const tasks = require("./routes/tasks");
const connectDb = require("./db/connect");
require("dotenv").config();
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/v1/tasks",tasks);

app.get("/",(req,res)=>{
    res.send("hello!");
});

app.use(errorHandlerMiddleware);

// only start the server if we can connect to the DB
const start = async ()=>{
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log("Listening on port " + port);
        });
    } catch (error) {
        console.log(error);
    }
}

start();



