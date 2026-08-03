import React, { useState } from 'react';
import { FaBars, FaSearch, FaUser, FaBell } from 'react-icons/fa';

const Header = ({ toggleSidebar, themeToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <div className="logo">
          <h1>EduVerse</h1>
          <span className="subtitle">Complete Learning Platform</span>
        </div>
      </div>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search subjects, topics, questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>

      <div className="header-right">
        {themeToggle}
        <button className="notification-btn">
          <FaBell />
          <span className="badge">3</span>
        </button>
        <button className="profile-btn">
          <FaUser />
        </button>
      </div>
    </header>
  );
};

export default Header;