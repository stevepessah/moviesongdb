const fs = require('fs');
const path = require('path');

const baseDir = 'node_modules/react-native-web';
const targetFiles = [
  'dist/index.js',
  'dist/index.js.flow',
  'dist/exports/createElement/index.js',
  'dist/exports/createElement/index.js.flow',
  'dist/exports/TextInput/index.js',
  'dist/exports/TextInput/index.js.flow',
  'dist/exports/View/index.js',
  'dist/exports/View/index.js.flow',
  'dist/exports/Text/index.js',
  'dist/exports/Text/index.js.flow',
  'dist/exports/useLocaleContext/index.js',
  'dist/exports/useLocaleContext/index.js.flow',
  'dist/modules/useLocale/index.js',
  'dist/modules/useLocale/index.js.flow',
  'dist/cjs/index.js',
  'dist/cjs/exports/createElement/index.js',
  'dist/cjs/exports/TextInput/index.js',
  'dist/cjs/exports/View/index.js',
  'dist/cjs/exports/Text/index.js',
  'dist/cjs/exports/useLocaleContext/index.js',
  'dist/cjs/modules/useLocale/index.js',
  'src/exports/Text/index.js',
  'src/exports/View/index.js',
  'src/exports/TextInput/index.js',
  'src/exports/useLocaleContext/index.js',
  'src/modules/useLocale/index.js',
];

function neutralizeLocaleCode(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  if (content.includes('useLocale')) {
    const updated = content
      // Remove import of useLocale
      .replace(/import {[^}]*useLocale[^}]*} from ['"][^'"]+['"];?/g, '// useLocale import removed')

      // Replace useLocaleContext usage with empty object fallback
      .replace(/useLocaleContext\(\)/g, '{}')

      // Replace getLocaleDirection call with 'ltr'
      .replace(/getLocaleDirection\([^)]+\)/g, `'ltr'`)

      // Replace LocaleProvider with Fragment (React fallback)
      .replace(/\bLocaleProvider\b/g, 'Fragment')

      // Replace export function useLocaleContext with empty function
      .replace(/export function useLocaleContext\s*\(\)\s*{[^}]*}/g, 'export function useLocaleContext() { return {}; }')

      // Replace exports.useLocaleContext assignment
      .replace(/exports\.useLocaleContext\s*=\s*useLocaleContext;/g, 'exports.useLocaleContext = function () { return {}; };')

      // Replace export default useLocaleContext
      .replace(/export default useLocaleContext;/g, 'export default function useLocaleContext() { return {}; };');

    fs.writeFileSync(filePath, updated, 'utf-8');
    console.log(`✔️ Patched ${filePath}`);
  }
}


targetFiles.forEach((relativePath) => {
  const fullPath = path.join(baseDir, relativePath);
  if (fs.existsSync(fullPath)) {
    try {
      neutralizeLocaleCode(fullPath);
    } catch (err) {
      console.warn(`⚠️ Could not patch ${fullPath}: ${err.message}`);
    }
  }
});
