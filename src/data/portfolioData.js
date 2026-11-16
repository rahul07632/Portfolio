import { Layout, Server, Database, Wrench } from 'lucide-react';

export const PERSONAL_INFO = {
  name: 'Rahul Vishwakarma',
  role: 'Full Stack Developer',
  roles: [
    'Full Stack Developer',
    'Web Developer',
    'Software Developer',
    'MERN & React Specialist'
  ],
  experienceStatus: 'Fresher',
  education: 'Bachelor of Technology (B.Tech) in Computer Science and Engineering',
  college: 'Shri Ram Institute of Science and Technology, Jabalpur',
  graduation: '2025',
  training: 'NxtWave CCBP 4.0 Academy – Full Stack Development',
  email: 'rahulvishwakarma13211@gmail.com',
  phone: '+91 7879260763',
  location: 'Madhya Pradesh, India',
  linkedin: 'https://www.linkedin.com/in/rahulvishwakarma78/',
  github: 'https://github.com/rahul07632'
};

export const PROJECTS = [
  {
    id: 'todo-app',
    title: 'Todo Application',
    subtitle: 'Task Management & Persistent State Web App',
    description:
      'A full-featured task management web application engineered for productivity. Supports dynamic task creation, status toggling, deletion, and persistent local state storage with a clean responsive user interface.',
    liveUrl: 'https://todoo21.ccbp.tech/',
    githubUrl: null,
    category: 'Frontend / Web App',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'DOM Manipulation', 'Local Storage'],
    accent: 'from-cyan-500 to-blue-600',
    glow: 'rgba(6, 182, 212, 0.35)',
    previewType: 'todo',
    highlights: [
      'Dynamic CRUD operations on task items',
      'Persistent state synchronization across browser sessions',
      'Responsive mobile-first layout & interactive status toggles'
    ]
  },
  {
    id: 'wikipedia-search',
    title: 'Wikipedia Search Application',
    subtitle: 'Asynchronous REST API Knowledge Explorer',
    description:
      'An asynchronous search engine interface powered by the Wikipedia REST API. Delivers instant live search queries, structured article snippets, and direct external links with loading states and clean typography.',
    liveUrl: 'https://wikipedia987.ccbp.tech/',
    githubUrl: null,
    category: 'REST API Integration',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'REST APIs', 'Fetch API', 'Responsive Web Design'],
    accent: 'from-violet-500 to-indigo-600',
    glow: 'rgba(139, 92, 246, 0.35)',
    previewType: 'wiki',
    highlights: [
      'Real-time asynchronous Fetch calls to Wikipedia endpoints',
      'Dynamic DOM rendering of title, URL, and snippet cards',
      'Keyboard event handling & smooth loading spinner states'
    ]
  },
  {
    id: 'countries-search',
    title: 'Countries Search Application',
    subtitle: 'Global Demographics & Population Directory',
    description:
      'An interactive global directory displaying country profiles and population metrics. Features instant real-time search across country data fetched from a REST endpoint in a responsive grid.',
    liveUrl: 'https://population212.ccbp.tech/',
    githubUrl: null,
    category: 'Data & API Application',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'REST APIs', 'Bootstrap', 'Responsive Web Design'],
    accent: 'from-emerald-500 to-teal-600',
    glow: 'rgba(16, 185, 129, 0.35)',
    previewType: 'countries',
    highlights: [
      'Instant client-side search across global country records',
      'Clean card layout displaying flags and population data',
      'Fluid responsive grid system built for all viewports'
    ]
  }
];

