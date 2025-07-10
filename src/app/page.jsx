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

const certs = [
  {
    title: "TypeScript Smart Contract 101",
    institution: "Dacade",
    description: "Create a unique and well-coded canister for the Internet Computer Protocol using TypeScript"
  },
  {
    title: "Sui DeFi Development",
    institution: "Dacade",
    description: "Develop decentralized finance applications on the Sui blockchain using Move programming language."
  },
  {
    title: "Accelerating CUDA C++ Applications with Concurrent Streams",
    institution: "NVIDIA",
    description: "Optimize CUDA C++ applications using concurrent streams for improved performance and efficiency."
  },
]

const education = [
  {
    degree: "Bachelor of Computer Science",
    major: "Information System",
    institution: "Universitas Indonesia",
    period: "2022 - Present",
    location: "Depok, Indonesia",
    relevant_courses: courses,
    activities: [
      "Teaching Assistant for Database Course",
      "Academic Staff at BETIS Fasilkom UI",
      "Active in programming competitions and hackathons"
    ]
  }
]

const workExperience = [
  {
    title: "Teaching Assistant of Database",
    company: "Faculty of Computer Science, Universitas Indonesia",
    type: "Part-time",
    period: "Jul 2024 – Jun 2025",
    location: "Depok, West Java, Indonesia",
    description: "Assisting students with database concepts, SQL queries, and database design. Conducting lab sessions and grading assignments."
  },
  {
    title: "Staff Akademis dan Pengajar",
    company: "BETIS Fasilkom UI",
    type: "Full-time", 
    period: "Dec 2022 – Mar 2023",
    location: "Depok, West Java, Indonesia",
    description: "Teaching programming fundamentals and computer science concepts to new students. Developing course materials and assessments."
  }
]

