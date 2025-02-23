const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Transcript = sequelize.define('Transcript', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    videoId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    searchVector: {
      type: DataTypes.TSVECTOR,
      allowNull: true
    }
  }, {
    indexes: [
      {
        name: 'transcript_search_idx',
        using: 'gin',
        fields: ['searchVector']
      }
    ]
  });

  return Transcript;
};