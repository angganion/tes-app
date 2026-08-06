"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const profile = {
  name: "Wahyu Ridho Anggoro",
  role: "Backend & Systems Engineer",
  location: "Depok, Indonesia",
  email: "wahyu.ridho@ui.ac.id",
  phone: "+62 851 5693 5355",
  linkedin: "https://www.linkedin.com/in/wahyu-ridho-anggoro-46b55021a",
  github: "https://github.com/angganion",
};

const education = {
  institution: "Universitas Indonesia",
  degree: "B.S. in Information Systems",
  period: "Aug 2022 — Jul 2026",
  gpa: "3.67 / 4.00",
  thesis: "Design of an Upgradeable Smart Contract for Real Estate Tokenization with Transfer Restrictions Based on KYC Verification Status",
};

const experiences = [
  {
    period: "Aug 2025 — Feb 2026",
    title: "IT Developer Intern",
    company: "BLP Beauty · Indonesia",
    description:
      "Developed Asset Management and Legal Request features end-to-end using NestJS, Angular, and PostgreSQL. Contributed to Task Management, Employee Journey, Budget System, workflow features, Excel imports, real-time notifications, authentication, authorization, and Odoo integration.",
  },
  {
    period: "Jul 2024 — Jun 2026",
    title: "Teaching Assistant",
    company: "Faculty of Computer Science, Universitas Indonesia",
    description:
      "Teaching assignments across Programming Foundation 2, Computer Vision, Enterprise Application Architecture & Programming, Computer Networks, and Database.",
  },
];

const skills = [
  ["Languages", "TypeScript · Java · Python · SQL · Solidity"],
  ["Backend", "NestJS · Spring Boot · Django"],
  ["Database", "PostgreSQL"],
  ["Infrastructure", "Docker · Git · GitLab CI/CD · Kubernetes · Linux"],
];

const award = {
  title: "Honorable Mention (4th) — Gemastik 2025",
  subtitle: "Smart Device, Embedded System & IoT",
  description:
    "Co-developed an end-to-end AIoT platform combining anthropometric sensors, ANN, YOLOv11n late-fusion inference, and LoRa-based transmission for early stunting detection in low-connectivity regions.",
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function TabLabel({ number, children }) {
  return <span className="tab-label"><small>{number}</small>{children}</span>;
}

function getExcerpt(html, length = 210) {
  return `${html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, length)}…`;
}

export default function PortfolioShell({ projects, posts }) {
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const tab = new URLSearchParams(window.location.search).get("tab");
    if (["profile", "projects", "experience", "notes"].includes(tab)) {
      setActiveTab(tab);
    }
  }, []);

  return (
    <main className="minimal-portfolio">
      <header className="site-header">
        <Link href="/" className="wordmark">WRA<span>/</span></Link>
        <nav className="site-tabs" aria-label="Portfolio sections" role="tablist">
          <button type="button" role="tab" aria-selected={activeTab === "profile"} className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}><TabLabel number="01">Profile</TabLabel></button>
          <button type="button" role="tab" aria-selected={activeTab === "projects"} className={activeTab === "projects" ? "active" : ""} onClick={() => setActiveTab("projects")}><TabLabel number="02">Projects</TabLabel></button>
          <button type="button" role="tab" aria-selected={activeTab === "experience"} className={activeTab === "experience" ? "active" : ""} onClick={() => setActiveTab("experience")}><TabLabel number="03">Experience</TabLabel></button>
          <button type="button" role="tab" aria-selected={activeTab === "notes"} className={activeTab === "notes" ? "active" : ""} onClick={() => setActiveTab("notes")}><TabLabel number="04">Field notes</TabLabel></button>
        </nav>
        <span className="header-location">Depok / Indonesia</span>
      </header>

      <div className="page-frame">
        {activeTab === "profile" && (
          <section className="editorial-panel profile-panel" role="tabpanel">
            <div className="panel-index">01 / PROFILE</div>
            <div className="profile-title">
              <p>{profile.role}</p>
              <h1>Wahyu <em>Ridho</em><br />Anggoro<span>.</span></h1>
            </div>
            <div className="profile-lede">
              <p>Information Systems student and backend-focused engineer with experience building internal platforms, microservices, computer vision systems, and blockchain applications.</p>
              <div className="contact-links">
                <a href={`mailto:${profile.email}`}>{profile.email} <Arrow /></a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
                <a href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
                <a href="/resume.pdf" target="_blank" rel="noreferrer">Download CV <Arrow /></a>
              </div>
            </div>

            <div className="profile-lower">
              <div className="education-copy">
                <p className="eyebrow">Education</p>
                <h2>{education.institution}</h2>
                <p>{education.degree}<br />{education.period}</p>
                <strong>GPA {education.gpa}</strong>
              </div>
              <div className="thesis-copy">
                <p className="eyebrow">Undergraduate thesis</p>
                <p>{education.thesis}</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "projects" && (
          <section className="editorial-panel" role="tabpanel">
            <div className="panel-index">02 / PROJECTS</div>
            <div className="section-intro"><h2>Selected <em>work.</em></h2><p>Systems, applications, and research built across backend engineering, computer vision, and product development.</p></div>
            <div className="project-list">
              {projects.map((project, index) => (
                <article className="project-row" key={project.slug}>
                  <span className="row-number">0{index + 1}</span>
                  <div className="project-copy"><p className="eyebrow">{project.eyebrow} / {project.year}</p><h3>{project.title}</h3><p>{getExcerpt(project.bodyHtml)}</p><div className="tag-line">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
                  <div className="row-links"><Link href={`/projects/${project.slug}`}>Detail <Arrow /></Link>{project.repo && <a href={project.repo} target="_blank" rel="noreferrer">Repository <Arrow /></a>}</div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "experience" && (
          <section className="editorial-panel" role="tabpanel">
            <div className="panel-index">03 / EXPERIENCE</div>
            <div className="section-intro"><h2>How I <em>work.</em></h2><p>Backend development, technical documentation, and teaching grounded in clear system boundaries.</p></div>
            <div className="experience-list">
              {experiences.map((experience) => <article className="experience-row" key={experience.title}><span className="row-period">{experience.period}</span><div><h3>{experience.title}</h3><p className="row-company">{experience.company}</p></div><p className="row-description">{experience.description}</p></article>)}
            </div>
            <div className="experience-bottom">
              <div><p className="eyebrow">Technical skills</p>{skills.map(([label, items]) => <p className="skill-line" key={label}><strong>{label}</strong><span>{items}</span></p>)}</div>
              <div className="award-copy"><p className="eyebrow">Achievement</p><h3>{award.title}</h3><p>{award.subtitle}</p><span>{award.description}</span></div>
            </div>
          </section>
        )}

        {activeTab === "notes" && (
          <section className="editorial-panel" role="tabpanel">
            <div className="panel-index">04 / FIELD NOTES</div>
            <div className="section-intro"><h2>Working <em>notes.</em></h2><p>Writing about architecture, data, and the decisions behind reliable systems.</p></div>
            <div className="notes-list">
              {posts.map((post, index) => <article className="note-row" key={post.slug}><span className="row-number">0{index + 1}</span><div><p className="eyebrow">{post.date} / {post.readTime}</p><h3>{post.title}</h3><p>{getExcerpt(post.bodyHtml, 270)}</p><Link href={`/field-notes/${post.slug}`}>Read note <Arrow /></Link></div></article>)}
            </div>
          </section>
        )}
      </div>

      <footer className="site-footer"><span>{profile.name}</span><span>{profile.email}</span><span>{profile.phone}</span></footer>
    </main>
  );
}
