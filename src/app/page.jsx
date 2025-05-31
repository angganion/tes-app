"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

export default function FuturisticPortfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const skills = [
    { category: "Programming Languages", items: ["JavaScript/TypeScript", "Python", "Java", "Dart", "Motoko", "Move", "C/C++"], icon: "💻" },
    { category: "Web Development", items: ["Vue.js", "Next.js", "Tailwind CSS", "HTML/CSS"], icon: "🌐" },
    { category: "Mobile Development", items: ["Flutter"], icon: "📱" },
    { category: "Blockchain", items: ["Internet Computer (ICP)", "Sui Blockchain", "Smart Contracts", "Solidity"], icon: "⛓️" },
    { category: "Database", items: ["PostgreSQL", "MongoDB", "MySQL"], icon: "🗄️" },
    { category: "Tools & Others", items: ["Git/GitHub", "Docker", "RESTful APIs", "CI/CD", "Agile Methodologies"], icon: "🛠️" },
    { category: "Specialized Skills", items: ["Computer Vision", "Embedded Systems", "Robotics", "IoT Development"], icon: "🤖" }
  ];

  const projects = [
    {
      title: "Wisdom Repository",
      description: "A comprehensive knowledge management platform with web and mobile applications. Built using modern web technologies and mobile development frameworks.",
      tech: "Tailwind CSS, Flutter, Django REST Framework",
      links: [
        { label: "Web Repo", url: "https://github.com/PBP-D-11-2023/Wisdom-Repository.git" },
        { label: "Mobile Repo", url: "https://github.com/PBP-D-11-2023/wisdom_repository_mobile.git" }
      ],
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      title: "Marmut",
      description: "A database management system project showcasing advanced database concepts and implementation.",
      tech: "PostgreSQL, Python, Django",
      links: [
        { label: "GitHub", url: "https://github.com/basdat-D11/marmut.git" }
      ],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Certifolio",
      description: "A blockchain-based certification platform built with Motoko, enabling secure and verifiable digital certificates.",
      tech: "Internet Computer (ICP), Motoko, React.js, Tailwind CSS",
      links: [
        { label: "Frontend", url: "https://github.com/hackathon-mastery-indonesia/certifolio.git" },
        { label: "Backend", url: "https://github.com/hackathon-mastery-indonesia/certifolio_backend" }
      ],
      gradient: "from-green-500 to-teal-500"
    },
    {
      title: "Chainfess",
      description: "A blockchain-based anonymous confession platform, allowing users to share thoughts securely on the blockchain.",
      tech: "Ethereum, Solidity, React.js, Tailwind CSS",
      links: [
        { label: "GitHub", url: "https://github.com/hackathon-mastery-indonesia/Chainfess.git" }
      ],
      gradient: "from-red-500 to-orange-500"
    },
    {
      title: "Subscription",
      description: "A subscription management system built on the Sui blockchain, demonstrating smart contract implementation.",
      tech: "Sui Blockchain, Move, React.js, Tailwind CSS",
      links: [
        { label: "GitHub", url: "https://github.com/angganion/subscribe_sui.git" }
      ],
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      title: "Hospital Appointment",
      description: "A comprehensive hospital management system with appointment scheduling functionality, featuring a full-stack web application with microservices architecture.",
      tech: "Tailwind CSS, Spring Boot, Microservices",
      links: [
        { label: "Full Stack", url: "https://github.com/angganion/Hospital.git" },
        { label: "Backend Microservices", url: "https://github.com/angganion/Hospital-Appointment.git" }
      ],
      gradient: "from-red-500 to-orange-500"
    },
    {
      title: "Gym Management System",
      description: "A comprehensive gym management platform for handling memberships, class schedules, and facility management.",
      tech: "Vue.js, Tailwind CSS, Django",
      links: [
        { label: "GitHub", url: "https://github.com/yourusername/gym-management" }
      ],
      gradient: "from-blue-500 to-purple-500"
    },
    {
      title: "Human Detection Camera System",
      description: "An IoT-based security system using ESP32-CAM for real-time human detection. Captures images and processes them through a web interface for human detection.",
      tech: "ESP32, ESP32-CAM, Python, OpenCV, React.js, Tailwind CSS",
      links: [],
      gradient: "from-green-500 to-blue-500"
    }
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

  const workExperience = [
    {
      title: "Teaching Assistant of Database",
      company: "Faculty of Computer Science, Universitas Indonesia",
      type: "Part-time",
      period: "Jul 2024 – Present",
      location: "Depok, West Java, Indonesia"
    },
    {
      title: "Staff Akademis dan Pengajar",
      company: "BETIS Fasilkom UI",
      type: "Full-time",
      period: "Dec 2022 – Mar 2023",
      location: "Depok, West Java, Indonesia"
    }
  ];

  return (
    <div className={`min-h-screen bg-black text-white relative overflow-x-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent animate-pulse" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="text-center z-10 max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-7xl md:text-9xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              WAHYU RIDHO
            </h1>
            <h2 className="text-3xl md:text-5xl font-light text-gray-300 mb-8 tracking-widest">
              ANGGORO
            </h2>
            <h3 className="text-2xl md:text-3xl font-medium mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Information Systems <span className="text-gray-400">@</span> Universitas Indonesia
            </h3>
          </div>
          
          <div className="relative mb-12">
            <div className="text-xl md:text-2xl text-cyan-400 font-mono mb-4">
              &gt; Full Stack Developer_
            </div>
            <div className="w-2 h-6 bg-cyan-400 animate-pulse inline-block"></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="#projects" className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50">
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link href="#contact" className="px-8 py-4 border-2 border-cyan-500 rounded-full font-semibold hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30">
              Contact Me
            </Link>
          </div>
        </div>

        {/* Animated Geometric Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-cyan-500/30 rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-purple-500/30 animate-bounce" />
          <div className="absolute top-1/2 right-1/6 w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rotate-12 animate-pulse" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 shadow-2xl">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                I am a developer with a strong focus on <span className="text-cyan-400 font-semibold">backend development</span> and <span className="text-purple-400 font-semibold">distributed systems</span>. I am passionate about software architecture, databases, API design, and building scalable microservices.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I also love to explore various technology fields, including <span className="text-pink-400 font-semibold">blockchain</span>, <span className="text-green-400 font-semibold">computer vision</span>, <span className="text-yellow-400 font-semibold">embedded systems</span>, and <span className="text-red-400 font-semibold">cybersecurity</span>. My experience across diverse projects and related courses drives me to deliver efficient, innovative, and robust solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Skills Matrix
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {skills.map((skill, index) => (
              <div 
                key={skill.category}
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{skill.icon}</span>
                  <h3 className="text-xl font-bold text-cyan-400">{skill.category}</h3>
                </div>
                <ul className="space-y-2">
                  {skill.items.map((item, i) => (
                    <li key={i} className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 opacity-60"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Work Experience
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {workExperience.map((job, index) => (
              <div 
                key={index}
                className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/40 transition-all duration-500"
              >
                <h3 className="text-xl font-bold text-cyan-400 mb-2">{job.title}</h3>
                <p className="text-gray-300 mb-2">{job.company} · {job.type}</p>
                <p className="text-gray-300 mb-2">{job.period} · {job.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Courses Section */}
      <section id="courses" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Related Courses
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {courses.map((course, index) => (
              <div 
                key={index}
                className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/40 transition-all duration-500"
              >
                <h3 className="text-xl font-bold text-cyan-400 mb-2">{course.title}</h3>
                <p className="text-gray-300 mb-2">{course.institution}</p>
                <p className="text-gray-300">{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div 
                key={project.title}
                className="group relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 hover:border-cyan-400/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-5 rounded-3xl group-hover:opacity-10 transition-opacity duration-500`} />
                
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="mb-6">
                  <span className="text-sm text-cyan-400 font-mono bg-cyan-500/10 px-3 py-1 rounded-full">
                    {project.tech}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {project.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-sm font-medium hover:from-cyan-500/30 hover:to-purple-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section id="honors" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Achievements
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 backdrop-blur-xl border border-yellow-500/20 rounded-2xl p-8 hover:border-yellow-400/40 transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🏆</div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">
                    Winner Of MLH Web3Apps Hackathon session 2024 (19 - 21 January) in Security category
                  </h3>
                  <p className="text-gray-300 mb-2">Major League Hacking · Jan 2024</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 hover:border-purple-400/40 transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🥇</div>
                <div>
                  <h3 className="text-xl font-bold text-purple-400 mb-2">
                    Top 5 Pengabdian Case 2022
                  </h3>
                  <p className="text-gray-300 mb-2">BEM Fakultas Ilmu Komputer, University of Indonesia · Dec 2022</p>
                  <p className="text-gray-400 text-sm">
                    Social Business IT Case Competition focusing on rebranding the recycling-based creative industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8">
              <div className="text-center mb-8">
                <p className="text-lg text-gray-300 mb-6">
                  Ready to build something amazing together? Let's connect and discuss your next project.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <div className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50 flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  wahyu.ridho@ui.ac.id
                </div>
                
                <div className="flex gap-4">
                  <a href="https://github.com/angganion" className="p-3 bg-gray-800/50 rounded-full hover:bg-cyan-500/20 transition-all duration-300 hover:scale-110">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/wahyu-ridho-anggoro-46b55021a" className="p-3 bg-gray-800/50 rounded-full hover:bg-cyan-500/20 transition-all duration-300 hover:scale-110">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-cyan-500/20 backdrop-blur-xl">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Wahyu Ridho Anggoro. Crafted with passion and cutting-edge technology.
          </p>
        </div>
      </footer>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
}