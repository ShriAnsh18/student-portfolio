import Header from './components/Header';
import NavBar from './components/NavBar';
import About from './components/About';
import Skills from './components/Skills';
import Footer from './components/Footer';
import './App.css';

function App() {
  const studentName = 'Shriansh Modi';
  const themeColor = '#2563eb';
  const skills = [
    'JavaScript',
    'React.js',
    'HTML & CSS',
    'Node.js',
    'Git & GitHub',
    
  ];

  return (
    <div className="app-container" id="home">
      <Header name={studentName} themeColor={themeColor} />
      <NavBar />
      <main className="main-content">
        <About />
        <Skills skillList={skills} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
