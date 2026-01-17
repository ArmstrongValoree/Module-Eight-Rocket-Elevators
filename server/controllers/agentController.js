const Agent = require("../models/Agent");

exports.createAgent = async (req, res) => {
  try {
    const { first_name, last_name, email, region, rating, fee } = req.body;

    // Validation
    if (
      !first_name ||
      !last_name ||
      !email ||
      !region ||
      rating === undefined ||
      fee === undefined
    ) {
      return res.status(400).json({
        status: "error",
        data: null,
        message: "All fields are required",
      });
    }

    // Validate rating range
    if (rating < 0 || rating > 100) {
      return res.status(400).json({
        status: "error",
        data: null,
        message: "Rating must be between 0 and 100",
      });
    }

    // Validate region
    const validRegions = ["North", "South", "East", "West"];
    if (!validRegions.includes(region)) {
      return res.status(400).json({
        status: "error",
        data: null,
        message: "Invalid region",
      });
    }

    // Check if email already exists
    const existingAgent = await Agent.findOne({ email: email.toLowerCase() });
    if (existingAgent) {
      return res.status(400).json({
        status: "error",
        data: null,
        message: "Email already exists",
      });
    }

    // Create agent
    const agent = new Agent({
      first_name,
      last_name,
      email: email.toLowerCase(),
      region,
      rating,
      fee,
    });

    await agent.save();

    res.status(201).json({
      status: "ok",
      data: agent,
      message: "Agent created successfully",
    });
  } catch (error) {
    console.error("Create agent error:", error);
    res.status(500).json({
      status: "error",
      data: null,
      message: "Failed to create agent",
    });
  }
};

exports.getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find()
      .select("first_name last_name email region rating fee")
      .sort({ last_name: 1, first_name: 1 });

    res.status(200).json({
      status: "ok",
      data: agents,
      message: null,
    });
  } catch (error) {
    console.error("Get agents error:", error);
    res.status(500).json({
      status: "error",
      data: null,
      message: "Failed to fetch agents",
    });
  }
};

// PUT /agents/:id - Update agent
exports.updateAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, region, rating, fee } = req.body;

    // Validate input
    if (
      !first_name ||
      !last_name ||
      !email ||
      !region ||
      rating === undefined ||
      fee === undefined
    ) {
      return res.status(400).json({
        status: "error",
        data: null,
        message: "All fields are required",
      });
    }

    // Validate rating range
    if (rating < 0 || rating > 100) {
      return res.status(400).json({
        status: "error",
        data: null,
        message: "Rating must be between 0 and 100",
      });
    }

    // Validate region
    const validRegions = ["North", "South", "East", "West"];
    if (!validRegions.includes(region)) {
      return res.status(400).json({
        status: "error",
        data: null,
        message: "Invalid region. Must be North, South, East, or West",
      });
    }

    // Find and update agent
    const agent = await Agent.findByIdAndUpdate(
      id,
      { first_name, last_name, email, region, rating, fee },
      { new: true, runValidators: true }
    );

    if (!agent) {
      return res.status(404).json({
        status: "error",
        data: null,
        message: "Agent not found",
      });
    }

    res.status(200).json({
      status: "ok",
      data: agent,
      message: "Agent updated successfully",
    });
  } catch (error) {
    console.error("Update agent error:", error);
    res.status(500).json({
      status: "error",
      data: null,
      message: "Failed to update agent",
    });
  }
};

// DELETE /agents/:id - Delete agent
exports.deleteAgent = async (req, res) => {
  try {
    const { id } = req.params;

    const agent = await Agent.findByIdAndDelete(id);

    if (!agent) {
      return res.status(404).json({
        status: "error",
        data: null,
        message: "Agent not found",
      });
    }

    res.status(200).json({
      status: "ok",
      data: agent,
      message: "Agent deleted successfully",
    });
  } catch (error) {
    console.error("Delete agent error:", error);
    res.status(500).json({
      status: "error",
      data: null,
      message: "Failed to delete agent",
    });
  }
};
