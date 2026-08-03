import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaGraduationCap, 
  FaBook, 
  FaFileAlt, 
  FaChartBar,
  FaUsers,
  FaAward,
  FaRocket
} from 'react-icons/fa';

const BoardSelector = ({ selectedBoard, setSelectedBoard }) => {
  const [hoveredBoard, setHoveredBoard] = useState(null);

  const boards = [
    {
      id: 'WBBSE',
      name: 'WBBSE',
      fullName: 'West Bengal Board of Secondary Education',
      icon: <FaGraduationCap />,
      description: 'Madhyamik Examination',
      color: '#4a90e2'
    },
    {
      id: 'WBCHSE',
      name: 'WBCHSE',
      fullName: 'West Bengal Council of Higher Secondary Education',
      icon: <FaAward />,
      description: 'Higher Secondary Examination',
      color: '#6c5ce7'
    },
    {
      id: 'ISC',
      name: 'ISC',
      fullName: 'Indian School Certificate (Class 12)',
      icon: <FaRocket />,
      description: 'Class 12 Examination',
      color: '#00b894'
    },
    {
      id: 'ICSE',
      name: 'ICSE',
      fullName: 'Indian Certificate of Secondary Education',
      icon: <FaBook />,
      description: 'Class 10 Examination',
      color: '#fdcb6e'
    },
    {
      id: 'CBSE',
      name: 'CBSE',
      fullName: 'Central Board of Secondary Education',
      icon: <FaUsers />,
      description: 'Class 10 & 12 Examination',
      color: '#e17055'
    }
  ];

  const stats = {
    totalQuestions: 25000,
    subjects: 8,
    books: 45,
    students: 50000
  };

  return (
    <div className="board-selector">
      <div className="selector-header">
        <h1>Welcome to EduVerse</h1>
        <p>Select your board to start learning</p>
      </div>

      <div className="stats-bar">
        <div className="stat-item">
          <FaFileAlt />
          <span className="stat-value">{stats.totalQuestions}+</span>
          <span className="stat-label">Questions</span>
        </div>
        <div className="stat-item">
          <FaBook />
          <span className="stat-value">{stats.subjects}</span>
          <span className="stat-label">Subjects</span>
        </div>
        <div className="stat-item">
          <FaGraduationCap />
          <span className="stat-value">{stats.books}</span>
          <span className="stat-label">Books</span>
        </div>
        <div className="stat-item">
          <FaUsers />
          <span className="stat-value">{stats.students}+</span>
          <span className="stat-label">Students</span>
        </div>
      </div>

      <div className="board-grid">
        {boards.map(board => (
          <Link
            key={board.id}
            to={`/board/${board.id}`}
            className={`board-card ${selectedBoard === board.id ? 'selected' : ''}`}
            onMouseEnter={() => setHoveredBoard(board.id)}
            onMouseLeave={() => setHoveredBoard(null)}
            style={{
              borderColor: hoveredBoard === board.id ? board.color : 'transparent',
              boxShadow: hoveredBoard === board.id ? `0 8px 24px ${board.color}33` : 'none'
            }}
            onClick={() => setSelectedBoard(board.id)}
          >
            <div className="board-icon" style={{ color: board.color }}>
              {board.icon}
            </div>
            <h3>{board.name}</h3>
            <p className="board-full-name">{board.fullName}</p>
            <p className="board-description">{board.description}</p>
            <div className="board-arrow" style={{ background: board.color }}>
              →
            </div>
          </Link>
        ))}
      </div>

      <div className="featured-content">
        <h2>What's New?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <span className="feature-badge">New</span>
            <h4>2024 Board PYQs Added</h4>
            <p>Latest previous year questions with detailed solutions</p>
          </div>
          <div className="feature-card">
            <span className="feature-badge">Popular</span>
            <h4>Most Selling Books Solutions</h4>
            <p>Comprehensive solutions for popular textbooks</p>
          </div>
          <div className="feature-card">
            <span className="feature-badge">Updated</span>
            <h4>Interactive Study Notes</h4>
            <p>Well-organized notes with diagrams and examples</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardSelector;