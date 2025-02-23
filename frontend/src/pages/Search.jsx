import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import TranscriptResults from '../components/TranscriptResults';
import axios from 'axios';

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/transcripts/search`, {
        params: { q: query },
        headers: { Authorization: `Bearer ${token}` }
      });
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <SearchBar onSearch={handleSearch} />
      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {results.length > 0 && <TranscriptResults results={results} />}
    </div>
  );
};

export default Search;
