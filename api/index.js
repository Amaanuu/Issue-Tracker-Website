import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import issueRoute from "./routes/issue.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";



const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

// MongoDB connection
const connect = async () => {
  try {
    const connectionString = process.env.CONNECTION_STRING || "mongodb://localhost:27017/mydatabase";
    await mongoose.connect(connectionString);
    console.log("Successfully Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

// Middleware
app.use(cors({
  origin: ['http://127.0.0.1:5501', 'http://localhost:5501'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/issue", issueRoute);


// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Unexpected error has occurred";
  // console.error("Error:", err);
  console.log("#################")
  console.log(err.message)
  console.log("#################")
  return res.status(errorStatus).send(errorMessage);
});
app.listen(3300, () => {
  connect();
  console.log("Backend server is running!");
});