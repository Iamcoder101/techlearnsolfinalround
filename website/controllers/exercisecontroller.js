const fs = require('fs');
const path = require('path');

const exercisesPath = path.join(__dirname, '../data/exercises.json');

const getAllExercises = (req, res) => {
  fs.readFile(exercisesPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading exercises data.' });
    }
    const exercises = JSON.parse(data);
    res.json(exercises);
  });
};

const getExerciseById = (req, res) => {
  const exerciseId = parseInt(req.params.id, 10);
  fs.readFile(exercisesPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading exercises data.' });
    }
    const exercises = JSON.parse(data);
    const exercise = exercises.find(ex => ex.id === exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found.' });
    }
    res.json(exercise);
  });
};

module.exports = { getAllExercises, getExerciseById };
