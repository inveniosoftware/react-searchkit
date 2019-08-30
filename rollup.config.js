import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import localResolve from 'rollup-plugin-local-resolve';
import resolve from 'rollup-plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json';

export default {
  input: 'src/lib/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    postcss({
      plugins: [],
      minimize: true,
      sourceMap: 'inline',
    }),
    localResolve(),
    resolve(),
    babel({
      presets: ['react-app'],
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
    commonjs(),
  ],
};
