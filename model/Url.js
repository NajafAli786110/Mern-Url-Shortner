import mongoose from "mongoose";

const URLSchema = new mongoose.Schema(
  {
    ShortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: { type: Number },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "currUser",
    },
  },
  { timestamps: true }
);

const Url = mongoose.model("Url", URLSchema);
export default Url;
