import express from "express";


export const app = express();


config({
  path: "./data/config.env",
});


app.get("/", (req, res, next) => {
    res.send("Working");
  });