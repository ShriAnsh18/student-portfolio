function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="footer">
      <div className="footer-container">
        <div className="contact-info">
          <h3>Contact Information</h3>
          <p>Email: <a href="mailto:alex.rivera@example.com">shrianshmodi@example.com</a></p>
          <p>GitHub: <a href="https://github.com" target="_blank" rel="noopener noreferrer">https://github.com/ShriAnsh18</a></p>
          <p>LinkedIn: <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">linkedin.com/in/ShrianshModi</a></p>
        </div>
        <p className="copyright">
          &copy; {currentYear} Shriansh Modi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
