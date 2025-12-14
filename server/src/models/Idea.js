import mongoose from "mongoose";

const IdeaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  analysis: {
    problem: String,
    customer: String,
    market: String,
    competitor: [
      {
        name: { type: String },
        differentiation: { type: String },
      },
    ],
    tech_stack: [String],
    risk_level: String,
    profitability_score: Number,
    justification: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Idea = mongoose.model("Idea", IdeaSchema);

export default Idea;
