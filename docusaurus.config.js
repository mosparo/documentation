// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'mosparo Docs',
  tagline: 'The modern spam protection',
  url: 'https://mosparo-doc-build.local',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'mosparo', // Usually your GitHub org/user name.
  projectName: 'mosparo', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    //path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        //path: 'en',
      },
      de: {
        label: 'Deutsch',
        direction: 'ltr',
        htmlLang: 'de-DE',
        calendar: 'gregory',
        //path: 'de',
      },
    }
  },

  plugins: [
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        indexBlog: false
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/mosparo/documentation/blob/master/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Docs',
        logo: {
          alt: 'mosparo logo contains a bird with the name Mo and the mosparo text',
          src: 'img/mosparo-logo.svg',
          srcDark: 'img/mosparo-logo-white.svg',
        },
        items: [
          {
            type: 'doc',
            docId: '/category/about',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'doc',
            docId: 'translating',
            position: 'left',
            label: 'Translating',
          },
          {
            type: 'doc',
            docId: 'testing',
            position: 'left',
            label: 'Testing',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/mosparo/mosparo',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Documentation',
                to: '/docs/category/about',
              },
              {
                label: 'Translations',
                to: '/docs/category/about',
              },
              {
                label: 'Testing',
                to: '/docs/category/about',
              },
            ],
          },
          {
            title: 'Website',
            items: [
              {
                label: 'Homepage',
                href: 'https://mosparo.io',
              },
              {
                label: 'Version history',
                href: 'https://mosparo.io/releases/',
              },
              {
                label: 'News',
                href: 'https://mosparo.io/news/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/mosparo/mosparo',
              },
            ],
          },
        ],
        copyright: `Copyright © 2021-${new Date().getFullYear()} mosparo Core Developers and contributors`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['php'],
      },
    }),
};

module.exports = config;
