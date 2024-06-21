import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const Candidate = mongoose.model("Candidate", candidateSchemaSchema);

export default Candidate;
