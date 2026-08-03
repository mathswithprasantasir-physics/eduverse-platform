import React from 'react';
import { 
  FaBook, 
  FaFileAlt, 
  FaStickyNote, 
  FaGraduationCap,
  FaQuestionCircle,
  FaLightbulb
} from 'react-icons/fa';

const boards = ['WBBSE', 'WBCHSE', 'ISC', 'ICSE', 'CBSE'];
const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Physics', 'Chemistry', 'Biology'];
const contentTypes = [
  { id: 'pyq', label: 'Previous Year Questions', icon: <FaQuestionCircle /> },
  { id: 'notes', label: 'Subject Notes', icon: <FaStickyNote /> },
  { id: 'book_solutions', label: 'Book Solutions', icon: <FaBook /> }
];

const Sidebar = ({ 
  isOpen, 
  selectedBoard, 
  setSelectedBoard, 
  selectedSubject, 
  setSelectedSubject,
  contentType,
  setContentType 
}) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-section">
        <h3 className="section-title">
          <FaGraduationCap /> Boards
        </h3>
        <ul className="board-list">
          {boards.map(board => (
            <li 
              key={board}
              className={selectedBoard === board ? 'active' : ''}
              onClick={() => setSelectedBoard(board)}
            >
              {board}
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="section-title">
          <FaLightbulb /> Subjects
        </h3>
        <ul className="subject-list">
          {subjects.map(subject => (
            <li 
              key={subject}
              className={selectedSubject === subject.toLowerCase() ? 'active' : ''}
              onClick={() => setSelectedSubject(subject.toLowerCase())}
            >
              {subject}
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="section-title">
          <FaFileAlt /> Content Type
        </h3>
        <ul className="content-type-list">
          {contentTypes.map(type => (
            <li 
              key={type.id}
              className={contentType === type.id ? 'active' : ''}
              onClick={() => setContentType(type.id)}
            >
              {type.icon} {type.label}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;