import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './styles.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const addGoogleTranslate = () => {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', includedLanguages: 'hi,en', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
          'google_translate_element'
        );

        // ✅ Hide the banner after initialization
        const hideBanner = () => {
          const translateBanner = document.querySelector('.goog-te-banner-frame');
          if (translateBanner) translateBanner.style.display = 'none';
          document.body.style.top = '0px';
        };

        let attempts = 0;
        const interval = setInterval(() => {
          hideBanner();
          attempts++;
          if (attempts > 30) clearInterval(interval);
        }, 100);
      };
    };

    addGoogleTranslate();
  }, []);

  // ✅ Function to switch language using cookies
  const handleTranslate = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);

    // ✅ Set language using Google Translate cookie
    document.cookie = `googtrans=/en/${newLang}; path=/`;
    window.location.reload(); // ✅ Reload to apply changes
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" className="topi-logo" />
      </div>
      {/* <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div> */}
      <div className="user-section">
        <NavLink to="/profile" className="user-link">
          <FaUser className="user-icon" />
          <span className="user-text">User</span>
        </NavLink>
      </div>

      {/* ✅ Translate Button */}
      <button className="translate-btn" onClick={handleTranslate}>
        {language === 'en' ? 'हिंदी के लिए' : 'Switch to English'}
      </button>

      {/* ✅ Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>
    </nav>
  );
};

export default Navbar;
