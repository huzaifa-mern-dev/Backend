import mongoose from "mongoose";

export const connectMongooseDatabase = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "myFreeClusterProject",
    });

    console.log("Server Connected to Database ", connection.host);
  } catch (error) {
    console.log("Some Error Occured, ", error);
    process.exit(1);
  }
};