// Neovim-like File Tree Component
function FileTree({ activeFile, onFileSelect, isOpen, onToggle }) {
  const fileStructure = [
    { name: "📁 ~/.config/nvim", type: "dir", children: [
      { name: "init.lua", type: "file", icon: "🌙" },
      { name: "lua/", type: "dir", children: [
        { name: "plugins.lua", type: "file", icon: "🔌" },
        { name: "keymaps.lua", type: "file", icon: "⌨️" },
      ]},
    ]},
    { name: "📁 ~/portfolio", type: "dir", children: [
      { name: "about.rs", type: "file", icon: "🦀" },
      { name: "projects.md", type: "file", icon: "📝" },
      { name: "education.py", type: "file", icon: "🐍" },
      { name: "blog.sh", type: "file", icon: "💲" },
      { name: "certs.json", type: "file", icon: "📜" },
      { name: "resume.pdf", type: "file", icon: "📄" },
    ]},
    { name: "📁 ~/documents", type: "dir", children: [
      { name: "backup.tar.gz", type: "file", icon: "📦" },
    ]},
  ];

  const renderNode = (node, depth = 0) => {
    const isActive = node.type === 'file' && node.name === activeFile;
    // Add extra indent for files
    const indent = node.type === 'file' ? depth * 2 + 2 : depth * 2;
    return (
      <div key={node.name} style={{ paddingLeft: `${indent * 0.5}rem` }}>
        <div 
          className={`flex items-center gap-1 px-2 py-0.5 text-xs cursor-pointer hover:bg-[#3c3836] transition-colors ${
            isActive ? 'bg-[#504945] text-[#fabd2f]' : 'text-[#a89984]'
          }`}
          onClick={() => {
            if (node.type === 'file') {
              onFileSelect(node.name);
              // Close sidebar on mobile after selection
              if (window.innerWidth < 768) {
                onToggle();
              }
            }
          }}
        >
          <span className="w-4 text-center">
            {node.type === 'dir' ? '📁' : node.icon}
          </span>
          <span className="font-mono text-xs">{node.name.replace(/📁\s/, '')}</span>
        </div>
        {node.children && node.children.map(child => renderNode(child, depth + 1))}
      </div>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onToggle}
        />
      )}
      
      <div className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
        fixed md:relative z-50 md:z-auto
        w-64 md:w-64 bg-[#282828] border-r border-[#3c3836] flex flex-col h-full
      `}>
        <div className="bg-[#3c3836] px-3 py-1 text-[#ebdbb2] text-xs font-mono border-b border-[#504945] flex items-center justify-between">
          <span>EXPLORER</span>
          <div className="flex gap-1">
            <span className="hover:bg-[#504945] px-1 rounded cursor-pointer" title="New File">+</span>
            <span className="hover:bg-[#504945] px-1 rounded cursor-pointer" title="Refresh">⟲</span>
            <span 
              className="hover:bg-[#504945] px-1 rounded cursor-pointer md:hidden" 
              title="Close"
              onClick={onToggle}
            >✕</span>
            <span className="hover:bg-[#504945] px-1 rounded cursor-pointer hidden md:block" title="Collapse">v</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-2">
          {fileStructure.map(node => renderNode(node))}
        </div>
        
        {/* Mini git status */}
        <div className="border-t border-[#504945] p-2 text-xs text-[#928374] font-mono">
          <div className="mb-1">Git Status:</div>
          <div className="text-[#b8bb26]">● 3 changes</div>
          <div className="text-[#fabd2f]">● 1 modified</div>
          <div className="text-[#83a598]">● 2 staged</div>
        </div>
      </div>
    </>
  );
}

// Neovim-like Status Line
function StatusLine({ mode = "NORMAL", file, line = 1, col = 1, fileType = "rust" }) {
  const getModeColor = (mode) => {
    switch(mode) {
      case "INSERT": return "bg-[#b8bb26] text-[#282828]";
      case "VISUAL": return "bg-[#fabd2f] text-[#282828]";
      case "COMMAND": return "bg-[#fb4934] text-[#ebdbb2]";
      default: return "bg-[#83a598] text-[#282828]";
    }
  };

  return (
    <div className="bg-[#3c3836] text-[#ebdbb2] text-xs font-mono flex items-center justify-between px-2 py-1 border-t border-[#504945]">
      <div className="flex items-center gap-2">
        <span className={`px-2 py-1 font-bold ${getModeColor(mode)}`}>
          {mode}
        </span>
        <span className="text-[#a89984]">~/portfolio/</span>
        <span className="text-[#ebdbb2]">{file}</span>
        <span className="text-[#a89984]">[+]</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[#a89984]">utf-8</span>
        <span className="text-[#a89984]">{fileType}</span>
        <span className="text-[#ebdbb2]">{line}:{col}</span>
        <span className="text-[#a89984]">100%</span>
      </div>
    </div>
  );
}

// Neovim-style Rust Code Block
function RustCodeBlock({ mode = "NORMAL" }) {
  const codeLines = [
    'use std::collections::HashMap;',
    '',
    '#[derive(Debug, Clone)]',
    'struct Developer {',
    '    name: String,',
    '    role: String,',
    '    location: String,',
    '    skills: Vec<String>,',
    '    interests: Vec<String>,',
    '}',
    '',
    'impl Developer {',
    '    fn new() -> Self {',
    '        Self {',
    '            name: "Wahyu Ridho Anggoro".to_string(),',
    '            role: "Backend Developer".to_string(),',
    '            location: "Depok, Indonesia".to_string(),',
    '            skills: vec![',
    '                "JavaScript/TypeScript".to_string(),',
    '                "Python".to_string(),',
    '                "Java".to_string(),',
    '                "Dart".to_string(),',
    '                "C/C++".to_string(),',    
    '                "PostgreSQL".to_string(),',
    '                "MongoDB".to_string(),',
    '                "MySQL".to_string(),',
    '                "Django".to_string(),',
    '                "Spring Boot".to_string(),',
    '                "Flutter".to_string(),',
    '                "React.js".to_string(),',
    '                "Next.js".to_string(),',
    '                "Vue.js".to_string(),',
    '                "Tailwind CSS".to_string(),',
    '                "Move".to_string(),',
    '                "Motoko".to_string(),',
    '                "Docker".to_string(),',
    '                "Git".to_string(),',
    '            ],',
    '            interests: vec![',
    '                "Distributed Systems".to_string(),',
    '                "API Design".to_string(),',
    '                "Microservices".to_string(),',
    '                "Blockchain".to_string(),',
    '                "Computer Vision".to_string(),',
    '                "Embedded Systems".to_string(),',
    '                "Cybersecurity".to_string(),',
    '            ],',
    '        }',
    '    }',
    '',
    '    fn contact(&self, contact_type: ContactType) -> &str {',
    '        match contact_type {',
    '            ContactType::Github => "https://github.com/angganion",',
    '            ContactType::LinkedIn => "https://www.linkedin.com/in/wahyu-ridho-anggoro-46b55021a",',
    '            ContactType::Email => "wahyu.ridho@ui.ac.id",',
    '        }',
    '    }',
    '}',
    '',
    '#[derive(Debug)]',
    'enum ContactType {',
    '    Github,',
    '    LinkedIn,',
    '    Email,',
    '}',
    '',
    'fn main() {',
    '    let developer = Developer::new();',
    '    println!("Hello, I\'m {}!", developer.name);',
    '    println!("Role: {}", developer.role);',
    '    println!("Location: {}", developer.location);',
    '}',
  ];

  const highlightLine = (line, lineNum) => {
    if (!line.trim()) return <span>&nbsp;</span>;
    
    // Parse line and return JSX elements instead of HTML strings
    const parseRustSyntax = (text) => {
      const parts = [];
      let remaining = text;
      let key = 0;
      
      // Define patterns with their styles
      const patterns = [
        { regex: /(use|struct|impl|fn|let|match|enum|derive|Debug|Clone|String|Vec|Self|println!|main)\b/, className: "text-[#fb4934]" },
        { regex: /(std|collections|HashMap|Developer|ContactType)\b/, className: "text-[#fabd2f]" },
        { regex: /"([^"]*)"/, className: "text-[#b8bb26]" },
        { regex: /(\/\/.*$)/, className: "text-[#928374]" },
        { regex: /(#\[.*?\])/, className: "text-[#8ec07c]" },
        { regex: /(\w+!)/, className: "text-[#d3869b]" },
        { regex: /(\d+)/, className: "text-[#d3869b]" },
        { regex: /(->|=>|::|\{|\}|\[|\]|\(|\))/, className: "text-[#83a598]" },
      ];
      
      while (remaining) {
        let matched = false;
        
        for (const pattern of patterns) {
          const match = remaining.match(pattern.regex);
          if (match && match.index === 0) {
            // Add the matched part with styling
            parts.push(
              <span key={key++} className={pattern.className}>
                {match[0]}
              </span>
            );
            remaining = remaining.slice(match[0].length);
            matched = true;
            break;
          }
        }
        
        if (!matched) {
          // Add next character without styling
          parts.push(
            <span key={key++} className="text-[#ebdbb2]">
              {remaining[0]}
            </span>
          );
          remaining = remaining.slice(1);
        }
      }
      
      return parts.length > 0 ? parts : [<span key={0} className="text-[#ebdbb2]">{text}</span>];
    };
    
    return <span>{parseRustSyntax(line)}</span>;
  };

  return (
    <div className="bg-[#282828] rounded-lg overflow-hidden border border-[#3c3836]">
      {/* File tab */}
      <div className="bg-[#3c3836] px-2 md:px-4 py-2 border-b border-[#504945]">
        <div className="flex items-center gap-2">
          <span className="text-[#fb4934]">●</span>
          <span className="text-[#ebdbb2] text-xs md:text-sm font-mono">🦀 about.rs</span>
          <span className="text-[#928374] text-xs">[+]</span>
        </div>
      </div>
      
      {/* Code content */}
      <pre className="bg-[#282828] text-[#ebdbb2] p-2 md:p-4 text-xs md:text-sm overflow-x-auto font-mono relative">
              <code className="flex">
          {/* Git signs gutter */}
          <div className="pr-1 select-none text-[#928374] min-w-[0.75rem] md:min-w-[1rem] text-center">
            {codeLines.map((_, i) => (
              <div key={i} className="leading-4 md:leading-5">
                {i === 2 ? <span className="text-[#b8bb26]">+</span> : 
                 i === 15 ? <span className="text-[#fabd2f]">~</span> :
                 i === 30 ? <span className="text-[#83a598]">+</span> : ''}
              </div>
            ))}
          </div>
          
          {/* Line numbers */}
          <div className="pr-2 md:pr-4 select-none text-right text-[#928374] min-w-[2rem] md:min-w-[3rem]">
          {codeLines.map((_, i) => (
              <div key={i} className={`leading-4 md:leading-5 ${i === 14 ? 'text-[#ebdbb2] font-bold' : ''}`}>
                {i + 1}
              </div>
          ))}
        </div>
          
          {/* Code content */}
          <div className="flex-1 relative">
          {codeLines.map((line, i) => (
              <div key={i} className={`leading-4 md:leading-5 relative ${
                i === 14 ? 'bg-[#3c3836]' : ''
              }`}>
                {highlightLine(line, i + 1)}
                
            </div>
          ))}
        </div>
          
          
      </code>
    </pre>
    </div>
  );
}

// Neovim-style Lua Code Block for init.lua
function LuaCodeBlock({ mode = "NORMAL" }) {
  const codeLines = [
    '-- Neovim configuration file',
    '-- Author: Wahyu Ridho Anggoro',
    '',
    '-- Bootstrap lazy.nvim',
    'local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"',
    'if not vim.loop.fs_stat(lazypath) then',
    '  vim.fn.system({',
    '    "git",',
    '    "clone",',
    '    "--filter=blob:none",',
    '    "https://github.com/folke/lazy.nvim.git",',
    '    "--branch=stable",',
    '    lazypath,',
    '  })',
    'end',
    'vim.opt.rtp:prepend(lazypath)',
    '',
    '-- Set leader key',
    'vim.g.mapleader = " "',
    'vim.g.maplocalleader = " "',
    '',
    '-- Load plugins',
    'require("lazy").setup("plugins")',
    '',
    '-- Load keymaps',
    'require("keymaps")',
    '',
    '-- Basic settings',
    'vim.opt.number = true',
    'vim.opt.relativenumber = true',
    'vim.opt.mouse = "a"',
    'vim.opt.ignorecase = true',
    'vim.opt.smartcase = true',
    'vim.opt.hlsearch = false',
    'vim.opt.wrap = true',
    'vim.opt.breakindent = true',
    'vim.opt.tabstop = 2',
    'vim.opt.shiftwidth = 2',
    'vim.opt.expandtab = true',
    '',
    '-- Colorscheme',
    'vim.cmd.colorscheme "gruvbox"',
  ];

  const highlightLine = (line, lineNum) => {
    if (!line.trim()) return <span>&nbsp;</span>;
    
    const parseLuaSyntax = (text) => {
      const parts = [];
      let remaining = text;
      let key = 0;
      
      const patterns = [
        { regex: /(--.*$)/, className: "text-[#928374]" },
        { regex: /(local|function|if|then|else|end|require|vim\.opt|vim\.cmd|vim\.g|vim\.fn)\b/, className: "text-[#fb4934]" },
        { regex: /(stdpath|fs_stat|system|clone|setup|colorscheme)\b/, className: "text-[#fabd2f]" },
        { regex: /"([^"]*)"/, className: "text-[#b8bb26]" },
        { regex: /(\d+)/, className: "text-[#d3869b]" },
        { regex: /(true|false)/, className: "text-[#83a598]" },
        { regex: /(\.|\(|\)|\[|\]|\{|\})/, className: "text-[#83a598]" },
      ];
      
      while (remaining) {
        let matched = false;
        
        for (const pattern of patterns) {
          const match = remaining.match(pattern.regex);
          if (match && match.index === 0) {
            parts.push(
              <span key={key++} className={pattern.className}>
                {match[0]}
              </span>
            );
            remaining = remaining.slice(match[0].length);
            matched = true;
            break;
          }
        }
        
        if (!matched) {
          parts.push(
            <span key={key++} className="text-[#ebdbb2]">
              {remaining[0]}
            </span>
          );
          remaining = remaining.slice(1);
        }
      }
      
      return parts.length > 0 ? parts : [<span key={0} className="text-[#ebdbb2]">{text}</span>];
    };
    
    return <span>{parseLuaSyntax(line)}</span>;
  };

  return (
    <div className="bg-[#282828] rounded-lg overflow-hidden border border-[#3c3836]">
      <div className="bg-[#3c3836] px-2 md:px-4 py-2 border-b border-[#504945]">
        <div className="flex items-center gap-2">
          <span className="text-[#fb4934]">●</span>
          <span className="text-[#ebdbb2] text-xs md:text-sm font-mono">🌙 init.lua</span>
          <span className="text-[#928374] text-xs">[+]</span>
        </div>
      </div>
      
      <pre className="bg-[#282828] text-[#ebdbb2] p-2 md:p-4 text-xs md:text-sm overflow-x-auto font-mono relative">
        <code className="flex">
          <div className="pr-1 select-none text-[#928374] min-w-[0.75rem] md:min-w-[1rem] text-center">
            {codeLines.map((_, i) => (
              <div key={i} className="leading-4 md:leading-5">
                {i === 0 ? <span className="text-[#b8bb26]">+</span> : 
                 i === 15 ? <span className="text-[#fabd2f]">~</span> :
                 i === 30 ? <span className="text-[#83a598]">+</span> : ''}
              </div>
            ))}
          </div>
          
          <div className="pr-2 md:pr-4 select-none text-right text-[#928374] min-w-[2rem] md:min-w-[3rem]">
            {codeLines.map((_, i) => (
              <div key={i} className="leading-4 md:leading-5">{i + 1}</div>
            ))}
          </div>
          
          <div className="flex-1 relative">
            {codeLines.map((line, i) => (
              <div key={i} className="leading-4 md:leading-5 relative">
                {highlightLine(line, i + 1)}
              </div>
            ))}
          </div>
        </code>
      </pre>
    </div>
  );
}

// Neovim-style Lua Code Block for plugins.lua
function PluginsCodeBlock({ mode = "NORMAL" }) {
  const codeLines = [
    'return {',
    '  -- Colorscheme',
    '  {',
    '    "ellisonleao/gruvbox.nvim",',
    '    priority = 1000,',
    '    config = function()',
    '      vim.cmd.colorscheme "gruvbox"',
    '    end,',
    '  },',
    '',
    '  -- LSP',
    '  {',
    '    "neovim/nvim-lspconfig",',
    '    dependencies = {',
    '      "hrsh7th/nvim-cmp",',
    '      "hrsh7th/cmp-nvim-lsp",',
    '      "L3MON4D3/LuaSnip",',
    '    },',
    '  },',
    '',
    '  -- Treesitter',
    '  {',
    '    "nvim-treesitter/nvim-treesitter",',
    '    build = ":TSUpdate",',
    '    config = function()',
    '      require("nvim-treesitter.configs").setup {',
    '        ensure_installed = {',
    '          "lua", "vim", "vimdoc",',
    '          "javascript", "typescript",',
    '          "python", "rust", "go",',
    '          "html", "css", "json",',
    '        },',
    '        highlight = { enable = true },',
    '        indent = { enable = true },',
    '      }',
    '    end,',
    '  },',
    '',
    '  -- Telescope',
    '  {',
    '    "nvim-telescope/telescope.nvim",',
    '    dependencies = { "nvim-lua/plenary.nvim" },',
    '  },',
    '',
    '  -- Git',
    '  {',
    '    "lewis6991/gitsigns.nvim",',
    '    config = function()',
    '      require("gitsigns").setup()',
    '    end,',
    '  },',
    '',
    '  -- Status line',
    '  {',
    '    "nvim-lualine/lualine.nvim",',
    '    dependencies = { "nvim-tree/nvim-web-devicons" },',
    '    config = function()',
    '      require("lualine").setup {',
    '        options = {',
    '          theme = "gruvbox",',
    '        },',
    '      }',
    '    end,',
    '  },',
    '}',
  ];

  const highlightLine = (line, lineNum) => {
    if (!line.trim()) return <span>&nbsp;</span>;
    
    const parseLuaSyntax = (text) => {
      const parts = [];
      let remaining = text;
      let key = 0;
      
      const patterns = [
        { regex: /(--.*$)/, className: "text-[#928374]" },
        { regex: /(return|function|end|require|setup)\b/, className: "text-[#fb4934]" },
        { regex: /(priority|dependencies|config|build|ensure_installed|highlight|indent|enable|theme)\b/, className: "text-[#fabd2f]" },
        { regex: /"([^"]*)"/, className: "text-[#b8bb26]" },
        { regex: /(\d+)/, className: "text-[#d3869b]" },
        { regex: /(true|false)/, className: "text-[#83a598]" },
        { regex: /(\{|\}|\[|\]|\(|\)|,)/, className: "text-[#83a598]" },
      ];
      
      while (remaining) {
        let matched = false;
        
        for (const pattern of patterns) {
          const match = remaining.match(pattern.regex);
          if (match && match.index === 0) {
            parts.push(
              <span key={key++} className={pattern.className}>
                {match[0]}
              </span>
            );
            remaining = remaining.slice(match[0].length);
            matched = true;
            break;
          }
        }
        
        if (!matched) {
          parts.push(
            <span key={key++} className="text-[#ebdbb2]">
              {remaining[0]}
            </span>
          );
          remaining = remaining.slice(1);
        }
      }
      
      return parts.length > 0 ? parts : [<span key={0} className="text-[#ebdbb2]">{text}</span>];
    };
    
    return <span>{parseLuaSyntax(line)}</span>;
  };

  return (
    <div className="bg-[#282828] rounded-lg overflow-hidden border border-[#3c3836]">
      <div className="bg-[#3c3836] px-2 md:px-4 py-2 border-b border-[#504945]">
        <div className="flex items-center gap-2">
          <span className="text-[#fb4934]">●</span>
          <span className="text-[#ebdbb2] text-xs md:text-sm font-mono">🔌 plugins.lua</span>
          <span className="text-[#928374] text-xs">[+]</span>
        </div>
      </div>
      
      <pre className="bg-[#282828] text-[#ebdbb2] p-2 md:p-4 text-xs md:text-sm overflow-x-auto font-mono relative">
        <code className="flex">
          <div className="pr-1 select-none text-[#928374] min-w-[0.75rem] md:min-w-[1rem] text-center">
            {codeLines.map((_, i) => (
              <div key={i} className="leading-4 md:leading-5">
                {i === 0 ? <span className="text-[#b8bb26]">+</span> : 
                 i === 20 ? <span className="text-[#fabd2f]">~</span> :
                 i === 40 ? <span className="text-[#83a598]">+</span> : ''}
              </div>
            ))}
          </div>
          
          <div className="pr-2 md:pr-4 select-none text-right text-[#928374] min-w-[2rem] md:min-w-[3rem]">
            {codeLines.map((_, i) => (
              <div key={i} className="leading-4 md:leading-5">{i + 1}</div>
            ))}
          </div>
          
          <div className="flex-1 relative">
            {codeLines.map((line, i) => (
              <div key={i} className="leading-4 md:leading-5 relative">
                {highlightLine(line, i + 1)}
              </div>
            ))}
          </div>
        </code>
      </pre>
    </div>
  );
}

// Neovim-style Lua Code Block for keymaps.lua
function KeymapsCodeBlock({ mode = "NORMAL" }) {
  const codeLines = [
    '-- Keymaps for Neovim',
    '-- Author: Wahyu Ridho Anggoro',
    '',
    'local map = vim.keymap.set',
    'local opts = { noremap = true, silent = true }',
    '',
    '-- General keymaps',
    'map("n", "<leader>w", "<cmd>w<cr>", opts)',
    'map("n", "<leader>q", "<cmd>q<cr>", opts)',
    'map("n", "<leader>Q", "<cmd>qa!<cr>", opts)',
    '',
    '-- Window management',
    'map("n", "<leader>sv", "<cmd>vsplit<cr>", opts)',
    'map("n", "<leader>sh", "<cmd>split<cr>", opts)',
    'map("n", "<leader>se", "<cmd>Ex<cr>", opts)',
    '',
    '-- Buffer navigation',
    'map("n", "<leader>bn", "<cmd>bnext<cr>", opts)',
    'map("n", "<leader>bp", "<cmd>bprev<cr>", opts)',
    'map("n", "<leader>bd", "<cmd>bd<cr>", opts)',
    '',
    '-- Telescope',
    'map("n", "<leader>ff", "<cmd>Telescope find_files<cr>", opts)',
    'map("n", "<leader>fg", "<cmd>Telescope live_grep<cr>", opts)',
    'map("n", "<leader>fb", "<cmd>Telescope buffers<cr>", opts)',
    'map("n", "<leader>fh", "<cmd>Telescope help_tags<cr>", opts)',
    '',
    '-- LSP',
    'map("n", "gd", "<cmd>lua vim.lsp.buf.definition()<cr>", opts)',
    'map("n", "gr", "<cmd>lua vim.lsp.buf.references()<cr>", opts)',
    'map("n", "K", "<cmd>lua vim.lsp.buf.hover()<cr>", opts)',
    'map("n", "<leader>ca", "<cmd>lua vim.lsp.buf.code_action()<cr>", opts)',
    'map("n", "<leader>rn", "<cmd>lua vim.lsp.buf.rename()<cr>", opts)',
    '',
    '-- Git',
    'map("n", "<leader>gs", "<cmd>Gitsigns preview_hunk<cr>", opts)',
    'map("n", "<leader>gb", "<cmd>Gitsigns toggle_current_line_blame<cr>", opts)',
    '',
    '-- Terminal',
    'map("n", "<leader>tt", "<cmd>terminal<cr>", opts)',
    'map("t", "<esc>", "<cmd>stopinsert<cr>", opts)',
    '',
    '-- Custom functions',
    'map("n", "<leader>cd", function()',
    '  vim.cmd("cd " .. vim.fn.expand("%:p:h"))',
    '  vim.notify("Changed directory to " .. vim.fn.getcwd())',
    'end, opts)',
  ];

  const highlightLine = (line, lineNum) => {
    if (!line.trim()) return <span>&nbsp;</span>;
    
    const parseLuaSyntax = (text) => {
      const parts = [];
      let remaining = text;
      let key = 0;
      
      const patterns = [
        { regex: /(--.*$)/, className: "text-[#928374]" },
        { regex: /(local|function|end|map|vim\.keymap\.set|vim\.lsp\.buf|vim\.cmd|vim\.fn|vim\.notify)\b/, className: "text-[#fb4934]" },
        { regex: /(noremap|silent|n|t|leader|cmd|cr|opts)\b/, className: "text-[#fabd2f]" },
        { regex: /"([^"]*)"/, className: "text-[#b8bb26]" },
        { regex: /(\d+)/, className: "text-[#d3869b]" },
        { regex: /(true|false)/, className: "text-[#83a598]" },
        { regex: /(<|>|\(|\)|,)/, className: "text-[#83a598]" },
      ];
      
      while (remaining) {
        let matched = false;
        
        for (const pattern of patterns) {
          const match = remaining.match(pattern.regex);
          if (match && match.index === 0) {
            parts.push(
              <span key={key++} className={pattern.className}>
                {match[0]}
              </span>
            );
            remaining = remaining.slice(match[0].length);
            matched = true;
            break;
          }
        }
        
        if (!matched) {
          parts.push(
            <span key={key++} className="text-[#ebdbb2]">
              {remaining[0]}
            </span>
          );
          remaining = remaining.slice(1);
        }
      }
      
      return parts.length > 0 ? parts : [<span key={0} className="text-[#ebdbb2]">{text}</span>];
    };
    
    return <span>{parseLuaSyntax(line)}</span>;
  };

  return (
    <div className="bg-[#282828] rounded-lg overflow-hidden border border-[#3c3836]">
      <div className="bg-[#3c3836] px-2 md:px-4 py-2 border-b border-[#504945]">
        <div className="flex items-center gap-2">
          <span className="text-[#fb4934]">●</span>
          <span className="text-[#ebdbb2] text-xs md:text-sm font-mono">⌨️ keymaps.lua</span>
          <span className="text-[#928374] text-xs">[+]</span>
        </div>
      </div>
      
      <pre className="bg-[#282828] text-[#ebdbb2] p-2 md:p-4 text-xs md:text-sm overflow-x-auto font-mono relative">
        <code className="flex">
          <div className="pr-1 select-none text-[#928374] min-w-[0.75rem] md:min-w-[1rem] text-center">
            {codeLines.map((_, i) => (
              <div key={i} className="leading-4 md:leading-5">
                {i === 0 ? <span className="text-[#b8bb26]">+</span> : 
                 i === 15 ? <span className="text-[#fabd2f]">~</span> :
                 i === 30 ? <span className="text-[#83a598]">+</span> : ''}
              </div>
            ))}
          </div>
          
          <div className="pr-2 md:pr-4 select-none text-right text-[#928374] min-w-[2rem] md:min-w-[3rem]">
            {codeLines.map((_, i) => (
              <div key={i} className="leading-4 md:leading-5">{i + 1}</div>
            ))}
          </div>
          
          <div className="flex-1 relative">
            {codeLines.map((line, i) => (
              <div key={i} className="leading-4 md:leading-5 relative">
                {highlightLine(line, i + 1)}
              </div>
            ))}
          </div>
        </code>
      </pre>
    </div>
  );
}

// Terminal-style backup file viewer
function BackupFileViewer({ mode = "NORMAL" }) {
  const backupContent = [
    'angga@ubuntu-wsl:~/documents$ tar -tvf backup.tar.gz',
    'drwxr-xr-x angga/angga         0 2024-12-30 10:30 portfolio_backup/',
    'drwxr-xr-x angga/angga         0 2024-12-30 10:30 portfolio_backup/src/',
    'drwxr-xr-x angga/angga         0 2024-12-30 10:30 portfolio_backup/src/app/',
    '-rw-r--r-- angga/angga      1078 2024-12-30 10:30 portfolio_backup/src/app/page.jsx',
    'drwxr-xr-x angga/angga         0 2024-12-30 10:30 portfolio_backup/public/',
    '-rw-r--r-- angga/angga      1234 2024-12-30 10:30 portfolio_backup/public/resume.pdf',
    'drwxr-xr-x angga/angga         0 2024-12-30 10:30 portfolio_backup/.git/',
    '-rw-r--r-- angga/angga       567 2024-12-30 10:30 portfolio_backup/package.json',
    '-rw-r--r-- angga/angga       890 2024-12-30 10:30 portfolio_backup/README.md',
    '',
    'angga@ubuntu-wsl:~/documents$ ls -la backup.tar.gz',
    '-rw-r--r-- 1 angga angga 2048576 Dec 30 10:30 backup.tar.gz',
    '',
    'angga@ubuntu-wsl:~/documents$ file backup.tar.gz',
    'backup.tar.gz: gzip compressed data, from Unix, last modified: Dec 30 10:30:00 2024',
    '',
    'angga@ubuntu-wsl:~/documents$ md5sum backup.tar.gz',
    'a1b2c3d4e5f678901234567890123456  backup.tar.gz',
    '',
    'angga@ubuntu-wsl:~/documents$ du -h backup.tar.gz',
    '2.0M    backup.tar.gz',
    '',
    'angga@ubuntu-wsl:~/documents$ tar -tzf backup.tar.gz | head -10',
    'portfolio_backup/',
    'portfolio_backup/src/',
    'portfolio_backup/src/app/',
    'portfolio_backup/src/app/page.jsx',
    'portfolio_backup/public/',
    'portfolio_backup/public/resume.pdf',
    'portfolio_backup/.git/',
    'portfolio_backup/package.json',
  ];

  return (
    <div className="bg-[#282828] rounded-lg overflow-hidden border border-[#3c3836]">
      <div className="bg-[#3c3836] px-2 md:px-4 py-2 border-b border-[#504945]">
        <div className="flex items-center gap-2">
          <span className="text-[#fb4934]">●</span>
          <span className="text-[#ebdbb2] text-xs md:text-sm font-mono">📦 backup.tar.gz</span>
          <span className="text-[#928374] text-xs">[ARCHIVE]</span>
        </div>
      </div>
      
      <div className="bg-[#282828] text-[#ebdbb2] p-2 md:p-4 text-xs md:text-sm font-mono">
        {backupContent.map((line, i) => (
          <div key={i} className="leading-4 md:leading-5">
            {line.includes('$') ? (
              <span>
                <span className="text-[#b8bb26]">{line.split('$')[0]}</span>
                <span className="text-[#ebdbb2]">$</span>
                <span className="text-[#83a598]">{line.split('$')[1]}</span>
              </span>
            ) : line.includes('drwx') || line.includes('-rw-') ? (
              <span>
                <span className="text-[#83a598]">{line.split(' ')[0]}</span>
                <span className="text-[#ebdbb2]"> {line.split(' ').slice(1).join(' ')}</span>
              </span>
            ) : line.includes('backup.tar.gz') ? (
              <span>
                <span className="text-[#fabd2f]">{line}</span>
              </span>
            ) : (
              <span className="text-[#a89984]">{line}</span>
            )}
          </div>
        ))}
        
        <div className="mt-4">
          <span className="text-[#b8bb26]">angga@ubuntu-wsl</span>
          <span className="text-[#ebdbb2]">:</span>
          <span className="text-[#83a598]">~/documents</span>
          <span className="text-[#ebdbb2]">$ </span>
          <span className="text-[#ebdbb2] animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  // Add viewport meta tag for mobile responsiveness
  React.useEffect(() => {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(meta);
    }
  }, []);
  const [tab, setTab] = useState("about");
  const [mode, setMode] = useState("NORMAL");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [commandLine, setCommandLine] = useState("");
  const [showCommandLine, setShowCommandLine] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // Close sidebar on window resize if mobile
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Neovim keyboard shortcuts simulation
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === ':' && mode === "NORMAL") {
        e.preventDefault();
        setShowCommandLine(true);
        setMode("COMMAND");
      } else if (e.key === 'Escape') {
        setShowCommandLine(false);
        setMode("NORMAL");
        setCommandLine("");
      } else if (e.key === 'i' && mode === "NORMAL") {
        setMode("INSERT");
      } else if (e.key === 'v' && mode === "NORMAL") {
        setMode("VISUAL");
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [mode]);

  const getFileFromTab = (tabName) => {
    const fileMap = {
      "about": "about.rs",
      "projects": "projects.md",
      "education": "education.py", 
      "blog": "blog.sh",
      "certs": "certs.json",
      "resume": "resume.pdf",
      "init.lua": "init.lua",
      "plugins.lua": "plugins.lua",
      "keymaps.lua": "keymaps.lua",
      "backup.tar.gz": "backup.tar.gz"
    };
    return fileMap[tabName] || "about.rs";
  };

  return (
    <div className="h-screen bg-[#282828] text-[#ebdbb2] font-mono flex flex-col">
      {/* Top bar with working directory - FIXED TIDAK SCROLL */}
      <div className="bg-[#3c3836] border-b border-[#504945] px-2 md:px-4 py-2 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Hamburger menu for mobile */}
            <button
              className="md:hidden text-[#ebdbb2] hover:text-[#fabd2f] transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-[#b8bb26] font-bold text-sm md:text-base">NVIM v0.9.5</span>
            <span className="text-[#928374] hidden sm:inline">~/portfolio</span>
            <span className="text-[#a89984] text-xs md:text-sm hidden md:inline">angga@ubuntu-wsl</span>
            <span className="text-[#928374] text-xs hidden lg:inline">
              [{isClient ? currentTime.toLocaleTimeString() : '00:00:00'}]
            </span>
          </div>
          <div className="flex items-center gap-1 md:gap-2 text-xs text-[#928374]">
            <span className="hidden sm:inline">⚡ WSL2</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden md:inline">🦀 rust 1.75.0</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden sm:inline">git main</span>
            <span className="hidden sm:inline">|</span>
            <span className={`text-xs md:text-sm ${mode === "NORMAL" ? "text-[#83a598]" : mode === "INSERT" ? "text-[#b8bb26]" : mode === "VISUAL" ? "text-[#fabd2f]" : "text-[#fb4934]"}`}>
              {mode}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* File Explorer */}
        <FileTree 
          activeFile={getFileFromTab(tab)} 
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onFileSelect={(file) => {
            if (file === "about.rs") setTab("about");
            else if (file === "projects.md") setTab("projects");
            else if (file === "education.py") setTab("education");
            else if (file === "blog.sh") setTab("blog");
            else if (file === "certs.json") setTab("certs");
            else if (file === "resume.pdf") setTab("resume");
            else if (file === "init.lua") setTab("init.lua");
            else if (file === "plugins.lua") setTab("plugins.lua");
            else if (file === "keymaps.lua") setTab("keymaps.lua");
            else if (file === "backup.tar.gz") setTab("backup.tar.gz");
          }} 
        />

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden w-full md:w-auto">
          {/* Buffer tabs - FIXED TIDAK SCROLL */}
          <div className="bg-[#3c3836] border-b border-[#504945] flex flex-shrink-0 overflow-x-auto">
            {["about", "projects", "education", "blog", "certs", "resume", "init.lua", "plugins.lua", "keymaps.lua", "backup.tar.gz"].map((tabName) => {
              const isActive = tab === tabName;
              const fileName = getFileFromTab(tabName);
              const getIcon = (name) => {
                if (name.includes('.rs')) return '🦀';
                if (name.includes('.md')) return '📝';
                if (name.includes('.py')) return '🐍';
                if (name.includes('.sh')) return '💲';
                if (name.includes('.json')) return '📜';
                if (name.includes('.lua')) return '🌙';
                if (name.includes('.tar.gz')) return '📦';
                return '📄';
              };
              
              return (
                <button
                  key={tabName}
                  className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 text-xs font-mono border-r border-[#504945] transition-colors whitespace-nowrap ${
                    isActive 
                      ? "bg-[#282828] text-[#ebdbb2]" 
                      : "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#504945]"
                  }`}
                  onClick={() => setTab(tabName)}
                >
                  <span>{getIcon(fileName)}</span>
                  <span className="hidden sm:inline">{fileName}</span>
                  <span className="sm:hidden">{tabName}</span>
                  {isActive && <span className="text-[#fb4934]">●</span>}
                </button>
              );
            })}
          </div>

          {/* Content area - HANYA INI YANG SCROLL */}
          <div className="flex-1 bg-[#282828] p-2 md:p-4 overflow-y-auto">
            {tab === "about" && <RustCodeBlock mode={mode} />}
            {tab === "init.lua" && <LuaCodeBlock mode={mode} />}
            {tab === "plugins.lua" && <PluginsCodeBlock mode={mode} />}
            {tab === "keymaps.lua" && <KeymapsCodeBlock mode={mode} />}
            {tab === "backup.tar.gz" && <BackupFileViewer mode={mode} />}
            
            {tab === "education" && (
              <div className="space-y-6">
                {/* Python-style Education File */}
                <div className="bg-[#282828] rounded-lg overflow-hidden border border-[#3c3836]">
                  <div className="bg-[#3c3836] px-4 py-2 border-b border-[#504945]">
                    <div className="flex items-center gap-2">
                      <span className="text-[#fb4934]">●</span>
                      <span className="text-[#ebdbb2] text-sm font-mono">🐍 education.py</span>
                      <span className="text-[#928374] text-xs">[+]</span>
                    </div>
                  </div>
                  
                  <pre className="bg-[#282828] text-[#ebdbb2] p-2 md:p-4 text-xs md:text-sm overflow-x-auto font-mono">
                    <code className="flex">
                      <div className="pr-2 md:pr-4 select-none text-right text-[#928374] min-w-[2rem] md:min-w-[3rem]">
                        {Array.from({length: 38}, (_, i) => (
                          <div key={i} className="leading-4 md:leading-5">{i + 1}</div>
                        ))}
                      </div>
                      <div className="flex-1">
                        <div className="leading-4 md:leading-5"><span className="text-[#928374]"># -*- coding: utf-8 -*-</span></div>
                        <div className="leading-4 md:leading-5"><span className="text-[#fb4934]">from</span> <span className="text-[#fabd2f]">datetime</span> <span className="text-[#fb4934]">import</span> <span className="text-[#ebdbb2]">datetime</span></div>
                        <div className="leading-4 md:leading-5"><span className="text-[#fb4934]">from</span> <span className="text-[#fabd2f]">typing</span> <span className="text-[#fb4934]">import</span> <span className="text-[#83a598]">List</span>, <span className="text-[#83a598]">Dict</span></div>
                        <div className="leading-4 md:leading-5">&nbsp;</div>
                        <div className="leading-4 md:leading-5"><span className="text-[#fb4934]">class</span> <span className="text-[#fabd2f]">Education</span>:</div>
                        <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">    </span><span className="text-[#fb4934]">def</span> <span className="text-[#83a598]">__init__</span>(<span className="text-[#ebdbb2]">self</span>):</div>
                                                 <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">        self.degree = </span><span className="text-[#b8bb26]">"Bachelor of Computer Science"</span></div>
                         <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">        self.major = </span><span className="text-[#b8bb26]">"Information System"</span></div>
                         <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">        self.institution = </span><span className="text-[#b8bb26]">"Universitas Indonesia"</span></div>
                         <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">        self.period = </span><span className="text-[#b8bb26]">"2022 - Present"</span></div>
                         <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">        self.location = </span><span className="text-[#b8bb26]">"Depok, Indonesia"</span></div>
                        <div className="leading-4 md:leading-5">&nbsp;</div>
                                                 <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">    </span><span className="text-[#fb4934]">def</span> <span className="text-[#83a598]">get_relevant_courses</span>(<span className="text-[#ebdbb2]">self</span>) -&gt; <span className="text-[#83a598]">List</span>[<span className="text-[#83a598]">str</span>]:</div>
                        <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">        </span><span className="text-[#fb4934]">return</span> [</div>
                        <div className="leading-4 md:leading-5"><span className="text-[#b8bb26]">            "Pemrograman Berbasis Platform (PBP)",</span></div>
                        <div className="leading-4 md:leading-5"><span className="text-[#b8bb26]">            "Struktur Data dan Algoritma",</span></div>
                        <div className="leading-4 md:leading-5"><span className="text-[#b8bb26]">            "Basis Data (Database)",</span></div>
                        <div className="leading-4 md:leading-5"><span className="text-[#b8bb26]">            "Computer Vision",</span></div>
                        <div className="leading-4 md:leading-5"><span className="text-[#b8bb26]">            "Embedded Systems",</span></div>
                        <div className="leading-4 md:leading-5"><span className="text-[#b8bb26]">            "Robotika",</span></div>
                        <div className="leading-4 md:leading-5"><span className="text-[#b8bb26]">            "Ethical Hacking",</span></div>
                        <div className="leading-4 md:leading-5"><span className="text-[#b8bb26]">            "Arsitektur dan Pemrograman Aplikasi Perusahaan"</span></div>
                        <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">        ]</span></div>
                        <div className="leading-4 md:leading-5">&nbsp;</div>
                                                 <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">    </span><span className="text-[#fb4934]">def</span> <span className="text-[#83a598]">get_activities</span>(<span className="text-[#ebdbb2]">self</span>) -&gt; <span className="text-[#83a598]">List</span>[<span className="text-[#83a598]">str</span>]:</div>
                        <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">        </span><span className="text-[#fb4934]">return</span> [</div>
                        <div className="leading-4 md:leading-5"><span className="text-[#b8bb26]">            "Teaching Assistant for Database Course",</span></div>
                        <div className="leading-4 md:leading-5"><span className="text-[#b8bb26]">            "Academic Staff at BETIS Fasilkom UI",</span></div>
                        <div className="leading-4 md:leading-5"><span className="text-[#b8bb26]">            "Active in programming competitions and hackathons"</span></div>
                        <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">        ]</span></div>
                        <div className="leading-4 md:leading-5">&nbsp;</div>
                                                                          <div className="leading-4 md:leading-5"><span className="text-[#928374]"># Create instance and display info</span></div>
                         <div className="leading-4 md:leading-5"><span className="text-[#fb4934]">if</span> <span className="text-[#ebdbb2]">__name__ == </span><span className="text-[#b8bb26]">"__main__"</span>:</div>
                         <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">    student = Education()</span></div>
                          <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">    </span><span className="text-[#83a598]">print</span>(<span className="text-[#b8bb26]">"Currently pursuing", student.degree</span>)</div>
                          <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">    </span><span className="text-[#83a598]">print</span>(<span className="text-[#b8bb26]">"Major:", student.major</span>)</div>
                          <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">    </span><span className="text-[#83a598]">print</span>(<span className="text-[#b8bb26]">"at", student.institution</span>)</div>
                      </div>
                    </code>
                  </pre>
                </div>

                                 
                 {/* Terminal Output */}
                 <div className="bg-[#282828] rounded-lg overflow-hidden border border-[#3c3836]">
                   <div className="bg-[#3c3836] px-4 py-2 border-b border-[#504945]">
                     <div className="flex items-center gap-2">
                       <span className="text-[#fb4934]">●</span>
                       <span className="text-[#ebdbb2] text-sm font-mono">bash</span>
                       <span className="text-[#928374] text-xs">angga@ubuntu-wsl</span>
                     </div>
                   </div>
                   
                   <div className="bg-[#282828] text-[#ebdbb2] p-2 md:p-4 text-xs md:text-sm font-mono">
                     {/* Command prompt */}
                     <div className="mb-4">
                       <span className="text-[#b8bb26]">angga@ubuntu-wsl</span>
                       <span className="text-[#ebdbb2]">:</span>
                       <span className="text-[#83a598]">~/portfolio</span>
                       <span className="text-[#ebdbb2]">$ </span>
                       <span className="text-[#ebdbb2]">python education.py</span>
                     </div>
                     
                     {/* Python output */}
                     <div className="space-y-1 mb-4">
                       <div><span className="text-[#ebdbb2]">Currently pursuing Bachelor of Computer Science</span></div>
                       <div><span className="text-[#ebdbb2]">Major: Information System</span></div>
                       <div><span className="text-[#ebdbb2]">at Universitas Indonesia</span></div>
                     </div>
                     
                     {/* Separator */}
                     <div className="border-t border-[#504945] my-4"></div>
                     
                     {/* Work Experience as terminal output */}
                     <div className="mb-4">
                       <div className="text-[#ebdbb2] mb-2">
                         <span className="text-[#b8bb26]">angga@ubuntu-wsl</span>
                         <span className="text-[#ebdbb2]">:</span>
                         <span className="text-[#83a598]">~/portfolio</span>
                         <span className="text-[#ebdbb2]">$ </span>
                         <span className="text-[#ebdbb2]">cat work_experience.txt</span>
                       </div>
                       {workExperience.map((work, idx) => (
                         <div key={idx} className="mb-3 text-[#ebdbb2]">
                           <div>{work.title}</div>
                           <div>{work.company}</div>
                           <div>{work.type} | {work.period}</div>
                           <div>{work.location}</div>
                           <div className="text-[#a89984]">{work.description}</div>
                           {idx < workExperience.length - 1 && <div className="my-2">---</div>}
                         </div>
                       ))}
                     </div>
                     
                     {/* Relevant Courses as terminal output */}
                     <div className="mb-4">
                       <div className="text-[#ebdbb2] mb-2">
                         <span className="text-[#b8bb26]">angga@ubuntu-wsl</span>
                         <span className="text-[#ebdbb2]">:</span>
                         <span className="text-[#83a598]">~/portfolio</span>
                         <span className="text-[#ebdbb2]">$ </span>
                         <span className="text-[#ebdbb2]">ls -la courses/</span>
                       </div>
                       <div className="text-[#ebdbb2] mb-2">total {courses.length}</div>
                       {courses.slice(0, 8).map((course, idx) => (
                         <div key={idx} className="text-[#ebdbb2]">
                           <span className="text-[#a89984]">-rw-r--r-- 1 angga angga </span>
                           <span className="text-[#ebdbb2]">{(idx + 1).toString().padStart(4, ' ')} </span>
                           <span className="text-[#a89984]">Dec {(idx + 1).toString().padStart(2, ' ')} 2024 </span>
                           <span className="text-[#83a598]">{course.title.toLowerCase().replace(/\s+/g, '_')}.txt</span>
                         </div>
                       ))}
                       
                       <div className="mt-3 text-[#ebdbb2]">
                         <span className="text-[#b8bb26]">angga@ubuntu-wsl</span>
                         <span className="text-[#ebdbb2]">:</span>
                         <span className="text-[#83a598]">~/portfolio</span>
                         <span className="text-[#ebdbb2]">$ </span>
                         <span className="text-[#ebdbb2]">head -n 1 courses/*.txt</span>
                       </div>
                       
                       {courses.slice(0, 6).map((course, idx) => (
                         <div key={idx} className="text-[#ebdbb2] mt-1">
                           <span className="text-[#fabd2f]">==&gt; courses/{course.title.toLowerCase().replace(/\s+/g, '_')}.txt &lt;==</span>
                           <div className="text-[#a89984] ml-0">{course.description}</div>
                         </div>
                       ))}
                     </div>
                     
                     {/* New command prompt */}
                     <div className="mt-4">
                       <span className="text-[#b8bb26]">angga@ubuntu-wsl</span>
                       <span className="text-[#ebdbb2]">:</span>
                       <span className="text-[#83a598]">~/portfolio</span>
                       <span className="text-[#ebdbb2]">$ </span>
                       <span className="text-[#ebdbb2] animate-pulse">_</span>
                     </div>
          </div>
        </div>
        </div>
          )}
            
          {tab === "projects" && (
              <div className="space-y-4">
                <div className="bg-[#3c3836] rounded-lg p-3 md:p-4 border border-[#504945]">
                  <h3 className="text-[#fabd2f] text-base md:text-lg font-mono mb-2"># Projects</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
              {projects.map((project, idx) => (
                      <div key={idx} className="bg-[#282828] border border-[#504945] rounded-lg p-3 md:p-4">
                        <h4 className="text-[#ebdbb2] font-mono text-sm md:text-base mb-2">## {project.title}</h4>
                        <p className="text-[#a89984] text-xs md:text-sm mb-3">{project.description}</p>
                        <div className="text-xs text-[#8ec07c] bg-[#3c3836] px-2 py-1 rounded mb-3 font-mono overflow-x-auto">
                          {project.tech}
                        </div>
                        <div className="flex flex-wrap gap-2">
                    {project.links.map((link, i) => (
                      <a
                        key={i}
                              className="text-[#83a598] hover:text-[#ebdbb2] border border-[#504945] hover:border-[#83a598] px-2 py-1 rounded text-xs font-mono transition-colors"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                              [{link.label}]
                      </a>
                    ))}
                  </div>
                </div>
              ))}
                  </div>
                </div>
            </div>
          )}
            
          {tab === "blog" && (
              <div className="bg-[#3c3836] rounded-lg p-3 md:p-6 border border-[#504945]">
                <div className="font-mono">
                  <div className="text-[#928374] mb-2 text-xs md:text-sm">#!/bin/bash</div>
                  <div className="text-[#fb4934] mb-2 text-xs md:text-sm"># Blog Status</div>
                  <div className="text-[#ebdbb2] mb-4 text-xs md:text-sm">echo "Coming Soon..."</div>
                  <div className="text-[#928374] mb-2 text-xs md:text-sm"># Personal blog with articles on:</div>
                  <div className="text-[#a89984] mb-2 text-xs md:text-sm"># - Backend Development</div>
                  <div className="text-[#a89984] mb-2 text-xs md:text-sm"># - Distributed Systems</div>
                  <div className="text-[#a89984] mb-4 text-xs md:text-sm"># - System Architecture</div>
                <a
                  href="https://yourblogdomain.com"
                  target="_blank"
                  rel="noopener noreferrer"
                    className="inline-block bg-[#b8bb26] text-[#282828] px-3 md:px-4 py-2 rounded font-mono text-xs md:text-sm hover:bg-[#a89984] transition-colors"
                >
                    [Visit Blog]
                </a>
              </div>
            </div>
          )}
            
          {tab === "certs" && (
            <div className="bg-[#282828] rounded-lg overflow-hidden border border-[#3c3836]">
              <div className="bg-[#3c3836] px-4 py-2 border-b border-[#504945]">
                <div className="flex items-center gap-2">
                  <span className="text-[#fb4934]">●</span>
                  <span className="text-[#ebdbb2] text-sm font-mono">📜 certs.json</span>
                  <span className="text-[#928374] text-xs">[+]</span>
                </div>
              </div>
              
              <pre className="bg-[#282828] text-[#ebdbb2] p-2 md:p-4 text-xs md:text-sm overflow-x-auto font-mono">
                <code className="flex">
                  <div className="pr-2 md:pr-4 select-none text-right text-[#928374] min-w-[2rem] md:min-w-[3rem]">
                    {Array.from({length: 32}, (_, i) => (
                      <div key={i} className="leading-4 md:leading-5">{i + 1}</div>
                    ))}
                  </div>
                  <div className="flex-1">
                    <div className="leading-4 md:leading-5"><span className="text-[#83a598]">&#123;</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">  </span><span className="text-[#8ec07c]">"certifications"</span><span className="text-[#ebdbb2]">: </span><span className="text-[#83a598]">[</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">    </span><span className="text-[#83a598]">&#123;</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">      </span><span className="text-[#8ec07c]">"title"</span><span className="text-[#ebdbb2]">: </span><span className="text-[#b8bb26]">"TypeScript Smart Contract 101"</span><span className="text-[#ebdbb2]">,</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">      </span><span className="text-[#8ec07c]">"institution"</span><span className="text-[#ebdbb2]">: </span><span className="text-[#b8bb26]">"Dacade"</span><span className="text-[#ebdbb2]">,</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">      </span><span className="text-[#8ec07c]">"description"</span><span className="text-[#ebdbb2]">: </span><span className="text-[#b8bb26]">"Create a unique and well-coded canister for the Internet Computer Protocol using TypeScript"</span><span className="text-[#ebdbb2]">,</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">      </span><span className="text-[#8ec07c]">"platform"</span><span className="text-[#ebdbb2]">: </span><span className="text-[#b8bb26]">"Internet Computer"</span><span className="text-[#ebdbb2]">,</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">      </span><span className="text-[#8ec07c]">"technologies"</span><span className="text-[#ebdbb2]">: </span><span className="text-[#83a598]">[</span><span className="text-[#b8bb26]">"TypeScript"</span><span className="text-[#ebdbb2]">, </span><span className="text-[#b8bb26]">"ICP"</span><span className="text-[#ebdbb2]">, </span><span className="text-[#b8bb26]">"Smart Contracts"</span><span className="text-[#83a598]">]</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">    </span><span className="text-[#83a598]">&#125;</span><span className="text-[#ebdbb2]">,</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">    </span><span className="text-[#83a598]">&#123;</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">      </span><span className="text-[#8ec07c]">"title"</span><span className="text-[#ebdbb2]">: </span><span className="text-[#b8bb26]">"Sui DeFi Development"</span><span className="text-[#ebdbb2]">,</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">      </span><span className="text-[#8ec07c]">"institution"</span><span className="text-[#ebdbb2]">: </span><span className="text-[#b8bb26]">"Dacade"</span><span className="text-[#ebdbb2]">,</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">      </span><span className="text-[#8ec07c]">"description"</span><span className="text-[#ebdbb2]">: </span><span className="text-[#b8bb26]">"Develop decentralized finance applications on the Sui blockchain using Move programming language."</span><span className="text-[#ebdbb2]">,</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">      </span><span className="text-[#8ec07c]">"platform"</span><span className="text-[#ebdbb2]">: </span><span className="text-[#b8bb26]">"Sui Blockchain"</span><span className="text-[#ebdbb2]">,</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">      </span><span className="text-[#8ec07c]">"technologies"</span><span className="text-[#ebdbb2]">: </span><span className="text-[#83a598]">[</span><span className="text-[#b8bb26]">"Move"</span><span className="text-[#ebdbb2]">, </span><span className="text-[#b8bb26]">"Sui"</span><span className="text-[#ebdbb2]">, </span><span className="text-[#b8bb26]">"DeFi"</span><span className="text-[#ebdbb2]">, </span><span className="text-[#b8bb26]">"Blockchain"</span><span className="text-[#83a598]">]</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">    </span><span className="text-[#83a598]">&#125;</span><span className="text-[#ebdbb2]">,</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">    </span><span className="text-[#83a598]">&#123;</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">      </span><span className="text-[#8ec07c]">"title"</span><span className="text-[#ebdbb2]">: </span><span className="text-[#b8bb26]">"Accelerating CUDA C++ Applications with Concurrent Streams"</span><span className="text-[#ebdbb2]">,</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">      </span><span className="text-[#8ec07c]">"institution"</span><span className="text-[#ebdbb2]">: </span><span className="text-[#b8bb26]">"NVIDIA"</span><span className="text-[#ebdbb2]">,</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">      </span><span className="text-[#8ec07c]">"description"</span><span className="text-[#ebdbb2]">: </span><span className="text-[#b8bb26]">"Optimize CUDA C++ applications using concurrent streams for improved performance and efficiency."</span><span className="text-[#ebdbb2]">,</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">      </span><span className="text-[#8ec07c]">"platform"</span><span className="text-[#ebdbb2]">: </span><span className="text-[#b8bb26]">"NVIDIA GPU Computing"</span><span className="text-[#ebdbb2]">,</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">      </span><span className="text-[#8ec07c]">"technologies"</span><span className="text-[#ebdbb2]">: </span><span className="text-[#83a598]">[</span><span className="text-[#b8bb26]">"CUDA"</span><span className="text-[#ebdbb2]">, </span><span className="text-[#b8bb26]">"C++"</span><span className="text-[#ebdbb2]">, </span><span className="text-[#b8bb26]">"GPU Computing"</span><span className="text-[#ebdbb2]">, </span><span className="text-[#b8bb26]">"Parallel Programming"</span><span className="text-[#83a598]">]</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">    </span><span className="text-[#83a598]">&#125;</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">  </span><span className="text-[#83a598]">]</span><span className="text-[#ebdbb2]">,</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">  </span><span className="text-[#8ec07c]">"totalCount"</span><span className="text-[#ebdbb2]">: </span><span className="text-[#d3869b]">3</span><span className="text-[#ebdbb2]">,</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">  </span><span className="text-[#8ec07c]">"lastUpdated"</span><span className="text-[#ebdbb2]">: </span><span className="text-[#b8bb26]">"2024-12-30"</span><span className="text-[#ebdbb2]">,</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#ebdbb2]">  </span><span className="text-[#8ec07c]">"categories"</span><span className="text-[#ebdbb2]">: </span><span className="text-[#83a598]">[</span><span className="text-[#b8bb26]">"Blockchain"</span><span className="text-[#ebdbb2]">, </span><span className="text-[#b8bb26]">"GPU Computing"</span><span className="text-[#ebdbb2]">, </span><span className="text-[#b8bb26]">"Smart Contracts"</span><span className="text-[#83a598]">]</span></div>
                    <div className="leading-4 md:leading-5"><span className="text-[#83a598]">&#125;</span></div>
                  </div>
                </code>
              </pre>
            </div>
          )}
          
          {tab === "resume" && (
            <div className="bg-[#282828] rounded-lg overflow-hidden border border-[#3c3836]">
              {/* PDF Viewer Header */}
              <div className="bg-[#3c3836] px-4 py-2 border-b border-[#504945]">
                <div className="flex items-center gap-2">
                  <span className="text-[#fb4934]">●</span>
                  <span className="text-[#ebdbb2] text-sm font-mono">📄 resume.pdf</span>
                  <span className="text-[#928374] text-xs">[PDF]</span>
                </div>
              </div>
              
              {/* PDF Viewer Content */}
              <div className="bg-[#1d2021] p-2 md:p-4 flex-1 min-h-0">
                <div className="bg-white mx-auto max-w-full md:max-w-[210mm] shadow-lg rounded-lg overflow-hidden h-full">
                  {/* PDF iframe */}
                  <object
                    data="/resume.pdf#toolbar=1&navpanes=1&scrollbar=1"
                    type="application/pdf"
                    width="100%"
                    height="100%"
                    className="border-none block min-h-[600px]"
                    title="Resume PDF"
                  >
                    <iframe
                      src="/resume.pdf#toolbar=1&navpanes=1&scrollbar=1"
                      width="100%"
                      height="100%"
                      className="border-none block min-h-[600px]"
                      title="Resume PDF"
                    />
                  </object>
                </div>
              </div>
              
              {/* PDF Viewer Footer */}
              <div className="bg-[#3c3836] px-4 py-2 border-t border-[#504945]">
                <div className="flex items-center justify-between text-xs text-[#928374]">
                  <div className="flex items-center gap-4">
                    <span>📄 PDF Document</span>
                    <span>•</span>
                    <span>Size: 144KB</span>
                    <span>•</span>
                    <span>Modified: Dec 30, 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#b8bb26]">✓</span>
                    <span>Loaded successfully</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

          {/* Status line - FIXED TIDAK SCROLL */}
          <div className="flex-shrink-0 hidden md:block">
            <StatusLine 
              mode={mode} 
              file={getFileFromTab(tab)} 
              line={16} 
              col={25}
              fileType={getFileFromTab(tab).split('.').pop()} 
            />
          </div>
        </div>
      </div>

      {/* Command line - FIXED TIDAK SCROLL */}
      {showCommandLine && (
        <div className="bg-[#282828] border-t border-[#504945] px-2 py-1 flex-shrink-0">
          <div className="flex items-center font-mono text-xs md:text-sm">
            <span className="text-[#ebdbb2]">:</span>
            <input
              type="text"
              value={commandLine}
              onChange={(e) => setCommandLine(e.target.value)}
              className="bg-transparent text-[#ebdbb2] outline-none ml-1 flex-1"
              placeholder="Enter command..."
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  // Handle commands here
                  if (commandLine === 'q' || commandLine === 'quit') {
                    window.close();
                  } else if (commandLine.startsWith('e ')) {
                    // Open file simulation
                    const fileName = commandLine.split(' ')[1];
                    if (fileName.includes('about.rs')) setTab('about');
                    else if (fileName.includes('projects.md')) setTab('projects');
                    else if (fileName.includes('education.py')) setTab('education');
                    else if (fileName.includes('blog.sh')) setTab('blog');
                    else if (fileName.includes('certs.json')) setTab('certs');
                    else if (fileName.includes('resume.pdf')) setTab('resume');
                    else if (fileName.includes('init.lua')) setTab('init.lua');
                    else if (fileName.includes('plugins.lua')) setTab('plugins.lua');
                    else if (fileName.includes('keymaps.lua')) setTab('keymaps.lua');
                    else if (fileName.includes('backup.tar.gz')) setTab('backup.tar.gz');
                  }
                  setShowCommandLine(false);
                  setMode("NORMAL");
                  setCommandLine("");
                }
              }}
            />
          </div>
        </div>
      )}

      {/* Mini help indicator - FIXED TIDAK SCROLL */}
      <div className="bg-[#3c3836] px-2 py-1 text-xs text-[#928374] font-mono border-t border-[#504945] flex-shrink-0 hidden md:block">
        <div className="flex items-center justify-between">
          <span>Press 'i' for INSERT, 'v' for VISUAL, ':' for COMMAND, 'Esc' for NORMAL</span>
        </div>
      </div>
    </div>
  );
}