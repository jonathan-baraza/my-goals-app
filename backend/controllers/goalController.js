const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

//@desc Get goals
//@route GET /api/goals
//@access private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

//@desc set goals
//@route POST /api/goals
//@access private
const postGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({
    user: req.user.id,
    text: req.body.text,
  });
  res.status(200).json(goal);
});

//@desc update goals
//@route PUT /api/goals/:id
//@access private
const updateGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const goal = await Goal.findById(id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  if (!req.body.text) {
    res.status(400);
    throw new Error("Please provide a text value");
  }

  const user = await User.findById(req.user.id);
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updateGoal = await Goal.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json(updateGoal);
});

//@desc delete goals
//@route DELETE /api/goals/:id
//@access private
const deleteGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const goal = await Goal.findById(id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal does not exist");
  }
  const user = await User.findById(req.user.id);
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  //or
  // await goal.remove();
  const deletedGoal = await Goal.findByIdAndRemove(id);
  res.status(200).json(goal);
});

module.exports = { getGoals, postGoal, updateGoal, deleteGoal };
