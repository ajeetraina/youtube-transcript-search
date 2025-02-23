const request = require('supertest');
const app = require('../app');
const { User, Transcript } = require('../models');
const { generateToken } = require('../utils/auth');

describe('Transcript API', () => {
  let token;
  let testUser;

  beforeAll(async () => {
    testUser = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    token = generateToken(testUser.id);
  });

  afterAll(async () => {
    await User.destroy({ where: {} });
    await Transcript.destroy({ where: {} });
  });

  describe('POST /api/transcripts', () => {
    it('should create a new transcript', async () => {
      const response = await request(app)
        .post('/api/transcripts')
        .set('Authorization', `Bearer ${token}`)
        .send({
          videoId: 'test123',
          title: 'Test Video',
          content: [{ text: 'Hello world', start: 0, duration: 1 }]
        });

      expect(response.status).toBe(200);
      expect(response.body.videoId).toBe('test123');
    });
  });

  describe('GET /api/transcripts/search', () => {
    it('should search transcripts', async () => {
      const response = await request(app)
        .get('/api/transcripts/search')
        .set('Authorization', `Bearer ${token}`)
        .query({ q: 'hello' });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});