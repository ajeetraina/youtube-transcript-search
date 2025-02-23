import React from 'react';
import ReactPlayer from 'react-player';

const TranscriptResults = ({ results }) => {
  const jumpToTimestamp = (videoId, timestamp) => {
    // Implementation for jumping to specific timestamp
    console.log(`Jumping to ${timestamp} in video ${videoId}`);
  };

  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow">
          <div className="mb-4">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${result.videoId}`}
              controls
              width="100%"
              height="360px"
            />
          </div>
          <h3 className="text-lg font-semibold mb-2">{result.title}</h3>
          <div className="space-y-2">
            {result.content.map((segment, idx) => (
              <div
                key={idx}
                className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                onClick={() => jumpToTimestamp(result.videoId, segment.start)}
              >
                <span className="text-gray-500 text-sm">
                  {Math.floor(segment.start / 60)}:{(segment.start % 60).toString().padStart(2, '0')}
                </span>
                <p className="ml-2 inline">{segment.text}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TranscriptResults;
