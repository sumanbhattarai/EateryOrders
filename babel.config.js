module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          components: './src/components',
          screens: './src/screens',
          assets: './src/assets',
          navigators: './src/navigators',
          utils: './src/utils',
          store: './src/store',
          animation: './src/animation',
          hooks: './src/hooks',
        },
      },
    ],
  ],
};
