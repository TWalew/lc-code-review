const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const deps = require('./package.json').dependencies;
const entries = require('./entrypoints.config');
const { type } = require('os');

module.exports = (env, argv) => {
  const isProd = env.production;
  const isDev = !isProd;

  // style files regexes
  const cssRegex = /\.css$/;
  const cssModuleRegex = /\.module\.css$/;
  const sassRegex = /\.(scss|sass)$/;
  const sassModuleRegex = /\.module\.(scss|sass)$/;
  const cssModuleLocalIdent = isProd
    ? '[hash:base64]'
    : '[path][name]__[local]';

  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: require.resolve('css-loader'),
        options: {
          url: false,
          ...cssOptions,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
      },
    ].filter(Boolean);

    if (preProcessor) {
      loaders.push({
        loader: require.resolve(preProcessor),
      });
    }
    return loaders;
  };

  return {
    mode: isProd ? 'production' : 'development',

    performance: {
      hints: false,
    },

    optimization: {
      minimize: isProd ? true : false,
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
    },

    devtool: isProd ? undefined : 'eval-cheap-module-source-map',

    context: path.resolve(__dirname, 'src'),

    entry: entries,

    output: {
      filename: isProd ? 'js/[name].[contenthash].js' : 'js/[name].js',
      path: `${__dirname}/bundles/`,
      publicPath: '/',
      globalObject: 'self',
    },
    devServer: {
      historyApiFallback: {
        index: '/index.html',
      },
      hot: true,
      compress: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: 'last 2 versions' } },
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
          },
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: {
            loader: 'ts-loader',
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
            },
          },
          exclude: /(node_modules|bower_components)/,
        },
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: getStyleLoaders({
            importLoaders: 1,
            modules: {
              compileType: 'icss',
            },
          }),
          // Don't consider CSS imports dead code even if the
          // containing package claims to have no side effects.
          // Remove this when webpack adds a warning or an error for this.
          // See https://github.com/webpack/webpack/issues/6571
          sideEffects: true,
        },
        // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
        // using the extension .module.css
        {
          test: cssModuleRegex,
          use: getStyleLoaders({
            importLoaders: 1,
            modules: {
              compileType: 'module',
              localIdentName: cssModuleLocalIdent,
            },
          }),
        },
        // Opt-in support for SASS (using .scss or .sass extensions).
        // By default we support SASS Modules with the
        // extensions .module.scss or .module.sass
        {
          test: sassRegex,
          exclude: sassModuleRegex,
          use: getStyleLoaders(
            {
              importLoaders: 3,
              modules: {
                compileType: 'icss',
              },
            },
            'sass-loader',
          ),
          // Don't consider CSS imports dead code even if the
          // containing package claims to have no side effects.
          // Remove this when webpack adds a warning or an error for this.
          // See https://github.com/webpack/webpack/issues/6571
          sideEffects: true,
        },
        // Adds support for CSS Modules, but using SASS
        // using the extension .module.scss or .module.sass
        {
          test: sassModuleRegex,
          use: getStyleLoaders(
            {
              importLoaders: 3,
              modules: {
                compileType: 'module',
                localIdentName: cssModuleLocalIdent,
              },
            },
            'sass-loader',
          ),
        },

        // exposing React, ReactDOM, because ReactJS.net needs it on the global object
        {
          test: require.resolve('react'),
          loader: 'expose-loader',
          options: {
            exposes: 'React',
          },
        },
        {
          test: require.resolve('react-dom'),
          loader: 'expose-loader',
          options: {
            exposes: 'ReactDOM',
          },
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                limit: 100,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|ico|css)$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new ExternalTemplateRemotesPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        hash: true,
        template: path.join(__dirname, 'public', 'index.html'),
        favicon: path.join(__dirname, 'public', 'favicon.ico'),
        manifest: path.join(__dirname, 'public', 'manifest.json'),
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: '../tsconfig.json',
        },
      }),
      new MiniCssExtractPlugin({
        filename: isProd ? 'css/[name][contenthash].css' : 'css/[name].css',
      }),
      new LodashModuleReplacementPlugin(),
    ],
    resolve: {
      alias: {
        components: path.resolve(__dirname, './src/components/'),
        stores: path.resolve(__dirname, './src/stores/'),
        styles: path.resolve(__dirname, './src/styles/'),
        utils: path.resolve(__dirname, './src/utils/'),
        app: path.resolve(__dirname, './src/app/'),
        public: path.resolve(__dirname, './public/'),
        pages: path.resolve(__dirname, './src/pages/'),
        router: path.resolve(__dirname, './src/router/'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'],
      fallback: { timers: false },
    },
  };
};
