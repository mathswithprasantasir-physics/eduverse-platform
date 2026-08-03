import React from 'react';
import { FaHeart, FaGithub, FaTwitter, FaYoutube, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>EduVerse</h3>
          <p>Complete Learning Platform for Board Exams</p>
          <div className="social-links">
            <a href="#" aria-label="GitHub"><FaGithub /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
            <a href="#" aria-label="Email"><FaEnvelope /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Boards</h4>
          <ul>
            <li><a href="#">WBBSE</a></li>
            <li><a href="#">WBCHSE</a></li>
            <li><a href="#">ISC</a></li>
            <li><a href="#">ICSE</a></li>
            <li><a href="#">CBSE</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="#">PYQs</a></li>
            <li><a href="#">Study Notes</a></li>
            <li><a href="#">Book Solutions</a></li>
            <li><a href="#">Practice Tests</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Made with <FaHeart className="heart" /> for Students &copy; {currentYear} EduVerse
        </p>
      </div>
    </footer>
  );
};

export default Footer;