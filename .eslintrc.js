// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  env: {
    browser: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: "standard",
  // required to lint *.vue files
  plugins: ["html"],
  // add your custom rules here
  rules: {
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": [
      1,
      {
        argsIgnorePattern: "res|next|^err"
      }
    ],
    "arrow-body-style": [2, "as-needed"],
    "no-param-reassign": [
      2,
      {
        props: false
      }
    ],
    "no-console": 0,
    import: 0,
    "func-names": 0,
    "space-before-function-paren": 0,
    "comma-dangle": 0,
    "max-len": 0,
    "import/extensions": 0,
    "no-underscore-dangle": 0,
    "consistent-return": 0,
    radix: 0,
    "no-shadow": [
      2,
      {
        hoist: "all",
        allow: ["resolve", "reject", "done", "next", "err", "error"]
      }
    ],
    quotes: [
      1,
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    semi: ["error", "always"],
    indent: ["error", 3]
  }
};
