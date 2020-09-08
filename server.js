/*jshint esversion: 6 */

const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongojs = require("mongojs");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// Route to new Exercise page
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

// Route to new Dashboard page
app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});

// View exercises
app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .populate("exercises")
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.json(err);
        });
});

// View all workouts
app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        }).catch(err => {
            res.json(err);
        });
});

// Create new workout
app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        }).catch(err => {
            res.json(err);
        });
});

// Add new exercise to workout
app.put("/api/workouts/:id", ({ params, body }, res) => {
    db.Workout.updateOne({ "_id": mongojs.ObjectId(params.id) }, {
            $push: {
                "exercises": {
                    "type": body.type,
                    "name": body.name,
                    "duration": body.duration,
                    "distance": body.distance,
                    "weight": body.weight,
                    "sets": body.sets,
                    "reps": body.reps
                }
            }
        })
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        }).catch(err => {
            res.json(err);
        });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});