import { app } from "./app.js";
import cloudinary from "cloudinary";
import { connectMongooseDatabase } from "./data/database.js";


connectMongooseDatabase();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log("Server Listing On Port 8000");
});
