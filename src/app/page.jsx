"use client";

import React, { useState } from "react";

const profile = {
  name: "Wahyu Ridho Anggoro",
  role: "Backend Developer",
  location: "Depok, Indonesia",
  bio: "I explore the space where backend meets distributed systems — building, scaling, and securing robust applications.",
  email: "wahyu.ridho@ui.ac.id",
  github: "https://github.com/angganion",
  linkedin: "https://www.linkedin.com/in/wahyu-ridho-anggoro-46b55021a",
};

const skills = [
  "JavaScript/TypeScript",
  "Python",
  "Java",
  "Dart",
  "C/C++",
  "Move",
  "Motoko",
];
const tools = [
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "Django",
  "Spring Boot",
  "Flutter",
  "React.js",
  "Next.js",
  "Vue.js",
  "Tailwind CSS",
  "Docker",
  "Git",
];
const interests = [
  "Distributed Systems",
  "API Design",
  "Microservices",
  "Blockchain",
  "Computer Vision",
  "Embedded Systems",
  "Cybersecurity",
];

const projects = [
  {
    title: "Wisdom Repository",
    description:
      "A comprehensive knowledge management platform with web and mobile applications.",
    tech: "Tailwind CSS, Flutter, Django REST Framework",
    links: [
      { label: "Web Repo", url: "https://github.com/PBP-D-11-2023/Wisdom-Repository.git" },
      { label: "Mobile Repo", url: "https://github.com/PBP-D-11-2023/wisdom_repository_mobile.git" },
    ],
  },
  {
    title: "Marmut",
    description:
      "A database management system project showcasing advanced database concepts and implementation.",
    tech: "PostgreSQL, Python, Django",
    links: [
      { label: "GitHub", url: "https://github.com/basdat-D11/marmut.git" },
    ],
  },
  {
    title: "Certifolio",
    description:
      "A blockchain-based certification platform built with Motoko, enabling secure and verifiable digital certificates.",
    tech: "Internet Computer (ICP), Motoko, React.js, Tailwind CSS",
    links: [
      { label: "Frontend", url: "https://github.com/hackathon-mastery-indonesia/certifolio.git" },
      { label: "Backend", url: "https://github.com/hackathon-mastery-indonesia/certifolio_backend" },
    ],
  },
  {
    title: "Chainfess",
    description:
      "A blockchain-based anonymous confession platform, allowing users to share thoughts securely on the blockchain.",
    tech: "Ethereum, Solidity, React.js, Tailwind CSS",
    links: [
      { label: "GitHub", url: "https://github.com/hackathon-mastery-indonesia/Chainfess.git" },
    ],
  },
  {
    title: "Subscription",
    description:
      "A subscription management system built on the Sui blockchain, demonstrating smart contract implementation.",
    tech: "Sui Blockchain, Move, React.js, Tailwind CSS",
    links: [
      { label: "GitHub", url: "https://github.com/angganion/subscribe_sui.git" },
    ],
  },
  {
    title: "Hospital Appointment",
    description:
      "A comprehensive hospital management system with appointment scheduling functionality, featuring a full-stack web application with microservices architecture.",
    tech: "Tailwind CSS, Spring Boot, Microservices",
    links: [
      { label: "Full Stack", url: "https://github.com/angganion/Hospital.git" },
      { label: "Backend Microservices", url: "https://github.com/angganion/Hospital-Appointment.git" },
    ],
  },
  {
    title: "Gym Management System",
    description:
      "A comprehensive gym management platform for handling memberships, class schedules, and facility management.",
    tech: "Vue.js, Tailwind CSS, Django",
    links: [
      { label: "GitHub", url: "https://github.com/yourusername/gym-management" },
    ],
  },
  {
    title: "Human Detection Camera System",
    description:
      "An IoT-based security system using ESP32-CAM for real-time human detection. Captures images and processes them through a web interface for human detection.",
    tech: "ESP32, ESP32-CAM, Python, OpenCV, React.js, Tailwind CSS",
    links: [],
  },
];

