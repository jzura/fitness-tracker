const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now()
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            require: true
        },
        name: {
            type: String,
            trim: true,
            require: true
        },
        duration: {
            type: Number,
            trim: true,
            require: true

        },
        weight: {
            type: Number
        },
        reps: {
            type: Number

        },
        sets: {
            type: Number
        },
        distance: {
            type: Number
        }
    }]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;