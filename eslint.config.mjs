/**
 * from https://github.com/antfu/eslint-config/discussions/627
 */
import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'
// import jestDom from 'eslint-plugin-jest-dom'
import jsxA11y from 'eslint-plugin-jsx-a11y'
// import playwright from 'eslint-plugin-playwright'
// import tailwind from 'eslint-plugin-tailwindcss'
// import testingLibrary from 'eslint-plugin-testing-library'

export default antfu(
  {
    react: true,
    typescript: true,

    lessOpinionated: true,
    isInEditor: false,

    // stylistic: {
    //   semi: true,
    // },

    // formatters: {
    //   css: true,
    // },

    ignores: ['next-env.d.ts'],

  },
  // ...tailwind.configs['flat/recommended'],
  jsxA11y.flatConfigs.recommended,
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  // {
  //   files: ['**/*.test.ts?(x)'],
  //   ...testingLibrary.configs['flat/react'],
  //   ...jestDom.configs['flat/recommended'],
  // },
  // {
  //   files: ['**/*.spec.ts', '**/*.e2e.ts'],
  //   ...playwright.configs['flat/recommended'],
  // },
  {
    rules: {
      'unused-imports/no-unused-vars': 'off',
      'react-refresh/only-export-components': 'off',
      'n/prefer-global/process': 'off',
    },
  },
)
