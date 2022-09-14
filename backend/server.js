const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT | 5000;
const app = express();
const goalRoutes = require("./routes/goalRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectToDB = require("./config/db");
const asyncHandler = require("express-async-handler");
const colors = require("colors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRoutes);

app.use(errorHandler);

const start = async () => {
  connectToDB();
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

start();
