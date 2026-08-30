import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users/ShriAnsh18/repos')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch repositories (${response.status} ${response.statusText})`);
        }
        return response.json();
      })
      .then((data) => {
        setRepos(data);
      })
      .catch((err) => {
        setError(err.message || 'An error occurred while fetching repositories.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="main-content projects-page">
      <section className="section">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">GitHub Projects</h2>
            <p className="section-subtitle-text">
              Live repositories fetched from{' '}
              <a
                href="https://github.com/ShriAnsh18?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="github-profile-link"
              >
                github.com/ShriAnsh18 ↗
              </a>
            </p>
          </div>
        </div>

        <div className="projects-grid">
          {repos.map((repo) => (
            <div key={repo.id} className="project-card">
              <div className="project-header">
                <h3 className="project-title">{repo.name}</h3>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-repo-btn"
                >
                  View on GitHub ↗
                </a>
              </div>
              <p className="project-repo-tag">📁 {repo.full_name || repo.name}</p>
              {repo.description && (
                <p className="project-description">{repo.description}</p>
              )}
              <div className="project-meta-badges">
                {repo.language && (
                  <span className="project-tech-badge">{repo.language}</span>
                )}
                {repo.stargazers_count > 0 && (
                  <span className="project-stat-badge">⭐ {repo.stargazers_count}</span>
                )}
                {repo.forks_count > 0 && (
                  <span className="project-stat-badge">🍴 {repo.forks_count}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Projects;
