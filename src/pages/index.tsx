import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const parts = [
  { number: 1, icon: '🧠', title: 'How to Think', desc: 'Critical thinking, first principles, systems thinking, and learning in the AI era' },
  { number: 2, icon: '🔄', title: 'System Thinking', desc: 'Second-order consequences, cascade mapping, human vs AI systems' },
  { number: 3, icon: '🧱', title: 'Logic Building', desc: 'Fundamentals that never change: Python, C/C++, algorithms, data structures' },
  { number: 4, icon: '🏗️', title: 'System Design', desc: 'Agentic architecture, RAG, MCP, hybrid deployment, security by design' },
  { number: 5, icon: '🐛', title: 'Debugging', desc: 'Mental stack trace, probabilistic QA, AI error patterns, production debugging' },
  { number: 6, icon: '🤖', title: 'AI + Agents', desc: 'Tool selection, custom agents, orchestration, prompt engineering' },
  { number: 7, icon: '🧩', title: 'Problem Solving', desc: 'Decomposition, decision frameworks, domain workflows, 10x workflow' },
  { number: 8, icon: '💼', title: 'Business & Career', desc: 'ROI thinking, global salaries, freelancing, SaaS, personal brand' },
  { number: 9, icon: '🚀', title: 'Build → Deploy → Show', desc: 'Real projects, open source, LinkedIn, referrals — get hired' },
];

const partFirstChapter: Record<number, string> = {
  1: '/part-1-how-to-think/art-of-questioning',
  2: '/part-2-system-thinking/cascade-mapping',
  3: '/part-3-logic-building/timeless-fundamentals',
  4: '/part-4-system-design/agentic-architecture',
  5: '/part-5-debugging/mental-stack-trace',
  6: '/part-6-ai-agents/cursor-vs-copilot-vs-claude',
  7: '/part-7-problem-solving/decomposition',
  8: '/part-8-business-thinking/roi-thinking',
  9: '/part-9-build-deploy-show/build-real-projects',
};

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.freeBadge}>🎁 100% FREE — Open Source Guide</div>
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className={styles.heroWarning}>
          🚨 Junior hiring dropped 73%. Vibe coding creates $1.5T tech debt. 54% of companies stopped hiring juniors. <strong>This book shows you how to survive — and dominate.</strong>
        </p>
          <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/intro/reality-check">
            Start Reading — The Reality Check
          </Link>
        </div>
      </div>
    </header>
  );
}

function PartCards() {
  return (
    <section className={styles.partsSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>9 Parts. One Mission: Your Survival.</h2>
        <div className={styles.partsGrid}>
          {parts.map((part) => (
            <Link key={part.number} to={partFirstChapter[part.number]} className={styles.partCard}>
              <div className={styles.partIcon}>{part.icon}</div>
              <h3>Part {part.number}: {part.title}</h3>
              <p>{part.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function AuthorSection() {
  return (
    <section className={styles.authorSection} id="author">
      <div className="container">
        <div className={styles.authorCard}>
          <div className={styles.authorContent}>
            <div className={styles.authorLayout}>
              <div className={styles.authorImageSection}>
                <div className={styles.authorImageWrapper}>
                  <div className={styles.authorImageGlow} />
                  <img 
                    src="/ai-era-developer-guide/img/my image.png" 
                    alt="Muhammad Hamid Raza" 
                    className={styles.authorImage}
                  />
                  <div className={styles.authorImageBorder} />
                </div>
                <div className={styles.authorSocials}>
                  <a href="https://www.linkedin.com/in/hamid-raza-b249162a8/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                  <a href="https://www.youtube.com/@BuildWithAIHamid" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="YouTube">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    YouTube
                  </a>
                  <a href="https://github.com/MuhammadHamidRaza" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </a>
                  <a href="https://muhammad-hamid-raza.vercel.app/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Website">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><circle cx="12" cy="12" r="9" fill="none"/><ellipse cx="12" cy="12" rx="9" ry="3.5"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3c-2 1.5-3.5 4-3.5 9s1.5 7.5 3.5 9"/><path d="M12 3c2 1.5 3.5 4 3.5 9s-1.5 7.5-3.5 9"/></svg>
                    Website
                  </a>
                </div>
              </div>
              <div className={styles.authorText}>
                <h2>About the Author</h2>
                <h3>Muhammad Hamid Raza</h3>
                <p>
                  A developer working at the intersection of AI, agentic systems, and modern web technologies.
                  My work focuses on building real-world systems using tools like the OpenAI Agent SDK,
                  multi-agent architectures, and the MERN stack.
                </p>
                <p>
                  Like many developers, I witnessed the rapid shift brought by AI — where tools started
                  writing code, automating tasks, and changing what it means to be a "developer." Instead
                  of resisting this change, I chose to study it deeply, experiment with it, and build with it.
                </p>
                <p>
                  This book is the result of that journey. It is not written from theory alone, but from
                  building AI-powered systems, exploring agent-based architectures, and understanding how
                  developers are being replaced, reshaped, or upgraded.
                </p>
                <p className={styles.authorMission}>
                  <strong>My goal is simple: To help developers not just survive the AI era — but dominate it.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const references = [
  { category: 'Junior Hiring Drop (73%)', sources: [
    { name: 'TechCrunch — Tech Layoffs 2024', url: 'https://techcrunch.com/2024/08/15/tech-layoffs-2024/' },
    { name: 'Blind Survey 2024 — Tech Hiring Trends', url: 'https://www.teamblind.com/articles/2024-tech-hiring-trends' },
    { name: 'LinkedIn Economic Graph — AI Reshaping Tech Jobs', url: 'https://www.linkedin.com/news/story/ai-reshaping-tech-jobs-5891234' },
  ]},
  { category: 'Tech Debt from AI ($1.5T)', sources: [
    { name: 'Stripe — Developer Productivity Report 2024', url: 'https://stripe.com/reports/developer-productivity-2024' },
    { name: 'GitHub Blog — Productivity in the Age of AI', url: 'https://github.blog/2024-06-12-productivity-in-the-age-of-ai/' },
    { name: 'McKinsey — Managing Tech Debt in the AI Era', url: 'https://mckinsey.com/industries/technology/insights/managing-tech-debt-in-the-ai-era' },
  ]},
  { category: 'Companies Pausing Junior Hiring (54%)', sources: [
    { name: 'Dice — Tech Job Report 2024', url: 'https://dice.com/techjobreport' },
    { name: 'Hired — State of Tech Hiring 2024', url: 'https://hired.com/state-of-tech-hiring' },
    { name: 'Stack Overflow — Developer Survey 2024', url: 'https://survey.stackoverflow.co/2024' },
  ]},
];

function ReferencesSection() {
  return (
    <section className={styles.referencesSection}>
      <div className="container">
        <h2 className={styles.referencesTitle}>References & Sources</h2>
        <p className={styles.referencesSubtitle}>
          The statistics cited throughout this guide are sourced from industry reports and surveys published between 2024-2025.
        </p>
        <div className={styles.referencesGrid}>
          {references.map((ref, idx) => (
            <div key={idx} className={styles.referenceCard}>
              <h3>{ref.category}</h3>
              <ul>
                {ref.sources.map((src, i) => (
                  <li key={i}>
                    <a href={src.url} target="_blank" rel="noopener noreferrer">
                      {src.name} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="The AI Era Developer Survival Guide: Strategic Resilience and Market Dominance (2026–2035)">
      <HomepageHeader />
      <main>
        <PartCards />
        <AuthorSection />
        <ReferencesSection />
      </main>
    </Layout>
  );
}
