function Skills({ skillList = [] }) {
  return (
    <section id="skills" className="section skills-section">
      <h2 className="section-title">Skills</h2>
      <div className="section-content">
        <ul className="skills-list">
          {skillList.map((skill, index) => (
            <li key={index} className="skill-item">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Skills;
