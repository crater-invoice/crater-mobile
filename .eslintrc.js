module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: 'babel-eslint',
  plugins: ['flowtype', 'prettier'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'function-paren-newline': 'off',
    'no-trailing-spaces': 'off',
    'eol-last': 'off',
    'react/jsx-curly-brace-presence': 'off',
    camelcase: 'off',
    'no-underscore-dangle': 'off',
    'object-curly-newline': 'off',
    'arrow-parens': 'off',
    'global-require': 'off',
    'no-else-return': 'off',
    'no-unused-expressions': 'off',
    // Indent with 4 spaces
    indent: ['error', 4],
    // Indent JSX with 4 spaces
    'react/jsx-indent': ['error', 4],
    // Indent props with 4 spaces
    'react/jsx-indent-props': ['error', 4],
    'react/prefer-stateless-function': 'off',
    'no-confusing-arrow': 'off',
    'no-unused-expressions': 'off',
    'react/jsx-no-bind': 'off',
    'consistent-return': 'off',
    'react/sort-comp': [
      'on',
      {
        order: ['static-methods', 'lifecycle', 'everything-else', 'render'],
        groups: {
          lifecycle: [
            'displayName',
            'propTypes',
            'contextTypes',
            'childContextTypes',
            'mixins',
            'statics',
            'defaultProps',
            'constructor',
            'getDefaultProps',
            'state',
            'getInitialState',
            'getChildContext',
            'getDerivedStateFromProps',
            'componentWillMount',
            'UNSAFE_componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'UNSAFE_componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'UNSAFE_componentWillUpdate',
            'getSnapshotBeforeUpdate',
            'componentDidUpdate',
            'componentDidCatch',
            'componentWillUnmount'
          ]
        }
      }
    ]
  },
  globals: {
    fetch: true,
    it: true,
    alert: true,
    btoa: true,
    document: true,
    window: true
  }
};
