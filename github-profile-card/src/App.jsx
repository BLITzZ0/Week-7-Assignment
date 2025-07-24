/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = () => {
    if (username.trim() === "") {
      setError("Please enter a username");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    axios.get(`https://api.github.com/users/${username}`)
      .then((res) => {
        setUser(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setUser(null);
        setIsLoading(false);
        setError("User not found");
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchUser();
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">GitHub Profile Finder</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        <button 
          onClick={fetchUser}
          className="search-button"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Find"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="result-container">
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : user ? (
          <div className="profile-card">
            <div className="profile-header">
              <img
                src={user.avatar_url}
                alt="avatar"
                className="profile-avatar"
              />
              <h2>{user.name || user.login}</h2>
              {user.login && <p>@{user.login}</p>}
            </div>

            <div className="profile-details">
              <p><span className="detail-label">Location:</span> {user.location || "N/A"}</p>
              {user.bio && <p className="profile-bio">{user.bio}</p>}
              
              <div className="stats-container">
                <div className="stat-box">
                  <span className="stat-number">{user.public_repos}</span>
                  <span className="stat-label">Repos</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">{user.followers}</span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">{user.following}</span>
                  <span className="stat-label">Following</span>
                </div>
              </div>

              <a 
                href={user.html_url} 
                target="_blank" 
                rel="noreferrer"
                className="profile-link"
              >
                View Full Profile
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;