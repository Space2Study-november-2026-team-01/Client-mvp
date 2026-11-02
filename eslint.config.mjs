import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'src/tests/coverage/**',
      'src/assets/**',
      'node_modules/**'
    ]
  },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    extends: [js.configs.recommended],
    plugins: { react, 'react-hooks': reactHooks },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },
    settings: {
      react: { version: '18.2' }
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'react/jsx-filename-extension': 'off',
      'prefer-arrow-callback': 'error',
      'react/prop-types': 'off',
      'react/jsx-boolean-value': 'error',
      'react/jsx-handler-names': 'error',
      'react/jsx-key': 'error',
      'react/jsx-pascal-case': 'error',
      'react/jsx-sort-props': 'error',
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/jsx-max-depth': ['error', { max: 5 }],
      // Compiler rules in eslint-plugin-react-hooks recommended target the
      // React Compiler. This app is React 18 and does not run it, so only the
      // classic Rules of Hooks are enabled.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/tests/**'],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      '@typescript-eslint/no-restricted-imports': [
        'warn',
        {
          paths: [
            {
              name: 'react-redux',
              importNames: ['useSelector', 'useDispatch'],
              message:
                'Use typed hooks `useAppDispatch` and `useAppSelector` instead.'
            }
          ]
        }
      ]
    }
  },
  {
    files: ['src/tests/**/*.{js,jsx,ts,tsx}'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      globals: { ...globals.vitest, ...globals.node }
    }
  },
  eslintConfigPrettier
)