export const SKILL_CATEGORIES = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: Layout,
    color: 'text-cyan-400',
    borderGlow: 'hover:border-cyan-500/50',
    bgGlow: 'from-cyan-500/10 to-transparent',
    skills: [
      {
        name: 'HTML5',
        level: 95,
        tag: 'Semantic Markup & Structure',
        desc: 'Semantic elements, accessible forms, SEO structure, and modern web standards.'
      },
      {
        name: 'CSS3',
        level: 90,
        tag: 'Styling & Animations',
        desc: 'Flexbox, CSS Grid, keyframe animations, custom properties, and glassmorphism.'
      },
      {
        name: 'JavaScript',
        level: 88,
        tag: 'ES6+ Core Language',
        desc: 'Asynchronous programming, closures, DOM manipulation, Fetch API, and modular code.'
      },
      {
        name: 'React.js',
        level: 86,
        tag: 'Component Architecture',
        desc: 'Hooks, state management, reusable component patterns, and single-page applications.'
      },
      {
        name: 'Bootstrap',
        level: 90,
        tag: 'UI Framework',
        desc: 'Rapid responsive grid layouts, utility classes, and cross-browser UI components.'
      },
      {
        name: 'Responsive Web Design',
        level: 92,
        tag: 'Multi-Device UX',
        desc: 'Mobile-first media queries, fluid typography, and adaptive layouts for all screens.'
      }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: Server,
    color: 'text-violet-400',
    borderGlow: 'hover:border-violet-500/50',
    bgGlow: 'from-violet-500/10 to-transparent',
    skills: [
      {
        name: 'Node.js',
        level: 84,
        tag: 'JavaScript Runtime',
        desc: 'Event-driven server architecture, asynchronous I/O, and backend scripting.'
      },
      {
        name: 'Express.js',
        level: 85,
        tag: 'Web Application Framework',
        desc: 'Middleware pipelines, modular routing, error handling, and server APIs.'
      },
      {
        name: 'REST APIs',
        level: 88,
        tag: 'API Design & Integration',
        desc: 'RESTful endpoints, JSON payloads, HTTP methods, status codes, and client consumption.'
      }
    ]
  },
  {
    id: 'database',
    title: 'Database Systems',
    icon: Database,
    color: 'text-emerald-400',
    borderGlow: 'hover:border-emerald-500/50',
    bgGlow: 'from-emerald-500/10 to-transparent',
    skills: [
      {
        name: 'MongoDB',
        level: 82,
        tag: 'NoSQL Document Database',
        desc: 'Document modeling, CRUD operations, aggregation pipelines, and schema design.'
      },
      {
        name: 'SQL',
        level: 86,
        tag: 'Relational Database Querying',
        desc: 'Relational schemas, complex JOIN queries, filtering, aggregations, and data integrity.'
      }
    ]
  },
  {
    id: 'tools',
    title: 'Developer Tools & Workflow',
    icon: Wrench,
    color: 'text-amber-400',
    borderGlow: 'hover:border-amber-500/50',
    bgGlow: 'from-amber-500/10 to-transparent',
    skills: [
      {
        name: 'Git',
        level: 88,
        tag: 'Version Control System',
        desc: 'Branching strategies, commit hygiene, merge workflows, and code history tracking.'
      },
      {
        name: 'GitHub',
        level: 90,
        tag: 'Code Hosting & Collaboration',
        desc: 'Repository management, pull requests, project documentation, and deployment workflows.'
      },
      {
        name: 'VS Code',
        level: 94,
        tag: 'Development Environment',
        desc: 'Integrated debugging, extensions, Emmet workflows, and terminal automation.'
      }
    ]
  }
];

export const EDUCATION_DATA = [
  {
    id: 'nxtwave',
    degree: 'Full Stack Development Training',
    institution: 'NxtWave CCBP 4.0 Academy',
    period: 'Ongoing / Intensive Industry Program',
    badge: 'CCBP 4.0 Academy',
    description:
      'Hands-on, project-driven Full Stack Development curriculum focused on building real-world web applications using Frontend (HTML5, CSS3, JavaScript, React.js, Bootstrap), Backend (Node.js, Express.js, REST APIs), and Databases (MongoDB, SQL).',
    highlights: [
      'Built and deployed live web applications including Todo App, Wikipedia Search, and Countries Search',
      'Practiced clean modular architecture, asynchronous API integration, and responsive UI engineering',
      'Developed strong problem-solving foundations with modern developer tooling (Git, GitHub, VS Code)'
    ],
    color: 'cyan'
  },
  {
    id: 'btech',
    degree: 'Bachelor of Technology (B.Tech) in Computer Science and Engineering',
    institution: 'Shri Ram Institute of Science and Technology, Jabalpur',
    period: 'Graduated 2025',
    badge: 'Class of 2025',
    description:
      'Completed undergraduate degree in Computer Science and Engineering with a focus on software engineering principles, algorithms, database management systems, computer networks, and web technologies.',
    highlights: [
      'Specialization: Computer Science and Engineering (CSE)',
      'Core coursework in Data Structures, DBMS, Operating Systems, and Object-Oriented Programming',
      'Strong academic foundation paired with practical full-stack software development'
    ],
    color: 'violet'
  }
];

