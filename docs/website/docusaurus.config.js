export default {
  title: "React-SearchKit",
  tagline: "A simple yet powerful UI search kit built with React",
  url: "https://inveniosoftware.github.io",
  baseUrl: "/react-searchkit/",
  organizationName: "inveniosoftware",
  projectName: "react-searchkit",
  scripts: [
    "https://buttons.github.io/buttons.js",
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
    "/react-searchkit/js/code-blocks-buttons.js",
  ],
  stylesheets: ["/react-searchkit/css/code-blocks-buttons.css"],
  favicon: "img/favicon.png",
  customFields: {
    repoUrl: "https://github.com/inveniosoftware/react-searchkit",
  },
  onBrokenLinks: "log",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "log",
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          path: "../docs",
          sidebarPath: "./sidebars.js",
        },
        blog: false,
        theme: {
          customCss: "src/css/customTheme.css",
        },
      },
    ],
  ],
  plugins: [],
  themeConfig: {
    navbar: {
      title: "React-SearchKit",
      items: [
        {
          to: "docs/getting-started",
          label: "Docs",
          position: "left",
        },
        {
          to: "docs/components/react-searchkit",
          label: "Components",
          position: "left",
        },
        {
          to: "docs/create-your-component",
          label: "Extending",
          position: "left",
        },
        {
          to: "/help",
          label: "Help",
          position: "left",
        },
      ],
    },
    image: "img/screenshot.png",
    footer: {
      style: "dark",
      links: [
        {
          title: "Made with",
          items: [
            {
              label: "Docusaurus",
              href: "https://docusaurus.io/",
            },
            {
              html: `<a href="https://opensource.fb.com/" target="_blank" rel="noreferrer noopener"><img src="/react-searchkit/img/oss_logo.png" alt="React-SearchKit" width="170" height="45" style="display:block;margin-top:0.5rem" /></a>`,
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/inveniosoftware/react-searchkit",
            },
            {
              label: "Invenio Software",
              href: "https://inveniosoftware.org/",
            },
            {
              label: "Chat with us!",
              href: "https://discord.gg/8qatqBC",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/inveniosoftware",
            },
          ],
        },
        {
          title: "Born with ❤️ at",
          items: [
            {
              html: `<a href="https://home.cern/" target="_blank" rel="noreferrer noopener"><img src="/react-searchkit/img/logo-cern.png" alt="CERN" width="130" style="display:block;margin-top:0.5rem" /></a>`,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CERN.`,
    },
  },
};
