const getMUIImportsPlugin = (name) => {
  let path = '${member}';

  if (name === 'client') {
    path = `esm/${path}`;
  }

  return [
    'babel-plugin-transform-imports',
    {
      '@material-ui/core': {
        transform: `@material-ui/core/${path}`,
        preventFullImport: true,
      },
      '@material-ui/icons': {
        transform: `@material-ui/icons/${path}`,
        preventFullImport: true,
      },
    },
  ];
};

module.exports = {
  presets: ['next/babel'],

  env: {
    client: {
      plugins: [getMUIImportsPlugin('client')],
    },
    server: {
      plugins: [getMUIImportsPlugin('server')],
    },
  },
};
