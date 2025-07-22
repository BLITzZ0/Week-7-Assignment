import './App.css'
import Users from "./users" // your users array

function App() {
  const user = Users[0];

  return (
    <div className="profile-card">
      <div className="header-bg"></div>
      <div className="profile-info">
        <img src="https://i.pravatar.cc/150?img=32" alt="Profile" className="avatar" />
        <h1>
          <span className="name">{user.name}</span>
          <span className="age"> {user.age}</span>
        </h1>
        <div className="location">{user.location}</div>

        <div className="stats">
          <div>
            <div className="stat-number">{user.followers}K</div>
            <div className="stat-label">Followers</div>
          </div>
          <div>
            <div className="stat-number">{user.likes}K</div>
            <div className="stat-label">Likes</div>
          </div>
          <div>
            <div className="stat-number">{user.photos}K</div>
            <div className="stat-label">Photos</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
