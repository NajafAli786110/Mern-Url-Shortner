import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectMONGO() {
  return mongoose
    .connect(process.env.CONNECTMONGO)
    .then(() => console.log("Connect Successfully"))
    .catch((err) => console.log(err, "Unsuccessful"));
}

export {
    connectMONGO
}
