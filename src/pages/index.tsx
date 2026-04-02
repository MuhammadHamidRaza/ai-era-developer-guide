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
    <section className={styles.authorSection}>
      <div className="container">
        <div className={styles.authorCard}>
          <div className={styles.authorContent}>
            <div>
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
      </main>
    </Layout>
  );
}
