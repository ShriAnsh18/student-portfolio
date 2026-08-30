import { useState } from 'react';

function Contact() {
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="main-content contact-page">
      <section className="section">
        <h2 className="section-title">Contact Me</h2>
        <p className="contact-intro">
          Have a question or want to collaborate? Send a message using the form below:
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name-input" className="form-label">Your Name</label>
            <input
              id="name-input"
              type="text"
              className="form-input"
              placeholder="Enter your name"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message-input" className="form-label">Your Message</label>
            <textarea
              id="message-input"
              className="form-textarea"
              rows="4"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>

        {/* Live Input Preview */}
        <div className="live-preview-box">
          <h3 className="preview-heading">Live Message Preview:</h3>
          <p className="preview-text">
            {message ? message : <span className="preview-placeholder">No message entered yet. Start typing above to see live preview...</span>}
          </p>
        </div>

        {submitted && (
          <div className="success-banner">
            ✓ Message received! Thank you for getting in touch.
          </div>
        )}
      </section>
    </div>
  );
}

export default Contact;
