module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  extends: ["plugin:vue/vue3-recommended", "prettier"],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ["vue", "html", "prettier"],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "vue/multi-word-component-names": "off",
  },
};
