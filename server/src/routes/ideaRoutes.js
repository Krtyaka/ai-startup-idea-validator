import express from "express";
import Idea from "../models/Idea.js";
import { generateIdeaAnalysis } from "../services/openaiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    //Validating input
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    //Generate AI analysis
    const aiResponse = await generateIdeaAnalysis(title, description);

    //Parsing AI response safely
    let analysis;
    try {
      analysis = JSON.parse(aiResponse);
    } catch (err) {
      return res.status(500).json({
        message: "Invalid AI response format",
      });
    }

    //Saving to db
    const idea = new Idea({
      title,
      description,
      analysis,
    });

    const savedIdea = await idea.save();

    //Returning result
    res.status(201).json(savedIdea);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// fetch all ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find({})
      .select("title createdAt")
      .sort({ createdAt: -1 });

    res.json(ideas);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch ideas",
    });
  }
});

// fetch single idea with analysis
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        message: "Idea not found",
      });
    }

    res.json(idea);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch idea",
    });
  }
});

// delete an idea
router.delete("/:id", async (req, res) => {
  try {
    const idea = await Idea.findByIdAndDelete(req.params.id);

    if (!idea) {
      return res.status(404).json({
        message: "Idea not found",
      });
    }

    res.json({
      message: "Idea deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete idea",
    });
  }
});

export default router;
