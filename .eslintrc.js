module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: 'babel-eslint',
  rules: {
    'import/no-unresolved': 'off',
    'no-irregular-whitespace': 'off',
    'react-native/no-inline-styles': 'off',
    'react/jsx-filename-extension': [
      1,
      {extensions: ['.js', '.jsx', 'tsx', 'ts']},
    ],
    'no-param-reassign': 'off',
  },
};
