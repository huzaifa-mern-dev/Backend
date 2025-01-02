import { app } from "./app.js";

connectMongooseDatabase();

app.listen(process.env.PORT, () => {
  console.log("Server Listing On Port 8000");
});
