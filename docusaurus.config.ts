import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'The AI Era Developer Survival Guide',
  tagline: 'By Muhammad Hamid Raza — Strategic Resilience and Market Dominance (2026–2035)',
  favicon: 'img/favicon2.ico',

  future: {
    v4: true,
  },

  url: 'https://MuhammadHamidRaza.github.io',
  baseUrl: '/ai-era-developer-guide/',
  organizationName: 'MuhammadHamidRaza',
  projectName: 'ai-era-developer-guide',
  trailingSlash: false,

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css', './src/css/premium-theme.css'],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'AI Era Developer Guide',
      hideOnScroll: false,
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'bookSidebar',
          position: 'left',
          label: 'Book',
        },
        {
          href: 'https://github.com/MuhammadHamidRaza/ai-era-developer-guide',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Parts',
          items: [
            {label: 'Introduction', to: '/intro/reality-check'},
            {label: 'How to Think', to: '/part-1-how-to-think/art-of-questioning'},
            {label: 'System Thinking', to: '/part-2-system-thinking/cascade-mapping'},
            {label: 'Logic Building', to: '/part-3-logic-building/timeless-fundamentals'},
          ],
        },
        {
          title: 'More Parts',
          items: [
            {label: 'System Design', to: '/part-4-system-design/agentic-architecture'},
            {label: 'Debugging', to: '/part-5-debugging/mental-stack-trace'},
            {label: 'AI + Agents', to: '/part-6-ai-agents/cursor-vs-copilot-vs-claude'},
            {label: 'Problem Solving', to: '/part-7-problem-solving/decomposition'},
            {label: 'Business & Career', to: '/part-8-business-thinking/roi-thinking'},
            {label: 'Build → Deploy → Show', to: '/part-9-build-deploy-show/build-real-projects'},
          ],
        },
        {
          title: 'About',
          items: [
            {label: 'Author', to: '/#author'},
            {label: 'Contact', href: 'https://muhammad-hamid-raza.vercel.app/'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Muhammad Hamid Raza. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'bash', 'typescript', 'javascript', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
