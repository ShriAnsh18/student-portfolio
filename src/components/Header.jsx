function Header({ name, themeColor }) {
  return (
    <header className="header" style={{ backgroundColor: themeColor || '#3b82f6' }}>
      <div className="header-container">
        <h1 className="header-title">Student Portfolio</h1>
        <p className="header-subtitle">
          Welcome to the portfolio of <span className="student-name">{name}</span>
        </p>
      </div>
    </header>
  );
}

export default Header;
