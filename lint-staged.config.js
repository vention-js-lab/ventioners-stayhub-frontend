export default {
  '**/*.{ts,tsx}': (stagedFiles) => [
    `eslint --fix ${stagedFiles.map((file) => `"${file}"`).join(' ')}`,
    `prettier --write ${stagedFiles.map((file) => `"${file}"`).join(' ')}`,
  ],
};
