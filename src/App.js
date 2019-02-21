import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const [results, setResults] = useState([])
  const [query, setQuery] = useState('react hooks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef()

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
      setResults(response.data.hits);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }

  const handleSearch = e => {
    e.preventDefault();
    getResults();
  }

  const handleClearSearch = () => {
    setQuery("");
    searchInputRef.current.focus();
  }

  return (
    <>
      <form onSubmit={handleSearch}>
        <input type="text" value={query} onChange={e => setQuery(e.target.value)} ref={searchInputRef} />
        <button type='submit'>Search</button>
        <button type='button' onClick={handleClearSearch}>Clear</button>
      </form>
      {loading ? <div>Loading Results...</div> : (<ul>
        {results.map(result => (
          <li key={result.objectID}>
            <a href={result.url}>{result.title}</a>
          </li>
        ))}
      </ul>)}
      {error && <div>{error.message}</div>}
    </>
  )
}

export default App;