const courses = [
  {
    title: "Pemrograman Berbasis Platform (PBP)",
    institution: "Universitas Indonesia",
    description: "Advanced web and mobile development course covering modern frameworks, RESTful APIs, and best practices in software development."
  },
  {
    title: "Struktur Data dan Algoritma",
    institution: "Universitas Indonesia",
    description: "Comprehensive study of data structures and algorithms, focusing on problem-solving techniques and computational efficiency."
  },
  {
    title: "Basis Data (Basdat)",
    institution: "Universitas Indonesia",
    description: "Database management course covering design, implementation, optimization, and advanced database concepts."
  },
  {
    title: "Computer Vision",
    institution: "Universitas Indonesia",
    description: "Study of image processing, pattern recognition, and computer vision algorithms for real-world applications."
  },
  {
    title: "Embedded System",
    institution: "Universitas Indonesia",
    description: "Hands-on experience with microcontroller programming, real-time systems, and hardware-software integration."
  },
  {
    title: "Robotika",
    institution: "Universitas Indonesia",
    description: "Study of robotics fundamentals, including control systems, sensors, actuators, and autonomous systems."
  },
  {
    title: "Ethical Hacking",
    institution: "Universitas Indonesia",
    description: "Comprehensive study of cybersecurity, penetration testing, and ethical hacking methodologies."
  },
  {
    title: "Arsitektur dan Pemrograman Aplikasi Perusahaan",
    institution: "Universitas Indonesia",
    description: "Enterprise application development focusing on software architecture, design patterns, and scalable solutions."
  }
];