export const downloadResumeFile = () => {
  const resumeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${PERSONAL_INFO.name} - Resume</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #0f172a; max-width: 800px; margin: 36px auto; padding: 0 24px; line-height: 1.55; }
    h1 { margin: 0; font-size: 28px; color: #0f172a; }
    .role { font-size: 16px; color: #0284c7; font-weight: 600; margin-top: 4px; }
    .contact { font-size: 13px; color: #334155; margin-top: 8px; padding-bottom: 14px; border-bottom: 2px solid #0284c7; }
    .contact a { color: #0284c7; text-decoration: none; }
    h2 { font-size: 15px; text-transform: uppercase; letter-spacing: 1px; color: #0284c7; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-top: 22px; }
    .item { margin-bottom: 12px; }
    .item-header { display: flex; justify-content: space-between; font-weight: 600; font-size: 14px; }
    .skills-grid { display: grid; grid-template-columns: 140px 1fr; row-gap: 6px; font-size: 13.5px; }
    ul { margin: 4px 0 10px 18px; padding: 0; font-size: 13.5px; }
  </style>
</head>
<body>
  <h1>${PERSONAL_INFO.name}</h1>
  <div class="role">${PERSONAL_INFO.role} (${PERSONAL_INFO.experienceStatus})</div>
  <div class="contact">
    Email: <a href="mailto:${PERSONAL_INFO.email}">${PERSONAL_INFO.email}</a> |
    Phone: ${PERSONAL_INFO.phone} |
    LinkedIn: <a href="${PERSONAL_INFO.linkedin}">${PERSONAL_INFO.linkedin}</a> |
    GitHub: <a href="${PERSONAL_INFO.github}">${PERSONAL_INFO.github}</a>
  </div>
  <h2>Professional Summary</h2>
  <p style="font-size:13.5px;">
    Computer Science and Engineering (B.Tech, 2025) graduate and Full Stack Developer trained at NxtWave CCBP 4.0 Academy. Skilled in building responsive, user-centric web applications using HTML5, CSS3, JavaScript, React.js, Bootstrap, Node.js, Express.js, REST APIs, MongoDB, and SQL.
  </p>
  <h2>Technical Skills</h2>
  <div class="skills-grid">
    <div><strong>Frontend:</strong></div><div>HTML5, CSS3, JavaScript, React.js, Bootstrap, Responsive Web Design</div>
    <div><strong>Backend:</strong></div><div>Node.js, Express.js, REST APIs</div>
    <div><strong>Database:</strong></div><div>MongoDB, SQL</div>
    <div><strong>Developer Tools:</strong></div><div>Git, GitHub, VS Code</div>
  </div>
  <h2>Projects</h2>
  <div class="item">
    <div class="item-header"><span>Todo Application</span><a href="https://todoo21.ccbp.tech/">https://todoo21.ccbp.tech/</a></div>
    <ul><li>Built a responsive task management web application with persistent state management and dynamic DOM manipulation.</li></ul>
  </div>
  <div class="item">
    <div class="item-header"><span>Wikipedia Search Application</span><a href="https://wikipedia987.ccbp.tech/">https://wikipedia987.ccbp.tech/</a></div>
    <ul><li>Engineered an asynchronous knowledge search portal integrated with the Wikipedia REST API using JavaScript Fetch.</li></ul>
  </div>
  <div class="item">
    <div class="item-header"><span>Countries Search Application</span><a href="https://population212.ccbp.tech/">https://population212.ccbp.tech/</a></div>
    <ul><li>Developed an interactive global demographics directory displaying country profiles and population data with instant search.</li></ul>
  </div>
  <h2>Education & Training</h2>
  <div class="item"><div class="item-header"><span>NxtWave CCBP 4.0 Academy – Full Stack Development</span><span>Intensive Program</span></div></div>
  <div class="item"><div class="item-header"><span>Bachelor of Technology (B.Tech) in Computer Science and Engineering</span><span>Graduated 2025</span></div><div style="font-size:13.5px;">Shri Ram Institute of Science and Technology, Jabalpur</div></div>
  <h2>Experience</h2>
  <p style="font-size:13.5px;"><strong>Fresher</strong> — Actively seeking entry-level Full Stack Developer, Frontend Developer, or Software Engineer roles.</p>
</body>
</html>`;

  const blob = new Blob([resumeHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Rahul_Vishwakarma_Full_Stack_Developer_Resume.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
