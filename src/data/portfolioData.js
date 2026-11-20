export const SCENES = {
  dark: [
    { id: 'aurora', label: 'Aurora' },
    { id: 'helix', label: 'Helix' },
    { id: 'nebula', label: 'Nebula' }
  ],
  light: [
    { id: 'silkwave', label: 'Silk Wave' },
    { id: 'rings', label: 'Solar Rings' },
    { id: 'prism', label: 'Prism Cloud' }
  ]
};

export const PROJECTS = [
  {
    id: 'todo',
    index: '01',
    title: 'Todo Application',
    category: 'Task Management System',
    description: 'Persistent browser task manager with dynamic DOM rendering, completion toggles, and LocalStorage state.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage'],
    url: 'https://todoo21.ccbp.tech/',
    accent: '#E85D3F'
  },
  {
    id: 'wiki',
    index: '02',
    title: 'Wikipedia Search Engine',
    category: 'Asynchronous REST App',
    description: 'Real-time search interface querying Wikipedia endpoints via Fetch API with loading states and instant summaries.',
    tech: ['JavaScript', 'REST API', 'Fetch API'],
    url: 'https://wikipedia987.ccbp.tech/',
    accent: '#4F7CAC'
  },
  {
    id: 'countries',
    index: '03',
    title: 'Countries Population Explorer',
    category: 'Live Data Directory',
    description: 'Searchable global directory fetching live country flags, names, and population metrics on keystrokes.',
    tech: ['JavaScript', 'Bootstrap', 'REST API'],
    url: 'https://population212.ccbp.tech/',
    accent: '#2A9D8F'
  }
];

export const SKILLS = [
  { name: 'HTML5', group: 'Frontend', note: 'Semantic structure & accessible DOM' },
  { name: 'CSS3', group: 'Frontend', note: 'Grid, Flexbox & responsive motion' },
  { name: 'Bootstrap', group: 'Frontend', note: 'Rapid responsive component systems' },
  { name: 'JavaScript', group: 'Frontend', note: 'ES6+, async/await, Fetch & DOM' },
  { name: 'React.js', group: 'Frontend', note: 'Hooks, state & modular UI' },
  { name: 'Node.js', group: 'Backend', note: 'Event-driven server runtime' },
  { name: 'Express.js', group: 'Backend', note: 'RESTful routing & middleware' },
  { name: 'REST APIs', group: 'Backend', note: 'JSON contracts & API integration' },
  { name: 'Python', group: 'Backend', note: 'Problem solving & scripting' },
  { name: 'SQL / SQLite', group: 'Database', note: 'Relational schemas & queries' },
  { name: 'MongoDB', group: 'Database', note: 'Document modeling & CRUD' },
  { name: 'Git', group: 'Tools', note: 'Branching & version history' },
  { name: 'GitHub', group: 'Tools', note: 'Repositories & CI/CD workflows' },
  { name: 'VS Code', group: 'Tools', note: 'Primary development environment' }
];

export const IDENTITY_DATA = {
  narrative: {
    badge: 'Fresher · Ready to Join Immediately',
    mainText: "I'm a 2025 Computer Science & Engineering Fresher from Shri Ram Institute of Science and Technology, Jabalpur, trained in Full-Stack Web Development at NxtWave CCBP 4.0 Academy.",
    subText: 'As an aspiring software engineer, I focus on writing clean, modular React components, building reliable Node.js & Express REST APIs, and designing interfaces that feel responsive and intentional across every screen size.'
  },
  education: [
    {
      period: '2021 – 2025',
      title: 'B.Tech in Computer Science & Engineering',
      institution: 'Shri Ram Institute of Science and Technology, Jabalpur',
      description: 'Data Structures, Algorithms, DBMS, Operating Systems, and software engineering principles.'
    },
    {
      period: 'Certification',
      title: 'Full-Stack Web Development (CCBP 4.0)',
      institution: 'NxtWave CCBP 4.0 Academy',
      description: 'Hands-on specialization in React.js, Node.js, Express.js, Python, SQLite, and MongoDB.'
    }
  ],
  principles: [
    {
      title: 'Component Clarity',
      description: 'Modular React architecture with clean state flow and zero unnecessary complexity.'
    },
    {
      title: 'Responsive First',
      description: 'Mobile-first layouts crafted with HTML5, CSS3, and Bootstrap that adapt cleanly to every screen.'
    },
    {
      title: 'API-First Thinking',
      description: 'Structured RESTful endpoints, clean error states, and reliable database modeling.'
    }
  ]
};
