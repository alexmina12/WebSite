import React, { useState, useEffect } from 'react';
import styles from './ContactUs.module.css';

const PopupComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const openPopup = () => {
    setIsOpen(true);
    setIsSent(false);
  };

  const closePopup = () => {
    setIsOpen(false);
    setIsSent(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  useEffect(() => {
    if (isSent) {
      const timeout = setTimeout(() => {
        setIsSent(false);
      }, 2000); 
      
      return () => clearTimeout(timeout);
    }
  }, [isSent]);

  return (
    <div>
      <button className={`${styles['contact-button']} contact-button`} onClick={openPopup}>
  Contact us
</button>
      {isOpen && (
        <div className={styles.popup}>
          {!isSent ? (
            <form className={styles.popupInner} onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">Send</button>
              <button type="button" onClick={closePopup}>
                Close
              </button>
            </form>
          ) : (
            <div
              className={styles.successMessage}
              onClick={closePopup}
            >
              Your message was sent. We will get back to you within 24 hours.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PopupComponent;
