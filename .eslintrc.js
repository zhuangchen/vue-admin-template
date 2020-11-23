module.exports = {
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
  },
  extends: [
    '@vue/typescript',
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    quotes: ["error", "single"],
    semi: ["error", "always"]
  }
};
