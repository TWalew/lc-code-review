const entries = {
  shared: [
    './app/index.tsx',
  ],

  appShell: {
    import: [
      './styles/global/index.scss',
    ],
    dependOn: 'shared',
  },
};

module.exports = entries;
