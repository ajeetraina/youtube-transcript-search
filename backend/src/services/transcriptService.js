const { YoutubeTranscript } = require('youtube-transcript');
const { Transcript } = require('../models');

class TranscriptService {
  static async fetchAndSaveTranscript(videoId) {
    try {
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      
      // Get video title (you might want to use YouTube API for this)
      const title = `Video ${videoId}`; // Placeholder
      
      const savedTranscript = await Transcript.create({
        videoId,
        title,
        content: transcript,
      });

      // Update search vector
      await Transcript.sequelize.query(
        `UPDATE "Transcripts" 
         SET "searchVector" = to_tsvector('english', content::text) 
         WHERE id = :id`,
        {
          replacements: { id: savedTranscript.id }
        }
      );

      return savedTranscript;
    } catch (error) {
      throw new Error(`Failed to fetch transcript: ${error.message}`);
    }
  }

  static async searchTranscripts(query) {
    try {
      const results = await Transcript.sequelize.query(
        `SELECT id, "videoId", title, content, 
                ts_rank("searchVector", plainto_tsquery('english', :query)) as rank
         FROM "Transcripts"
         WHERE "searchVector" @@ plainto_tsquery('english', :query)
         ORDER BY rank DESC`,
        {
          replacements: { query },
          type: Transcript.sequelize.QueryTypes.SELECT
        }
      );

      return results;
    } catch (error) {
      throw new Error(`Search failed: ${error.message}`);
    }
  }
}

module.exports = TranscriptService;