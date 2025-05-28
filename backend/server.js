const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const cors = require('cors');
const path = require('path');
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();
app.use(cors({
  credentials: true
}));
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(cookieParser());


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});


// Routes
app.use("/api/auth", authRoutes);

const exercisesRouter = require('./routes/exercises');
const progressRouter = require('./routes/progressRoutes');
const dashboardRouter=require('./routes/dashboard');


app.use('/api/protected/exercises', exercisesRouter);
app.use('/api/progress', progressRouter);
app.use('/api/protected',dashboardRouter);


// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("DB connection error:", err));
