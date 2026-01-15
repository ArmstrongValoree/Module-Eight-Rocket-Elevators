const Transaction = require("../models/Transaction");
const Agent = require("../models/Agent");

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ created_at: -1 })
      .limit(10)
      .populate("agent_id", "first_name last_name email")
      .populate("user_id", "firstName lastName email");

    res.status(200).json({
      status: "ok",
      data: transactions,
      message: null,
    });
  } catch (error) {
    console.error("Get transactions error:", error);
    res.status(500).json({
      status: "error",
      data: null,
      message: "Failed to fetch transactions",
    });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const { amount, agent_id } = req.body;

    if (!amount || !agent_id) {
      return res.status(400).json({
        status: "error",
        data: null,
        message: "Amount and agent_id are required",
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        status: "error",
        data: null,
        message: "Amount must be a positive number",
      });
    }

    const agent = await Agent.findById(agent_id);
    if (!agent) {
      return res.status(404).json({
        status: "error",
        data: null,
        message: "Agent not found",
      });
    }

    const actualUserId = "696660414b8efa139303cdc4";

    const transaction = new Transaction({
      amount,
      agent_id,
      user_id: actualUserId,
    });

    await transaction.save();
    await transaction.populate("agent_id", "first_name last_name email");
    await transaction.populate("user_id", "firstName lastName email");

    res.status(201).json({
      status: "ok",
      data: transaction,
      message: "Transaction created successfully",
    });
  } catch (error) {
    console.error("Create transaction error:", error);
      res.status(500).json({
        status: "error",
        data: null,
        message: "Failed to create transaction",
      });
    }
  };
  
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      return res.status(404).json({
        status: 'error',
        data: null,
        message: 'Transaction not found'
      });
    }

    res.status(200).json({
      status: 'ok',
      data: transaction,
      message: 'Transaction deleted successfully'
    });

  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({
      status: 'error',
      data: null,
      message: 'Failed to delete transaction'
    });
  }
};