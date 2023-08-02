import React, { useState, useEffect } from 'react';
import styles from './AcceptCookies.module.css'; 

const AcceptCookies = () => {
  const [showCookieWindow, setShowCookieWindow] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    setShowCookieWindow(!cookiesAccepted);
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookieWindow(false);
  };

  return (
    showCookieWindow && (
      <div className={styles['cookie-window']}>
        <p>This website uses cookies to ensure you get the best experience on our website.</p>
        <button onClick={handleAcceptCookies}>Accept Cookies</button>
      </div>
    )
  );
};

export default AcceptCookies;
