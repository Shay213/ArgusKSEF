const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  appId: "com.electron.argusKSEF",
  productName: "ArgusKSEF",
  directories: {
    buildResources: "build"
  },
  files: [
    "!**/.vscode/*",
    "!src/*",
    "!electron.vite.config.{js,ts,mjs,cjs}",
    "!{.eslintignore,.eslintrc.cjs,.prettierignore,.prettierrc.yaml,dev-app-update.yml,CHANGELOG.md,README.md}",
    "!{.env,.env.*,.npmrc,pnpm-lock.yaml}",
    "!{tsconfig.json,tsconfig.node.json,tsconfig.web.json}"
  ],
  asarUnpack: [
    "resources/**"
  ],
  win: {
    executableName: "ArgusKSEF"
  },
  nsis: {
    artifactName: "${name}-${version}-setup.${ext}",
    shortcutName: "${productName}",
    uninstallDisplayName: "${productName}",
    createDesktopShortcut: "always"
  },
  mac: {
    entitlementsInherit: "build/entitlements.mac.plist",
    extendInfo: {
      NSCameraUsageDescription: "Application requests access to the device's camera.",
      NSMicrophoneUsageDescription: "Application requests access to the device's microphone.",
      NSDocumentsFolderUsageDescription: "Application requests access to the user's Documents folder.",
      NSDownloadsFolderUsageDescription: "Application requests access to the user's Downloads folder."
    },
    notarize: false
  },
  dmg: {
    artifactName: "${name}-${version}.${ext}"
  },
  linux: {
    target: ["AppImage", "snap", "deb"],
    maintainer: "Dawid Pawelec",
    category: "Utility"
  },
  appImage: {
    artifactName: "${name}-${version}.${ext}"
  },
  npmRebuild: false,
  publish: {
    provider: "github",
    repo: "ArgusKSEF",
    token: process.env.GH_TOKEN, // Use environment variable
    owner: "Shay213"
  }
}
