// Lee-Ben-Shimon-322978909
// Linoy-Eligulashvili-213655590

import express, { Express } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import postsRoutes from "./routes/posts_route";
import bodyParser from "body-parser";
import comments from "./routes/comments_route";

function initApp() {
    return new Promise<Express>((resolve, reject) => {
        const db = mongoose.connection;
        db.on("error", (error) => console.error(error));
        db.once("open", () => console.log("Connected to mongoDB"));


        if (process.env.DB_CONNECT === undefined) {
            console.error("DB_CONNECT is not set");
            reject();
        } else {
            mongoose.connect(process.env.DB_CONNECT).then(() => {
                
                app.use(bodyParser.json());
                app.use(bodyParser.urlencoded({ extended: true }));

                app.use("/posts", postsRoutes);

                app.use("/comments", comments);
                resolve(app);
            });
        }
    });

}


export default initApp;
