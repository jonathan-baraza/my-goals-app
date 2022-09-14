const asyncHandler = require("express-async-handler");

//@desc Get goals
//@route GET /api/goals
//@access private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "These are all the goals" });
});

//@desc set goals
//@route POST /api/goals
//@access private
const postGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  res.status(200).json({ message: req.body });
});

//@desc update goals
//@route PUT /api/goals/:id
//@access private
const updateGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Updating goal ${id}` });
});

//@desc delete goals
//@route DELETE /api/goals/:id
//@access private
const deleteGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Deleting goal number ${id}` });
});

module.exports = { getGoals, postGoal, updateGoal, deleteGoal };
