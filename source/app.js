// Lee-Ben-Shimon-322978909
// Linoy-Eligulashvili-213655590

const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECT);  

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to mongoDB"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const postsRoutes = require("./routes/posts_route");
app.use("/posts", postsRoutes);

const comments =require("./routes/comments_route");
app.use("/comments",comments);

app.listen(port, () => {    
  console.log(`Example app listening at http://localhost:${port}`);
});