function RustCodeBlock() {
  // Compose the code as an array of lines for line numbers
  const codeLines = [
    [<span className="text-[#c792ea]">struct</span>, ' ', <span className="text-[#82aaff]">Developer</span>, ' {'],
    [<span className="text-[#ffcb6b]">    name</span>, ': ', <span className="text-[#82aaff]">String</span>, ','],
    [<span className="text-[#ffcb6b]">    role</span>, ': ', <span className="text-[#82aaff]">String</span>, ','],
    [<span className="text-[#ffcb6b]">    location</span>, ': ', <span className="text-[#82aaff]">String</span>, ','],
    [<span className="text-[#ffcb6b]">    skills</span>, ': ', <span className="text-[#82aaff]">Vec&lt;String&gt;</span>, ','],
    [<span className="text-[#ffcb6b]">    tools</span>, ': ', <span className="text-[#82aaff]">Vec&lt;String&gt;</span>, ','],
    [<span className="text-[#ffcb6b]">    interests</span>, ': ', <span className="text-[#82aaff]">Vec&lt;String&gt;</span>, ','],
    ['}'],
    [''],
    [''],
    ['\n'],
    [<span className="text-[#c792ea]">let</span>, ' ', <span className="text-[#b6c2ef]">me</span>, ' = ', <span className="text-[#82aaff]">Developer</span>, ' {'],
    [<span className="text-[#ffcb6b]">    name</span>, ': ', <span className="text-[#c3e88d]">"Wahyu Ridho Anggoro"</span>, ','],
    [<span className="text-[#ffcb6b]">    role</span>, ': ', <span className="text-[#c3e88d]">"Backend Developer"</span>, ','],
    [<span className="text-[#ffcb6b]">    location</span>, ': ', <span className="text-[#c3e88d]">"Depok, Indonesia"</span>, ','],
    [<span className="text-[#ffcb6b]">    skills</span>, ': ', <span className="text-[#c792ea]">vec!</span>, '['],
    [<span className="text-[#c3e88d]">        "JavaScript/TypeScript",</span>],
    [<span className="text-[#c3e88d]">        "Python",</span>],
    [<span className="text-[#c3e88d]">        "Java",</span>],
    [<span className="text-[#c3e88d]">        "Dart",</span>],
    [<span className="text-[#c3e88d]">        "C/C++",</span>],
    [<span className="text-[#c3e88d]">        "Move",</span>],
    [<span className="text-[#c3e88d]">        "Motoko",</span>],
    [<span className="text-[#b6c2ef]">    ],</span>],
    [<span className="text-[#ffcb6b]">    tools</span>, ': ', <span className="text-[#c792ea]">vec!</span>, '['],
    [<span className="text-[#c3e88d]">        "PostgreSQL",</span>],
    [<span className="text-[#c3e88d]">        "MongoDB",</span>],
    [<span className="text-[#c3e88d]">        "MySQL",</span>],
    [<span className="text-[#c3e88d]">        "Django",</span>],
    [<span className="text-[#c3e88d]">        "Spring Boot",</span>],
    [<span className="text-[#c3e88d]">        "Flutter",</span>],
    [<span className="text-[#c3e88d]">        "React.js",</span>],
    [<span className="text-[#c3e88d]">        "Next.js",</span>],
    [<span className="text-[#c3e88d]">        "Vue.js",</span>],
    [<span className="text-[#c3e88d]">        "Tailwind CSS",</span>],
    [<span className="text-[#c3e88d]">        "Docker",</span>],
    [<span className="text-[#c3e88d]">        "Git",</span>],
    [<span className="text-[#b6c2ef]">    ],</span>],
    [<span className="text-[#ffcb6b]">    interests</span>, ': ', <span className="text-[#c792ea]">vec!</span>, '['],
    [<span className="text-[#c3e88d]">        "Distributed Systems",</span>],
    [<span className="text-[#c3e88d]">        "API Design",</span>],
    [<span className="text-[#c3e88d]">        "Microservices",</span>],
    [<span className="text-[#c3e88d]">        "Blockchain",</span>],
    [<span className="text-[#c3e88d]">        "Computer Vision",</span>],
    [<span className="text-[#c3e88d]">        "Embedded Systems",</span>],
    [<span className="text-[#c3e88d]">        "Cybersecurity",</span>],
    [<span className="text-[#b6c2ef]">    ]</span>],
    ['};'],
    [''],
    ['\n'],
    [<span className="text-[#c792ea]">struct</span>, ' ', <span className="text-[#82aaff]">Course</span>, ' {'],
    [<span className="text-[#ffcb6b]">    title</span>, ': ', <span className="text-[#82aaff]">String</span>, ','],
    [<span className="text-[#ffcb6b]">    institution</span>, ': ', <span className="text-[#82aaff]">String</span>, ','],
    [<span className="text-[#ffcb6b]">    description</span>, ': ', <span className="text-[#82aaff]">String</span>, ','],
    ['}'],
    [''],
    ['\n'],
    [<span className="text-[#c792ea]">let</span>, ' ', <span className="text-[#b6c2ef]">related_courses</span>, ' = ', <span className="text-[#c792ea]">vec!</span>, '['],
    ...courses.map(course => [
      <span className="text-[#82aaff]">    Course</span>, ' {',
      <span className="text-[#ffcb6b]"> title</span>, ': ', <span className="text-[#c3e88d]">`"${course.title}"`</span>, ', ',
      <span className="text-[#ffcb6b]">institution</span>, ': ', <span className="text-[#c3e88d]">`"${course.institution}"`</span>, ', ',
      <span className="text-[#ffcb6b]">description</span>, ': ', <span className="text-[#c3e88d]">`"${course.description}"`</span>, ' },'
    ]),
    [']'],
    [''],
    ['\n'],
    [<span className="text-[#c792ea]">enum</span>, ' ', <span className="text-[#82aaff]">ContactType</span>, ' {'],
    [<span className="text-[#f78c6c]">    Github</span>, ','],
    [<span className="text-[#f78c6c]">    LinkedIn</span>, ','],
    [<span className="text-[#f78c6c]">    Email</span>, ','],
    ['}'],
    [''],
    ['\n'],
    [<span className="text-[#c792ea]">fn</span>, ' ', <span className="text-[#82aaff]">contact</span>, '(', <span className="text-[#ffcb6b]">type</span>, ': ', <span className="text-[#82aaff]">ContactType</span>, ') -> ', <span className="text-[#82aaff]">&'static str</span>, ' {'],
    [<span className="text-[#c792ea]">    match</span>, ' ', <span className="text-[#ffcb6b]">type</span>, ' {'],
    [<span className="text-[#82aaff]">        ContactType::Github</span>, ' => ', <span className="text-[#c3e88d]">"https://github.com/angganion"</span>, ','],
    [<span className="text-[#82aaff]">        ContactType::LinkedIn</span>, ' => ', <span className="text-[#c3e88d]">"https://www.linkedin.com/in/wahyu-ridho-anggoro-46b55021a"</span>, ','],
    [<span className="text-[#82aaff]">        ContactType::Email</span>, ' => ', <span className="text-[#c3e88d]">"wahyu.ridho@ui.ac.id"</span>, ','],
    ['    }'],
    ['}'],
    ['\n'],
  ];

  return (
    <pre className="bg-[#0f111a] text-[#b6c2ef] rounded-lg p-6 text-sm overflow-x-auto border border-gray-700 mb-6" style={{ fontFamily: 'Fira Mono, Menlo, monospace' }}>
      <code className="flex">
        <div className="pr-4 select-none text-right text-[#546e7a]" style={{ minWidth: 32 }}>
          {codeLines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <div>
          {codeLines.map((line, i) => (
            <div key={i} className="whitespace-pre">{line}</div>
          ))}
        </div>
      </code>
    </pre>
  );
}

export default function Portfolio() {
  const [tab, setTab] = useState("about");

  return (
    <div className="min-h-screen bg-black text-gray-100 font-mono flex flex-col md:block">
      {/* Sidebar */}
      <aside className="w-full md:w-80 lg:w-96 max-w-full border-b md:border-b-0 md:border-r border-gray-700 p-8 flex flex-col justify-between md:fixed md:left-0 md:top-0 md:h-screen md:overflow-hidden z-20 bg-black">
        <div>
          <div className="flex flex-col items-center md:items-start gap-4">
            <h1 className="font-extrabold text-2xl text-gray-100 mb-1">{profile.name}</h1>
            <p className="text-blue-400 text-sm mb-2">{profile.role}</p>
            <p className="flex items-center text-gray-400 text-sm mb-2">
              <svg fill="none" height={14} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={14} className="mr-2 -mt-0.5 inline"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx={12} cy={10} r={3}></circle></svg>
              {profile.location}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mt-4 text-center md:text-left">{profile.bio}</p>
          </div>
        </div>
        <div>
          {/* Terminal mini */}
          <div className="bg-black border rounded-lg border-gray-700 mt-6 p-4 text-xs">
            <div className="flex items-center mb-2">
              <span className="mr-2 text-blue-400">$</span> <span className="text-gray-100">npx connect</span>
            </div>
            <div className="text-gray-400 mt-2">Initializing...<br />Ready to connect.<br />Waiting for contact request...</div>
          </div>
          {/* Contacts */}
          <div className="flex justify-between flex-wrap gap-3 mt-6">
            <a className="flex bg-black border justify-center rounded-lg border-gray-700 duration-150 h-10 hover:-translate-y-0.5 hover:bg-gray-800 items-center text-gray-100 transition-all w-10" href={profile.github} target="_blank" title="View GitHub Profile" rel="noopener noreferrer">
              <svg fill="none" height={24} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={24}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a className="flex bg-black border justify-center rounded-lg border-gray-700 duration-150 h-10 hover:-translate-y-0.5 hover:bg-gray-800 items-center text-gray-100 transition-all w-10" href={profile.linkedin} target="_blank" title="View LinkedIn Profile" rel="noopener noreferrer">
              <svg fill="none" height={24} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={24}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect height={12} width={4} x={2} y={9}></rect><circle cx={4} cy={4} r={2}></circle></svg>
            </a>
            <a className="flex bg-black border justify-center rounded-lg border-gray-700 duration-150 h-10 hover:-translate-y-0.5 hover:bg-gray-800 items-center text-gray-100 transition-all w-10" href={`mailto:${profile.email}`} target="_blank" title="Send Email" rel="noopener noreferrer">
              <svg fill="none" height={24} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={24}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </a>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen md:ml-0 md:pl-0 md:ml-80 lg:ml-96">
        {/* Tab Bar */}
        <div className="flex bg-black border-b border-gray-700 sticky top-0 z-10">
          <button
            className={`flex items-center gap-2 px-4 py-2 tab-link text-xs font-semibold border-r border-gray-700 transition-colors duration-150 ${tab === "about" ? "text-blue-400" : "text-gray-100 hover:text-blue-300"}`}
            onClick={() => setTab("about")}
          >
            {/* Rust crab (Ferris) icon */}
            <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block"><circle cx="16" cy="18" r="7" fill="#ff7139" stroke="#b35c1e" strokeWidth="1.5"/><ellipse cx="11.5" cy="15.5" rx="1.5" ry="2.5" fill="#ff7139" stroke="#b35c1e" strokeWidth="1"/><ellipse cx="20.5" cy="15.5" rx="1.5" ry="2.5" fill="#ff7139" stroke="#b35c1e" strokeWidth="1"/><ellipse cx="9" cy="21" rx="1.5" ry="0.5" fill="#ff7139" stroke="#b35c1e" strokeWidth="1"/><ellipse cx="23" cy="21" rx="1.5" ry="0.5" fill="#ff7139" stroke="#b35c1e" strokeWidth="1"/><circle cx="13.5" cy="18" r="1" fill="#222"/><circle cx="18.5" cy="18" r="1" fill="#222"/><path d="M7 13 Q4 10 7 7" stroke="#b35c1e" strokeWidth="1.2" fill="none"/><path d="M25 13 Q28 10 25 7" stroke="#b35c1e" strokeWidth="1.2" fill="none"/><path d="M6 25 Q8 23 10 22" stroke="#b35c1e" strokeWidth="1.2" fill="none"/><path d="M26 25 Q24 23 22 22" stroke="#b35c1e" strokeWidth="1.2" fill="none"/></svg>
            about.rs
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 tab-link text-xs font-semibold border-r border-gray-700 transition-colors duration-150 ${tab === "projects" ? "text-blue-400" : "text-gray-100 hover:text-blue-300"}`}
            onClick={() => setTab("projects")}
          >
            {/* Markdown icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 15V9l2 2l2-2v6"/><path d="M17 13h-2v2h2v-2z"/></svg>
            projects.md
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 tab-link text-xs font-semibold border-r border-gray-700 transition-colors duration-150 ${tab === "blog" ? "text-blue-400" : "text-gray-100 hover:text-blue-300"}`}
            onClick={() => setTab("blog")}
          >
            {/* Shell/terminal icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 9l3 3-3 3"/><path d="M13 15h3"/></svg>
            blog.sh
          </button>
        </div>
        {/* Tab Content */}
        <div className="flex-grow bg-black p-6 overflow-y-auto h-screen">
          {tab === "about" && (
            <RustCodeBlock />
          )}
          {tab === "projects" && (
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
              {projects.map((project, idx) => (
                <div key={idx} className="flex bg-black border rounded-lg border-gray-700 flex-col items-start p-4 mb-4">
                  <h3 className="mb-2 font-semibold text-white text-xl">{project.title}</h3>
                  <p className="text-gray-400 mb-2 text-sm">{project.description}</p>
                  <span className="text-xs text-blue-400 bg-gray-800 px-2 py-1 rounded mb-2">{project.tech}</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.links.map((link, i) => (
                      <a
                        key={i}
                        className="hover:text-blue-400 px-3 border border-gray-700 hover:border-blue-400 py-1 rounded-lg text-xs text-center transition-all"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === "blog" && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="bg-black border rounded-lg border-gray-700 flex flex-col items-start p-8 max-w-xl w-full shadow-lg">
                <h3 className="mb-2 font-semibold text-white text-2xl">Blog (Coming Soon)</h3>
                <p className="text-gray-400 mb-4 text-sm">
                  Personal blog with articles on backend, distributed systems, and more. Coming soon!
                </p>
                <a
                  href="https://yourblogdomain.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
                >
                  Read on my blog
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}