// models/Progress.js
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  email: { type: String, required: true },
  exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
  code: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Progress', progressSchema);
