module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json", tsconfigRootDir: __dirname, sourceType: "module"
  },
  plugins: ["@typescript-eslint/eslint-plugin", "unicorn"],
  extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended", "plugin:unicorn/recommended"],
  root: true,
  env: {
    node: true, jest: true
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "unicorn/filename-case": ["error", { "case": "pascalCase" }],
    "@typescript-eslint/naming-convention": ["error", {
      selector: "enumMember", format: ["UPPER_CASE"]
    }, {
      selector: "enum", format: ["UPPER_CASE"]
    }]
  },
  overrides: [
    {
      files:["*.Spec.ts"],
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
        "unicorn/no-null": "off",
      }
    }
  ]
};
