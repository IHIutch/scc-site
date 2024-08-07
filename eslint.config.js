import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    react: true,
    typescript: true,
    ignores: [
    // # build output
      'dist/',
      // # generated types

      // # dependencies
      '**/node_modules/*',
      'node_modules/',

      // # logs
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      'pnpm-debug.log*',

      // # environment variables
      '.env',
      '.env.production',

      // # macOS-specific files
      '.DS_Store',
    ],
  },
  {
    rules: {
      'react-hooks/exhaustive-deps': 'off',
    },
  },
)
