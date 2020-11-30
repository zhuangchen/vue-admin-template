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
    semi: ["error", "always"],
    "indent": [2, 4],
    "key-spacing": [1, { "beforeColon": false, "afterColon": true }],
    "object-curly-spacing": [0, "never"],
    "eqeqeq": [2, "allow-null"],
    "dot-location": [2, "property"], 
    "comma-dangle": [2, "never"], 
    "computed-property-spacing": [2,"never"], 
    "comma-spacing": [2, { "before": false, "after": true }], 
    "comma-style": [2, "last"], 
  }
};
