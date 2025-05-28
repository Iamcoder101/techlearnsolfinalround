const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware');
const Progress = require('../models/progress');
const redisClient = require('../redisClient');

// GET existing progress
router.get('/:exerciseId', authMiddleware, async (req, res) => {
  const { exerciseId } = req.params;
  const email = req.user.email;
  const redisKey = `progress:${email}:${exerciseId}`;

  try {
    // Check Redis cache first
    const cached = await redisClient.get(redisKey);
    if (cached) {
      return res.json({ code: JSON.parse(cached).code });
    }

    // Fall back to MongoDB
    const progress = await Progress.findOne({ email, exerciseId });
    const code = progress ? progress.code : "";

    // Cache it for future requests
    await redisClient.set(redisKey, JSON.stringify({ code }));

    res.json({ code });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch progress" });
  }
});

// SAVE/UPDATE progress
router.post('/:exerciseId', authMiddleware, async (req, res) => {
  const { exerciseId } = req.params;
  const { code } = req.body;
  const email = req.user.email;
  const redisKey = `progress:${email}:${exerciseId}`;

  try {
    // Update or create in MongoDB
    let progress = await Progress.findOne({ email, exerciseId });
    if (progress) {
      progress.code = code;
      progress.updatedAt = new Date();
    } else {
      progress = new Progress({ email, exerciseId, code });
    }
    await progress.save();

    // Also update Redis cache
    await redisClient.set(redisKey, JSON.stringify({ code }));

    res.json({ message: "Progress saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save progress" });
  }
});

module.exports = router;
