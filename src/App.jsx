import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Sidebar from './components/Layout/Sidebar';
import BoardSelector from './components/Board/BoardSelector';
import BoardContent from './components/Board/BoardContent';
import ThemeToggle from './components/Common/ThemeToggle';
import './styles/global.css';
import './styles/theme.css';

function App() {
  const [selectedBoard, setSelectedBoard] = useState('WBBSE');
  const [selectedSubject, setSelectedSubject] = useState('mathematics');
  const [contentType, setContentType] = useState('pyq');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <Router>
      <div className={`app ${theme}`}>
        <Header 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          themeToggle={<ThemeToggle theme={theme} toggleTheme={toggleTheme} />}
        />
        <div className="main-container">
          <Sidebar 
            isOpen={isSidebarOpen}
            selectedBoard={selectedBoard}
            setSelectedBoard={setSelectedBoard}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            contentType={contentType}
            setContentType={setContentType}
          />
          <div className="content-area">
            <Routes>
              <Route path="/" element={
                <BoardSelector 
                  selectedBoard={selectedBoard}
                  setSelectedBoard={setSelectedBoard}
                />
              } />
              <Route path="/board/:boardId" element={
                <BoardContent 
                  board={selectedBoard}
                  subject={selectedSubject}
                  contentType={contentType}
                />
              } />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;