module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transcripts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      videoId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      searchVector: {
        type: Sequelize.TSVECTOR
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.sequelize.query(`
      CREATE INDEX transcript_search_idx ON "Transcripts" USING gin("searchVector");
      
      CREATE TRIGGER transcripts_vector_update
        BEFORE INSERT OR UPDATE
        ON "Transcripts"
        FOR EACH ROW
        EXECUTE FUNCTION tsvector_update_trigger("searchVector", 'pg_catalog.english', content);
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS transcripts_vector_update ON "Transcripts";
      DROP INDEX IF EXISTS transcript_search_idx;
    `);
    await queryInterface.dropTable('Transcripts');
  }
};