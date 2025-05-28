const express = require('express');
const router = express.Router();
const path=require('path');
const { getAllExercises, getExerciseById } = require('../controllers/exercisecontroller');
const authMiddleware = require('../middleware/authmiddleware');

console.log("getAllExercises:", getAllExercises);
console.log("getExerciseById:", getExerciseById);
router.get("/page/:id",authMiddleware ,(req, res) => {
   //console.log("Serving exercise.html for id:", req.params.id);
  res.sendFile(path.join(__dirname,"..","protected","exercise.html"));
});

router.get('/', authMiddleware, getAllExercises);
router.get('/:id', authMiddleware, getExerciseById);

module.exports = router;
