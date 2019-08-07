/*
 * This file is part of React-SearchKit.
 * Copyright (C) 2018 CERN.
 *
 * React-SearchKit is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false,
  },
  babel: {
    env: { targets: '> 0.25%, not dead' }, // https://babeljs.io/docs/en/babel-preset-env#targets
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@app': './src',
          },
        },
      ],
      [
        '@babel/plugin-transform-runtime',
        {
          regenerator: true,
        },
      ],
      '@babel/plugin-proposal-class-properties',
    ],
    presets: '@babel/preset-react',
  },
};
