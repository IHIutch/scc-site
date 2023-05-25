/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    node: true,
  },
  extends: ['@remix-run/eslint-config', 'plugin:prettier/recommended'],
}
