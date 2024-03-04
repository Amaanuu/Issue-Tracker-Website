import mongoose from "mongoose";
const { Schema } = mongoose;

const issueSchema = new Schema(
  {

    title: { type: String, required: false },
    description: { type: String, required: false },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: false },
    assignee: { type: String },
    attachment: { type: String } // Assuming file paths are stored
    // title: {
    //   type: String,
    //   required: true,
    // },
    // description: {
    //   type: String,
    //   required: false,
    // },
    // priority: {
    //   type: String,
    //   required: false,
    // },
    // collaborators: {
    //   type: [String],
    //   required: false,
    // },
    // files: {
    //   type: [String],
    //   required: false,
    // },
  },
  {
    timestamps: true, // Place timestamps option here
  }
);

export default mongoose.model("issue", issueSchema);


