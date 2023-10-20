module.exports = {
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['{{postcss,prettier}.config,.eslintrc}.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],

  parser: '@typescript-eslint/parser',
  plugins: ['solid', 'prettier', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:solid/typescript',
    'prettier',
    '@unocss',
  ],
  rules: {
    'prettier/prettier': 'warn',
    'import/no-duplicates': 'warn',
    'import/no-relative-parent-imports': 'warn',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      { prefer: 'type-imports' },
    ],
    curly: ['warn', 'multi-line'],
  },
};
