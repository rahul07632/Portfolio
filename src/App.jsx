import { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

// --- SHARED LAYOUT: MATRIX CANVAS BACKGROUND ---
function MatrixBackground() {
  useEffect(() => {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const binaryChars = ['0', '1'];
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const rainDrops = Array(columns).fill(canvas.height + 1);

    const handleMouseMove = (event) => {
      const targetCol = Math.floor(event.clientX / fontSize);
      if (targetCol >= 0 && targetCol < columns) {
        if (rainDrops[targetCol] > canvas.height || Math.random() > 0.48) {
          rainDrops[targetCol] = Math.floor(event.clientY / fontSize);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    function animateCyberDeck() {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '700 ' + fontSize + 'px "JetBrains Mono", monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        if (rainDrops[i] * fontSize <= canvas.height && rainDrops[i] >= 0) {
          const character = binaryChars[Math.floor(Math.random() * binaryChars.length)];
          if (Math.random() > 0.93) {
            ctx.fillStyle = '#00f0ff';
          } else {
            ctx.fillStyle = '#00ff66';
          }
          ctx.fillText(character, i * fontSize, rainDrops[i] * fontSize);
          rainDrops[i]++;
          if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.99) {
            rainDrops[i] = canvas.height + 1;
          }
        }
      }
    }

    const interval = setInterval(animateCyberDeck, 28);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="cyber-universe">
        <div className="infinite-grid-floor"></div>
      </div>
      <canvas id="matrixCanvas"></canvas>
    </>
  );
}

// --- PAGE 1: HOME PAGE ---
function Home() {
  return (
    <header className="hero-showcase">
      <h1>Rahul Vishwakarma</h1>
      <div className="hero-subtitle">Full-Stack Developer Trainee</div>
      <p className="hero-bio">
        Motivated Full Stack Developer with hands-on experience in building responsive web applications using React, Node.js, and REST APIs. Proficient in both frontend and backend architectures with a strong foundation in JavaScript execution and SQL database engineering.
      </p>
      <div className="gateway-grid">
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=rahulvishwakarma13211@gmail.com" target="_blank" rel="noreferrer" className="gateway-btn">Email Gateway</a>
        <a href="https://www.linkedin.com/in/rahulvishwakarma78/" target="_blank" rel="noreferrer" className="gateway-btn">LinkedIn</a>
        <a href="https://github.com/rahul07632" target="_blank" rel="noreferrer" className="gateway-btn">GitHub</a>
      </div>
    </header>
  );
}

// --- PAGE 2: SKILLS PAGE ---
function Skills() {
  const coreLanguages = ["HTML5", "CSS3", "Bootstrap", "JavaScript (ES6+)", "SQLite", "Python"];
  const frameworks = ["React.js", "Node.js", "Express.js", "Git Ecosystem"];

  return (
    <section className="dashboard-card">
      <div className="card-header-title">Technical Expertise</div>
      <div style={{ marginBottom: '30px' }}>
        <h4 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '14px' }}>Core Engineering Tech</h4>
        <div className="skills-nexus">
          {coreLanguages.map((skill, index) => (
            <span key={index} className="skill-node">{skill}</span>
          ))}
        </div>
      </div>
      <div>
        <h4 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '14px' }}>Frameworks & Version Controls</h4>
        <div className="skills-nexus">
          {frameworks.map((skill, index) => (
            <span key={index} className="skill-node">{skill}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- PAGE 3: PROJECTS PAGE ---
function Projects() {
  const projectList = [
    {
      name: "Todos Enterprise Application",
      stack: "HTML | CSS | JAVASCRIPT | BOOTSTRAP",
      liveLink: "https://todoo21.ccbp.tech/",
      githubLink: "https://github.com/rahul07632/TodoList",
      points: [
        "Engineered seamless CRUD operations to manage tasks, utilizing JavaScript event listeners and DOM manipulation for real-time UI updates.",
        "Ensured stateful task persistence and high availability leveraging browser local storage components."
      ]
    },
    {
      name: "Wikipedia Query Search Infrastructure",
      stack: "REST API | FETCH API | ASYNC JS",
      liveLink: "https://wikipedia987.ccbp.tech/",
      githubLink: "https://github.com/rahul07632?tab=repositories",
      points: [
        "Integrated the Wikipedia REST API using asynchronous JavaScript protocols to dynamically fetch and render client queries instantly.",
        "Optimized Client UI layout via performance-driven DOM manipulations and systematic API error management exception handling."
      ]
    },
    {
      name: "Global Countries Geographical Radar",
      stack: "REST API | JAVASCRIPT | RESPONSIVE UI",
      liveLink: "https://population212.ccbp.tech/",
      githubLink: "https://github.com/rahul07632?tab=repositories",
      points: [
        "Built a highly responsive web application to fetch, decode and display worldwide demographic profiles from microservice REST APIs.",
        "Developed real-time client-side sorting and query pipeline optimizations using native JS array operations (map, filter)."
      ]
    }
  ];

  return (
    <section className="dashboard-card">
      <div className="card-header-title">Production Implementations</div>
      {projectList.map((project, index) => (
        <div key={index} className="build-block">
          <div className="build-meta">
            <div className="build-name">{project.name}</div>
            <div className="build-stack">{project.stack}</div>
          </div>
          <ul>
            {project.points.map((point, ptIndex) => (
              <li key={ptIndex}>{point}</li>
            ))}
          </ul>
          {(project.liveLink || project.githubLink) && (
            <div className="build-actions">
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="gateway-btn">Live Link</a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noreferrer" className="gateway-btn">GitHub Repo</a>
              )}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

// --- PAGE 4: TIMELINE PAGE ---
function Timeline() {
  return (
    <section className="dashboard-card">
      <div className="card-header-title">Professional Chronology</div>
      <div className="timeline-container">
        <div className="timeline-node">
          <div className="timeline-header-row">
            <span style={{ color: '#ffffff' }}>Full-Stack Developer Trainee</span>
            <span style={{ color: 'var(--matrix-green)' }}>2025 - Present</span>
          </div>
          <div className="timeline-org">NxtWave CCBP 4.0 Academy</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Actively developing proficiency in full-stack web development, mastering frontend (React, HTML, CSS, JavaScript) and backend (Node.js, Express.js, SQL) technologies through hands-on modules.
          </p>
        </div>
        <div className="timeline-node" style={{ marginBottom: 0 }}>
          <div className="timeline-header-row">
            <span style={{ color: '#ffffff' }}>Bachelor of Technology (Computer Science)</span>
            <span style={{ color: 'var(--text-muted)' }}>2021 - 2025</span>
          </div>
          <div className="timeline-org">Shri Ram Institute of Science and Technology, Jabalpur</div>
        </div>
      </div>
    </section>
  );
}

// --- MAIN ROUTER CORE APP ---
function App() {
  const location = useLocation();

  return (
    <>
      {/* Background Layer Shared across raoutes */}
      <MatrixBackground />

      {/* REACT ROUTER NAVBAR LINKS */}
      <nav className="cyber-navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">RAHUL<span>.DEV</span></Link>
          <ul className="nav-links">
            <li><Link to="/" className={location.pathname === '/' ? 'active-link' : ''}>Home</Link></li>
            <li><Link to="/skills" className={location.pathname === '/skills' ? 'active-link' : ''}>Skills</Link></li>
            <li><Link to="/projects" className={location.pathname === '/projects' ? 'active-link' : ''}>Projects</Link></li>
            <li><Link to="/timeline" className={location.pathname === '/timeline' ? 'active-link' : ''}>Timeline</Link></li>
          </ul>
        </div>
      </nav>

      {/* APP RENDERING ENGINE */}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>

        {/* FOOTER */}
        <footer className="cyber-footer">
          <div className="footer-tagline">Built with Clean Code & Architecture by <span>Rahul Vishwakarma</span></div>
          <div className="copyright-text">&copy; 2026 All Rights Reserved.</div>
        </footer>
      </div>
    </>
  );
}

export default App;