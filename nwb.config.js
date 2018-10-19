module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactTabs',
      externals: {
        react: 'React',
      },
    },
  },
};
