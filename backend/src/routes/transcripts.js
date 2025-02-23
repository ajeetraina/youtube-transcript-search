const express = require('express');
const TranscriptService = require('../services/transcriptService');
const auth = require('../middleware/auth');

const router = express.Router();

// Add new transcript
router.post('/', auth, async (req, res) => {
  try {
    const { videoId } = req.body;
    const transcript = await TranscriptService.fetchAndSaveTranscript(videoId);
    res.json(transcript);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Search transcripts
router.get('/search', auth, async (req, res) => {
  try {
    const { q } = req.query;
    const results = await TranscriptService.searchTranscripts(q);
    res.json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get transcript by video ID
router.get('/:videoId', auth, async (req, res) => {
  try {
    const transcript = await Transcript.findOne({
      where: { videoId: req.params.videoId }
    });
    if (!transcript) {
      return res.status(404).json({ error: 'Transcript not found' });
    }
    res.json(transcript);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
