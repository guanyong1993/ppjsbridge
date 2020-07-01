const pkg = require('../../package');
module.exports = {
  title: 'PPJSBridge',
  base: '/' + pkg.aliasOSS + '/docs/',
  description: '皮皮PiPi App (iOS/Android) JSBridge API ',
  plugins: [
    ['@vuepress/active-header-links'],
    ['@vuepress/back-to-top'],
    [
      'vuepress-plugin-container',
      {
        type: 'theorem',
        defaultTitle: '',
      },
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'params',
        before: (info) =>
          `<div class="params"><p class="params_title">${info}</p>`,
        after: '</div>',
      },
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'paramsName',
        before: (info) =>
          `<div class="params-name"><p class="params-name_title">${info}</p>`,
        after: '</div>',
      },
    ],
  ],
  themeConfig: {
    repo: 'apeiwan/ppjsbridge',
    docsDir: 'docs',
    logo: '/logo.png',
    nav: [
      { text: '指南', link: '/guide/' },
      { text: 'wiki', link: '/wiki/' },
      { text: '运行', link: '/run/' },
    ],
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
    sidebar: {
      '/guide/': [
        {
          title: '指南',
          collapsable: false,
          sidebarDepth: 5,
          children: [
            '',
            // '/guide/about',
            '/guide/install',
            '/guide/use',
            '/guide/change',
            '/guide/desc',
            '/guide/api',
            '/guide/helpapi',
            '/guide/invoke',
            '/guide/appRouter',
          ],
        },
      ],
      '/wiki/': [
        {
          title: 'wiki',
          collapsable: false,
          sidebarDepth: 5,
          children: [
            '',
            // '/wiki/api',
            '/wiki/router',
          ],
        },
      ],
      '/run/': [
        {
          title: 'run',
          collapsable: false,
        },
      ],
    },
  },
};
