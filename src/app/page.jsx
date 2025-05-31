"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

export default function RainbowDashPortfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const skills = [
    { category: "Programming Languages", items: ["JavaScript/TypeScript", "Python", "Java", "Dart", "Motoko", "Move", "C/C++"], icon: "⚡" },
    { category: "Web Development", items: ["Vue.js", "Next.js", "Tailwind CSS", "HTML/CSS"], icon: "🌐" },
    { category: "Mobile Development", items: ["Flutter"], icon: "📱" },
    { category: "Blockchain", items: ["Internet Computer (ICP)", "Sui Blockchain", "Smart Contracts", "Solidity"], icon: "⛓️" },
    { category: "Database", items: ["PostgreSQL", "MongoDB", "MySQL"], icon: "🗄️" },
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
      gradient: "from-red-400 via-orange-400 to-yellow-400"
    },
    {
      title: "Marmut",
      description: "A database management system project showcasing advanced database concepts and implementation.",
      tech: "PostgreSQL, Python, Django",
      links: [
        { label: "GitHub", url: "https://github.com/basdat-D11/marmut.git" }
      ],
      gradient: "from-yellow-400 via-green-400 to-blue-400"
    },
    {
      title: "Certifolio",
      description: "A blockchain-based certification platform built with Motoko, enabling secure and verifiable digital certificates.",
      tech: "Internet Computer (ICP), Motoko, React.js, Tailwind CSS",
      links: [
        { label: "Frontend", url: "https://github.com/hackathon-mastery-indonesia/certifolio.git" },
        { label: "Backend", url: "https://github.com/hackathon-mastery-indonesia/certifolio_backend" }
      ],
      gradient: "from-blue-400 via-indigo-400 to-purple-400"
    },
    {
      title: "Chainfess",
      description: "A blockchain-based anonymous confession platform, allowing users to share thoughts securely on the blockchain.",
      tech: "Ethereum, Solidity, React.js, Tailwind CSS",
      links: [
        { label: "GitHub", url: "https://github.com/hackathon-mastery-indonesia/Chainfess.git" }
      ],
      gradient: "from-purple-400 via-pink-400 to-red-400"
    },
    {
      title: "Subscription",
      description: "A subscription management system built on the Sui blockchain, demonstrating smart contract implementation.",
      tech: "Sui Blockchain, Move, React.js, Tailwind CSS",
      links: [
        { label: "GitHub", url: "https://github.com/angganion/subscribe_sui.git" }
      ],
      gradient: "from-orange-400 via-yellow-400 to-green-400"
    },
    {
      title: "Hospital Appointment",
      description: "A comprehensive hospital management system with appointment scheduling functionality, featuring a full-stack web application with microservices architecture.",
      tech: "Tailwind CSS, Spring Boot, Microservices",
      links: [
        { label: "Full Stack", url: "https://github.com/angganion/Hospital.git" },
        { label: "Backend Microservices", url: "https://github.com/angganion/Hospital-Appointment.git" }
      ],
      gradient: "from-green-400 via-blue-400 to-indigo-400"
    },
    {
      title: "Gym Management System",
      description: "A comprehensive gym management platform for handling memberships, class schedules, and facility management.",
      tech: "Vue.js, Tailwind CSS, Django",
      links: [
        { label: "GitHub", url: "https://github.com/yourusername/gym-management" }
      ],
      gradient: "from-indigo-400 via-purple-400 to-pink-400"
    },
    {
      title: "Human Detection Camera System",
      description: "An IoT-based security system using ESP32-CAM for real-time human detection. Captures images and processes them through a web interface for human detection.",
      tech: "ESP32, ESP32-CAM, Python, OpenCV, React.js, Tailwind CSS",
      links: [],
      gradient: "from-pink-400 via-red-400 to-orange-400"
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
    <div className={`min-h-screen bg-gradient-to-br from-sky-200 via-blue-100 to-indigo-200 text-gray-800 relative overflow-x-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Animated Sky Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-sky-300 via-blue-200 to-indigo-300">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent animate-pulse" />
        <div className="absolute inset-0 bg-cloud-pattern opacity-20" />
        
        {/* Floating Clouds */}
        <div className="absolute top-10 left-10 w-16 h-8 bg-white/60 rounded-full animate-float-slow" />
        <div className="absolute top-20 right-20 w-12 h-6 bg-white/50 rounded-full animate-float-medium" />
        <div className="absolute top-32 left-1/3 w-20 h-10 bg-white/70 rounded-full animate-float-fast" />
        <div className="absolute bottom-40 right-10 w-14 h-7 bg-white/55 rounded-full animate-float-slow" />
        
        {/* Rainbow streaks */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 via-indigo-400 to-purple-400 opacity-60 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 via-indigo-400 via-blue-400 via-green-400 via-yellow-400 to-red-400 opacity-60 animate-pulse" />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="text-center z-10 max-w-4xl mx-auto px-6">
          <div className="mb-8 relative">
            {/* Left Rainbow Dash Image */}
            <div className="absolute -left-32 top-0">
              <img 
                src="/rainbow-dash.png" 
                alt="Rainbow Dash" 
                className="w-48 h-48 object-contain animate-float-medium"
                style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }}
              />
            </div>

            {/* Right Rainbow Dash Image (Mirrored) */}
            <div className="absolute -right-32 top-0">
              <img 
                src="/rainbow-dash.png" 
                alt="Rainbow Dash" 
                className="w-48 h-48 object-contain animate-float-medium scale-x-[-1]"
                style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }}
              />
            </div>
            
            {/* Lightning bolt decorations */}
            <div className="flex justify-center mb-6">
              <span className="text-6xl animate-bounce text-yellow-400">⚡</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black mb-6 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent animate-rainbow">
              WAHYU RIDHO
            </h1>
            <h2 className="text-3xl md:text-5xl font-light text-gray-700 mb-4 tracking-widest">
              ANGGORO
            </h2>
            <div className="flex flex-col items-center space-y-2 mb-8">
              <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-white/30 backdrop-blur-sm border border-blue-300/50 shadow-lg">
                <span className="text-lg md:text-xl tracking-wider bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Information Systems</span>
                <span className="text-blue-400/70">•</span>
                <span className="text-lg md:text-xl tracking-wider bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">Universitas Indonesia</span>
              </div>
            </div>
          </div>
          
          <div className="relative mb-12">
            <div className="text-xl md:text-2xl text-blue-700 font-mono mb-4 bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
              &gt; Fast as Lightning Developer_ ⚡
            </div>
            <div className="w-2 h-6 bg-yellow-400 animate-pulse inline-block"></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="#projects" className="group relative px-8 py-4 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 rounded-full font-bold text-white transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-400/50 shadow-lg">
              <span className="relative z-10">🌈 View Projects</span>
            </Link>
            <Link href="#contact" className="px-8 py-4 border-2 border-blue-400 bg-white/30 backdrop-blur-sm rounded-full font-bold text-blue-700 hover:bg-blue-400/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-400/30 shadow-lg">
              ☁️ Contact Me
            </Link>
          </div>
        </div>

        {/* Rainbow Dash Cutie Mark Style Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Lightning bolts */}
          <div className="absolute top-1/3 right-1/3 text-4xl animate-bounce text-yellow-400 opacity-70">⚡</div>
          <div className="absolute bottom-1/3 left-1/4 text-3xl animate-pulse text-yellow-500 opacity-60">⚡</div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            About Me ⚡
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/40 backdrop-blur-xl border border-blue-300/30 rounded-3xl p-8 shadow-2xl relative">
              <div className="absolute -right-32 top-1/2 transform -translate-y-1/2">
                <img 
                  src="/rainbow-dash-2.png" 
                  alt="Rainbow Dash 2" 
                  className="w-48 h-48 object-contain animate-float-medium"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }}
                />
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                I am a developer with a strong focus on <span className="text-blue-600 font-bold">backend development</span> and <span className="text-purple-600 font-bold">distributed systems</span>. Just like Rainbow Dash soaring through the clouds, I'm passionate about software architecture, databases, API design, and building scalable microservices at lightning speed! ⚡
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                I also love to explore various technology fields, including <span className="text-pink-600 font-bold">blockchain</span>, <span className="text-green-600 font-bold">computer vision</span>, <span className="text-yellow-600 font-bold">embedded systems</span>, and <span className="text-red-600 font-bold">cybersecurity</span>. My experience across diverse projects and related courses drives me to deliver efficient, innovative, and robust solutions with the speed and precision of a Wonderbolt! 🌈
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative overflow-hidden">
        {/* Magical Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-6xl animate-bounce">⚡</div>
          <div className="absolute top-20 right-20 text-4xl animate-pulse">💫</div>
          <div className="absolute bottom-20 left-20 text-5xl animate-spin">🌟</div>
          <div className="absolute bottom-10 right-10 text-3xl animate-bounce">✨</div>
          <div className="absolute top-1/2 left-1/4 text-4xl animate-pulse">🌠</div>
          <div className="absolute top-1/3 right-1/3 text-3xl animate-bounce">⭐</div>
          <div className="absolute bottom-1/3 left-1/2 text-4xl animate-pulse">🔮</div>
        </div>

        {/* Floating Clouds */}
        <div className="absolute top-10 left-1/2 w-20 h-12 bg-white/60 rounded-full animate-float"></div>
        <div className="absolute top-32 right-1/4 w-16 h-10 bg-white/40 rounded-full animate-float-delayed"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-6xl font-bold text-center mb-4 bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 via-green-500 via-yellow-500 to-pink-500 bg-clip-text text-transparent">
            ✨ Magical Skills Matrix ✨
          </h2>
          <p className="text-center text-lg text-purple-600 mb-16 font-semibold">
            Harnessing the power of technology with magical precision! 🌟
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {skills.map((skill, index) => (
              <div 
                key={skill.category}
                className="group relative bg-white/30 backdrop-blur-xl border-2 border-pink-300/40 rounded-3xl p-8 hover:bg-white/40 hover:border-purple-400/60 transition-all duration-700 shadow-2xl hover:shadow-pink-300/50 hover:scale-105 transform"
              >
                {/* Enhanced Cloud Corner Effects */}
                <div className="absolute -top-4 -right-4 flex flex-col items-end">
                  <div className="text-3xl animate-cloud-slide opacity-80">☁️</div>
                  <div className="text-2xl animate-cloud-slide-delayed opacity-60 -mt-2">☁️</div>
                  <div className="text-xl animate-cloud-slide-delayed-2 opacity-40 -mt-2">☁️</div>
                </div>
                <div className="absolute -bottom-4 -left-4 flex flex-col items-start">
                  <div className="text-3xl animate-cloud-slide-reverse opacity-80">☁️</div>
                  <div className="text-2xl animate-cloud-slide-reverse-delayed opacity-60 -mt-2">☁️</div>
                  <div className="text-xl animate-cloud-slide-reverse-delayed-2 opacity-40 -mt-2">☁️</div>
                </div>
                
                {/* Rainbow Border Animation */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3 animate-bounce">{skill.icon}</span>
                    <h3 className="text-xl font-bold text-purple-800 group-hover:text-pink-700 transition-colors">{skill.category}</h3>
                </div>
                <ul className="space-y-2">
                  {skill.items.map((item, i) => (
                      <li key={i} className="text-gray-700 hover:text-gray-900 transition-colors duration-300 flex items-center group/item">
                        <span className="w-2 h-2 bg-gradient-to-r from-red-400 to-purple-400 rounded-full mr-3 group-hover/item:animate-pulse"></span>
                      {item}
                        <span className="ml-2 opacity-0 group-hover/item:opacity-100 transition-opacity">✨</span>
                    </li>
                  ))}
                </ul>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom Decoration */}
          <div className="text-center mt-16">
            <div className="text-4xl space-x-4 animate-bounce">
              ⚡ 💫 🌟 ✨ 🌠 ⭐ 🔮
            </div>
            <p className="mt-4 text-purple-600 font-semibold text-lg">
              "Coding is Magic, Skills are Power!" 💫
            </p>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Work Experience ☁️
          </h2>
          <div className="max-w-4xl mx-auto space-y-8 relative">
            {/* Rainbow Dash 3 */}
            <div className="absolute -left-40 -top-20 z-10">
              <img 
                src="/rainbow-dash-3.png" 
                alt="Rainbow Dash 3" 
                className="w-48 h-48 object-contain animate-float-medium"
                style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }}
              />
            </div>
            {workExperience.map((job, index) => (
              <div 
                key={index}
                className="group relative bg-white/30 backdrop-blur-xl border-2 border-pink-300/40 rounded-3xl p-8 hover:bg-white/40 hover:border-purple-400/60 transition-all duration-700 shadow-2xl hover:shadow-pink-300/50 hover:scale-105 transform"
              >
                {/* Sparkle Effects */}
                <div className="absolute -top-2 -right-2 text-2xl animate-spin group-hover:animate-pulse">✨</div>
                <div className="absolute -bottom-2 -left-2 text-xl animate-bounce group-hover:animate-spin">⭐</div>
                
                {/* Rainbow Border Animation */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-purple-800 mb-2 group-hover:text-pink-700 transition-colors flex items-center gap-2">
                    <span className="text-2xl animate-bounce">💼</span>
                    {job.title}
                  </h3>
                  <p className="text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-lg">🏢</span>
                    {job.company} · {job.type}
                  </p>
                  <p className="text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-lg">⏰</span>
                    {job.period} · {job.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom Decoration */}
          <div className="text-center mt-16">
            <div className="text-4xl space-x-4 animate-bounce">
              💼 🎓 ⭐ ✨ 🌟 🎯 🔮
            </div>
            <p className="mt-4 text-purple-600 font-semibold text-lg">
              "Every experience is a magical opportunity!" 💫
            </p>
          </div>
        </div>
      </section>

      {/* Related Courses Section - My Little Pony Theme */}
      <section id="courses" className="py-20 relative overflow-hidden">
        {/* Magical Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-6xl animate-bounce">🌈</div>
          <div className="absolute top-20 right-20 text-4xl animate-pulse">⭐</div>
          <div className="absolute bottom-20 left-20 text-5xl animate-spin">🦄</div>
          <div className="absolute bottom-10 right-10 text-3xl animate-bounce">🌸</div>
          <div className="absolute top-1/2 left-1/4 text-4xl animate-pulse">☁️</div>
          <div className="absolute top-1/3 right-1/3 text-3xl animate-bounce">🍄</div>
          <div className="absolute bottom-1/3 left-1/2 text-4xl animate-pulse">🌺</div>
        </div>

        {/* Floating Clouds */}
        <div className="absolute top-10 left-1/2 w-20 h-12 bg-white/60 rounded-full animate-float"></div>
        <div className="absolute top-32 right-1/4 w-16 h-10 bg-white/40 rounded-full animate-float-delayed"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-6xl font-bold text-center mb-4 bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 via-green-500 via-yellow-500 to-pink-500 bg-clip-text text-transparent">
            ✨ Magical Learning Adventures ✨
          </h2>
          <p className="text-center text-lg text-purple-600 mb-16 font-semibold">
          </p>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {courses.map((course, index) => (
              <div 
                key={index} 
                className="group relative bg-white/30 backdrop-blur-xl border-2 border-pink-300/40 rounded-3xl p-8 hover:bg-white/40 hover:border-purple-400/60 transition-all duration-700 shadow-2xl hover:shadow-pink-300/50 hover:scale-105 transform"
              >
                {/* Enhanced Cloud Corner Effects */}
                <div className="absolute -top-4 -right-4 flex flex-col items-end">
                  <div className="text-3xl animate-cloud-slide opacity-80">☁️</div>
                  <div className="text-2xl animate-cloud-slide-delayed opacity-60 -mt-2">☁️</div>
                  <div className="text-xl animate-cloud-slide-delayed-2 opacity-40 -mt-2">☁️</div>
                </div>
                <div className="absolute -bottom-4 -left-4 flex flex-col items-start">
                  <div className="text-3xl animate-cloud-slide-reverse opacity-80">☁️</div>
                  <div className="text-2xl animate-cloud-slide-reverse-delayed opacity-60 -mt-2">☁️</div>
                  <div className="text-xl animate-cloud-slide-reverse-delayed-2 opacity-40 -mt-2">☁️</div>
                </div>
                
                {/* Rainbow Border Animation */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-purple-800 mb-3 flex items-center gap-2 group-hover:text-pink-700 transition-colors">
                    {index % 4 === 0 && <span className="text-3xl">🌈</span>}
                    {index % 4 === 1 && <span className="text-3xl">🦄</span>}
                    {index % 4 === 2 && <span className="text-3xl">🌸</span>}
                    {index % 4 === 3 && <span className="text-3xl">⭐</span>}
                    {course.title}
                    <span className="ml-auto text-xl animate-bounce">✨</span>
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🏰</span>
                    <p className="text-purple-700 font-semibold text-lg">{course.institution}</p>
                  </div>
                  
                  <div className="bg-white/50 rounded-2xl p-4 border border-pink-200">
                    <p className="text-gray-800 leading-relaxed font-medium">{course.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom Decoration */}
          <div className="text-center mt-16">
            <div className="text-4xl space-x-4 animate-bounce">
              ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️ ☁️
            </div>
            <p className="mt-4 text-purple-600 font-semibold text-lg">
              "Friendship is Magic, Learning is Adventure!" 💖
            </p>
          </div>
        </div>

        {/* Custom CSS Animations - Add this to your global CSS or Tailwind config */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
            }
            
            @keyframes float-delayed {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-15px); }
            }
            
            .animate-float {
              animation: float 6s ease-in-out infinite;
            }
            
            .animate-float-delayed {
              animation: float-delayed 8s ease-in-out infinite;
              animation-delay: 2s;
            }
            
            .animation-delay-100 {
              animation-delay: 0.1s;
            }
            
            .animation-delay-200 {
              animation-delay: 0.2s;
            }

            @keyframes cloud-slide {
              0% { 
                transform: translateX(100%);
                opacity: 0;
              }
              20% {
                opacity: 1;
              }
              80% {
                opacity: 1;
              }
              100% { 
                transform: translateX(-100%);
                opacity: 0;
              }
            }

            @keyframes cloud-slide-reverse {
              0% { 
                transform: translateX(-100%);
                opacity: 0;
              }
              20% {
                opacity: 1;
              }
              80% {
                opacity: 1;
              }
              100% { 
                transform: translateX(100%);
                opacity: 0;
              }
            }

            @keyframes cloud-slide-delayed {
              0% { 
                transform: translateX(100%);
                opacity: 0;
              }
              20% {
                opacity: 0.6;
              }
              80% {
                opacity: 0.6;
              }
              100% { 
                transform: translateX(-100%);
                opacity: 0;
              }
            }

            @keyframes cloud-slide-delayed-2 {
              0% { 
                transform: translateX(100%);
                opacity: 0;
              }
              20% {
                opacity: 0.4;
              }
              80% {
                opacity: 0.4;
              }
              100% { 
                transform: translateX(-100%);
                opacity: 0;
              }
            }

            @keyframes cloud-slide-reverse-delayed {
              0% { 
                transform: translateX(-100%);
                opacity: 0;
              }
              20% {
                opacity: 0.6;
              }
              80% {
                opacity: 0.6;
              }
              100% { 
                transform: translateX(100%);
                opacity: 0;
              }
            }

            @keyframes cloud-slide-reverse-delayed-2 {
              0% { 
                transform: translateX(-100%);
                opacity: 0;
              }
              20% {
                opacity: 0.4;
              }
              80% {
                opacity: 0.4;
              }
              100% { 
                transform: translateX(100%);
                opacity: 0;
              }
            }

            .animate-cloud-slide-delayed {
              animation: cloud-slide-delayed 4s linear infinite;
              animation-delay: 0.5s;
            }

            .animate-cloud-slide-delayed-2 {
              animation: cloud-slide-delayed-2 4s linear infinite;
              animation-delay: 1s;
            }

            .animate-cloud-slide-reverse-delayed {
              animation: cloud-slide-reverse-delayed 4s linear infinite;
              animation-delay: 0.5s;
            }

            .animate-cloud-slide-reverse-delayed-2 {
              animation: cloud-slide-reverse-delayed-2 4s linear infinite;
              animation-delay: 1s;
            }
          `
        }} />
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Featured Projects 🌈
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto relative">
            {/* Rainbow Dash 4 - Left */}
            <div className="absolute -left-40 -top-20 z-10">
              <img 
                src="/rainbow-dash-4.png" 
                alt="Rainbow Dash 4" 
                className="w-48 h-48 object-contain animate-float-medium"
                style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }}
              />
            </div>
            {/* Rainbow Dash 4 - Right */}
            <div className="absolute -right-40 top-20 z-10">
              <img 
                src="/rainbow-dash-4.png" 
                alt="Rainbow Dash 4" 
                className="w-48 h-48 object-contain animate-float-medium scale-x-[-1]"
                style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }}
              />
            </div>
            {/* Rainbow Dash 4 - Bottom Left */}
            <div className="absolute -left-32 bottom-20 z-10">
              <img 
                src="/rainbow-dash-4.png" 
                alt="Rainbow Dash 4" 
                className="w-40 h-40 object-contain animate-float-slow"
                style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }}
              />
            </div>
            {/* Rainbow Dash 4 - Bottom Right */}
            <div className="absolute -right-32 bottom-10 z-10">
              <img 
                src="/rainbow-dash-4.png" 
                alt="Rainbow Dash 4" 
                className="w-40 h-40 object-contain animate-float-slow scale-x-[-1]"
                style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }}
              />
            </div>
            {projects.map((project, index) => (
              <div 
                key={project.title}
                className="group relative bg-white/30 backdrop-blur-xl border-2 border-pink-300/40 rounded-3xl p-8 hover:bg-white/40 hover:border-purple-400/60 transition-all duration-700 shadow-2xl hover:shadow-pink-300/50 hover:scale-105 transform"
              >
                {/* Sparkle Effects */}
                <div className="absolute -top-2 -right-2 text-2xl animate-spin group-hover:animate-pulse">✨</div>
                <div className="absolute -bottom-2 -left-2 text-xl animate-bounce group-hover:animate-spin">⭐</div>
                
                {/* Rainbow Border Animation */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-purple-800 group-hover:text-pink-700 transition-colors flex items-center gap-2">
                    <span className="text-3xl animate-bounce">⚡</span>
                    {project.title}
                  </h3>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="mb-6">
                    <span className="text-sm text-purple-700 font-mono bg-purple-200/50 px-3 py-1 rounded-full border border-purple-300/30 group-hover:bg-pink-200/50 group-hover:border-pink-300/30 transition-colors">
                    {project.tech}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {project.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      className="px-4 py-2 bg-white/40 border border-blue-300/30 rounded-full text-sm font-medium hover:bg-blue-200/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 text-blue-700 shadow-sm"
                    >
                      🌈 {link.label}
                    </a>
                  ))}
                </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom Decoration */}
          <div className="text-center mt-16">
            <div className="text-4xl space-x-4 animate-bounce">
              🚀 💫 ⚡ ✨ 🌟 🎯 🔮
            </div>
            <p className="mt-4 text-purple-600 font-semibold text-lg">
              "Every project is a magical journey!" 💫
            </p>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section id="honors" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Achievements 🏆
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-gradient-to-r from-yellow-200/40 via-orange-200/40 to-red-200/40 backdrop-blur-xl border border-yellow-400/30 rounded-2xl p-8 hover:border-yellow-500/50 transition-all duration-500 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🏆</div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-700 mb-2">
                    Winner Of MLH Web3Apps Hackathon session 2024 (19 - 21 January) in Security category
                  </h3>
                  <p className="text-gray-700 mb-2">Major League Hacking · Jan 2024</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-200/40 via-pink-200/40 to-red-200/40 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-500 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🥇</div>
                <div>
                  <h3 className="text-xl font-bold text-purple-700 mb-2">
                    Top 5 Pengabdian Case 2022
                  </h3>
                  <p className="text-gray-700 mb-2">BEM Fakultas Ilmu Komputer, University of Indonesia · Dec 2022</p>
                  <p className="text-gray-600 text-sm">
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
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Get In Touch ☁️
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/40 backdrop-blur-xl border border-blue-300/30 rounded-3xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <p className="text-lg text-gray-700 mb-6">
                  Ready to soar through the clouds and build something amazing together? Let's connect faster than a sonic rainboom! 🌈⚡
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <div className="group px-8 py-4 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 rounded-full font-bold text-white transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-400/50 flex items-center gap-3 shadow-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  wahyu.ridho@ui.ac.id
                </div>
                
                <div className="flex gap-4">
                  <a href="https://github.com/angganion" className="p-3 bg-white/40 rounded-full hover:bg-blue-200/40 transition-all duration-300 hover:scale-110 shadow-lg border border-blue-300/30">
                    <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/wahyu-ridho-anggoro-46b55021a" className="p-3 bg-white/40 rounded-full hover:bg-blue-200/40 transition-all duration-300 hover:scale-110 shadow-lg border border-blue-300/30">
                    <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="00 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 relative">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <span className="text-4xl animate-bounce text-yellow-400">⚡</span>
            </div>
            <p className="text-gray-600 mb-4">
              Built with React, Next.js, and Tailwind CSS • Inspired by the speed and loyalty of Rainbow Dash 🌈
            </p>
            <p className="text-gray-500 text-sm">
              © 2024 Wahyu Ridho Anggoro. Soaring through code at sonic speed! ⚡
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-10px) translateX(5px); }
          66% { transform: translateY(5px) translateX(-3px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(8px); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-8px) translateX(12px); }
          75% { transform: translateY(8px) translateX(-8px); }
        }
        
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes cloud-slide {
          0% { 
            transform: translateX(100%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% { 
            transform: translateX(-100%);
            opacity: 0;
          }
        }

        @keyframes cloud-slide-reverse {
          0% { 
            transform: translateX(-100%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% { 
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
        
        .animate-rainbow {
          background-size: 200% 200%;
          animation: rainbow 3s ease infinite;
        }

        .animate-cloud-slide {
          animation: cloud-slide 3s linear infinite;
        }

        .animate-cloud-slide-reverse {
          animation: cloud-slide-reverse 3s linear infinite;
        }
        
        .bg-cloud-pattern {
          background-image: radial-gradient(circle at 20% 80%, white 2px, transparent 2px),
                          radial-gradient(circle at 80% 20%, white 2px, transparent 2px),
                          radial-gradient(circle at 40% 40%, white 1px, transparent 1px);
          background-size: 100px 100px, 80px 80px, 120px 120px;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: linear-gradient(to bottom, #e0f2fe, #e1f5fe);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #2196f3, #1976d2);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #1976d2, #1565c0);
        }
      `}</style>
    </div>
  );
}