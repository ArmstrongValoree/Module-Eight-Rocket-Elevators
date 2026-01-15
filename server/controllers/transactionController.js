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
exports.getReportData = async (req, res) => {
  try {
    const allAgents = await Agent.find();
    const transactions = await Transaction.find()
      .populate('agent_id', 'first_name last_name')
      .populate('user_id', 'firstName lastName');

    const agentTotals = {};
    allAgents.forEach(agent => {
      agentTotals[`${agent.first_name} ${agent.last_name}`] = 0;
    });

    transactions.forEach(transaction => {
      if (!transaction.agent_id) return;
      const name = `${transaction.agent_id.first_name} ${transaction.agent_id.last_name}`;
      if (agentTotals[name] !== undefined) {
        agentTotals[name] += transaction.amount;
      }
    });

    const agent_bar_data = Object.keys(agentTotals).map(name => ({
      agent: name,
      total: agentTotals[name]
    }));

    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    const recentTransactions = transactions.filter(t => new Date(t.created_at) >= twoWeeksAgo);

    const dailyTotals = {};
    recentTransactions.forEach(transaction => {
      const date = new Date(transaction.created_at).toISOString().split('T')[0];
      dailyTotals[date] = (dailyTotals[date] || 0) + transaction.amount;
    });

    const transaction_line_data = [];
    for (let i = 13; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      transaction_line_data.push({ date: dateStr, total: dailyTotals[dateStr] || 0 });
    }

    res.status(200).json({
      status: 'ok',
      data: { agent_bar_data, transaction_line_data },
      message: null
    });
  } catch (error) {
    console.error('Get report data error:', error);
    res.status(500).json({
      status: 'error',
      data: null,
      message: 'Failed to fetch report data'
    });
  }
};