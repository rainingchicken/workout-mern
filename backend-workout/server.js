require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const conn = require("./db/conn");
const Workout = require("./models/workoutModel");
conn();

//middleware
app.use(express.json());
app.use(cors());

//routes
//GET all workouts
app.get("/api/workouts", async (req, res) => {
  //   res.json({ message: "GET all workouts" });

  try {
    const allWorkouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json({ allWorkouts });
  } catch (error) {
    res.status(404).json({ error: `Something went wrong ${error.message}` });
  }
});

//POST new workout
app.post("/api/workouts", async (req, res) => {
  //   res.json({ message: "POST new workout" });
  const { title, reps, load } = req.body;
  // console.log(req.body);
  try {
    const newWorkout = await Workout.create({ title, reps, load });
    res.status(200).json({ newWorkout });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//listen
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
