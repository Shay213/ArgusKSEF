const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  appId: 'com.electron.argusKSEF',
  productName: 'ArgusKSEF',
  directories: {
    buildResources: 'build'
  },
  files: [
    '!**/.vscode/*',
    '!src/*',
    '!electron.vite.config.{js,ts,mjs,cjs}',
    '!{.eslintignore,.eslintrc.cjs,.prettierignore,.prettierrc.yaml,dev-app-update.yml,CHANGELOG.md,README.md}',
    '!{.env,.env.*,.npmrc,pnpm-lock.yaml}',
    '!{tsconfig.json,tsconfig.node.json,tsconfig.web.json}'
  ],
  asarUnpack: ['resources/**'],
  win: {
    target: 'nsis', // Specify the target as NSIS for Windows
    executableName: 'ArgusKSEF'
  },
  nsis: {
    artifactName: '${name}-${version}-setup.${ext}',
    shortcutName: '${productName}',
    uninstallDisplayName: '${productName}',
    createDesktopShortcut: 'always'
  },
  publish: {
    provider: 'github',
    repo: 'ArgusKSEF',
    token: process.env.GH_TOKEN, // Use environment variable
    owner: 'Shay213'
  }
}
