import { useState } from 'react';
import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';

function Home() {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const studentName = 'Shriansh Modi';
  const themeColor = '#2563eb';
  const skills = [
    'JavaScript',
    'React.js',
    'HTML & CSS',
    'Node.js',
    'Git & GitHub'
  ];

  return (
    <div className="home-page">
      <Header name={studentName} themeColor={themeColor} />
      <div className="main-content">
        <About />
        
        <div className="section toggle-section">
          <div className="toggle-header">
            <h2 className="section-title" style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>
              Academic Highlights
            </h2>
            <button 
              className="toggle-btn"
              onClick={() => setShowMoreInfo(!showMoreInfo)}
            >
              {showMoreInfo ? 'Hide Details ▲' : 'Show Details ▼'}
            </button>
          </div>
          
          {showMoreInfo && (
            <div className="additional-info">
              <p>🎓 Currently pursuing B.Tech in Computer Science & Engineering.</p>
              <p>🎯 Focused on developing high-impact full-stack web applications with React and Node.js.</p>
              <p>💡 Passionate about UI/UX design, algorithmic problem solving, and open-source software.</p>
            </div>
          )}
        </div>

        <Skills skillList={skills} />
      </div>
    </div>
  );
}

export default Home;
