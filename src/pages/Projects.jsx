import { useState } from 'react';

function Projects() {
  const [showInfo, setShowInfo] = useState(false);

  const projects = [
    {
      id: 1,
      title: 'Hospital Appointment System',
      repoName: 'itue301-exam-D25DCE170-C',
      description: 'A full-stack healthcare web application for booking, scheduling, and managing patient-doctor hospital appointments with separated frontend and backend architectures.',
      tech: 'React.js, Node.js, Express, JavaScript',
      url: 'https://github.com/ShriAnsh18/itue301-exam-D25DCE170-C'
    },
    {
      id: 2,
      title: 'Terraform AWS Infrastructure',
      repoName: 'terraform-first-instance',
      description: 'Cloud automation project provisioning an AWS EC2 (t3.micro) instance in us-east-1 from scratch using declarative Terraform (IaC) configuration and init/plan/apply workflow.',
      tech: 'Terraform (HCL), AWS EC2, Cloud Automation',
      url: 'https://github.com/ShriAnsh18/terraform-first-instance'
    },
    {
      id: 3,
      title: 'Network Security & Reconnaissance',
      repoName: 'nmap-network-scan',
      description: 'Practical cybersecurity lab covering network scanning, port enumeration, threat analysis, patch management, and vulnerability assessment using Nmap.',
      tech: 'Nmap, Shell, Cybersecurity, Reconnaissance',
      url: 'https://github.com/ShriAnsh18/nmap-network-scan'
    },
    {
      id: 4,
      title: 'Web Vulnerability Assessment',
      repoName: 'nikto-vulnerability-scan',
      description: 'Web server security assessment and vulnerability scanning repository focused on identifying dangerous files, outdated server software, and security misconfigurations.',
      tech: 'Nikto, Web Security, Penetration Testing',
      url: 'https://github.com/ShriAnsh18/nikto-vulnerability-scan'
    }
  ];

  return (
    <div className="main-content projects-page">
      <section className="section">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">GitHub Projects</h2>
            <p className="section-subtitle-text">
              Projects fetched from{' '}
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
          <button
            className="help-toggle-btn"
            onClick={() => setShowInfo(!showInfo)}
          >
            {showInfo ? 'Hide Overview ▲' : 'ℹ️ Profile Overview ▼'}
          </button>
        </div>

        {showInfo && (
          <div className="help-box">
            <p>
              💡 <strong>GitHub Highlights:</strong> Repositories span full-stack web development (React & Node.js), Infrastructure as Code with Terraform on AWS, and Cybersecurity/Network Analysis.
            </p>
          </div>
        )}

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-repo-btn"
                >
                  GitHub Repo ↗
                </a>
              </div>
              <p className="project-repo-tag">📁 {project.repoName}</p>
              <p className="project-description">{project.description}</p>
              <div className="project-tech-badge">{project.tech}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Projects;
