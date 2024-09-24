import React, { useState } from 'react';
import { fetchAdvancedUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState(''); 
  const [userData, setUserData] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 
  const [location, setLocation] = useState('');
  const [repos, setRepos] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUserData([]);

    try {
        const data = await fetchAdvancedUserData(username, location, repos);
        setUserData(data.map);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search GitHub User"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
         <input
          type="text"
          placeholder="Location (Optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded"
        />
         <input
          type="number"
          placeholder="Minimum Repositories (Optional)"
          value={repos}
          onChange={(e) => setRepos(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {userData && (
        <div className="user-info">
          <img src={userData.avatar_url} alt={userData.login} />
          <h2>{userData.login}</h2>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;
