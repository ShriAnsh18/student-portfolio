function ErrorMessage({ message }) {
  return (
    <div className="error-container">
      <div className="error-box">
        <h3 className="error-title">⚠️ Error Loading Data</h3>
        <p className="error-message">{message || 'Something went wrong while fetching data.'}</p>
      </div>
    </div>
  );
}

export default ErrorMessage;
