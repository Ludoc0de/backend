const express = require("express");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

//Connect to Mongo with Mongoose
connectDB();

const app = express();
//get req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);

//to overwrite default express error
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
