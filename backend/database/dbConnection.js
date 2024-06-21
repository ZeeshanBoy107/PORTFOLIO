import mongoose from "mongoose";

const dbConnection = () => {
  mongoose.connect(process.env.MONGO_URI, {
    dbName: "PORTFOLIO"
  }).then(() => {
    console.log("Connected to database successfully")
  }).catch((err) => {
    console.log(`Error Occured while connecting to db:  ${err}`);
  })
}

export default dbConnection;