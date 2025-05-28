const redisClient = require('../redisClient');

const saveProgress = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { code } = req.body;

  if (!code) return res.status(400).json({ message: "Code is required." });

  try {
    const redisKey = `progress:${userId}:${id}`;
    const value = JSON.stringify({ code });

    // Save code in Redis (optionally with expiration, e.g., 7 days)
    await redisClient.set(redisKey, value, { EX: 60 * 60 * 24 * 7 });

    res.json({ message: 'Progress saved successfully.' });
  } catch (err) {
    console.error('Save progress error:', err);
    res.status(500).json({ message: 'Error saving progress.' });
  }
};
