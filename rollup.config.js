import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'lib/index.js',
    output: {
      name: 'canAutoplay',
      file: 'build/can-autoplay.js',
      format: 'umd',
    },
    plugins: [
      babel({
        babelrc: false,
        exclude: ['node_modules/**'],
        "presets": [
          ["env", {
            "targets": {
              "browsers": ["last 2 versions", "safari >= 8", "ie 11"]
            },
            "modules": false
          }]
        ]
      })
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // the `targets` option which can specify `dest` and `format`)
  {
    entry: 'lib/index.js',
    targets: [
      { dest: pkg.main, format: 'cjs' },
      { dest: pkg.module, format: 'es' }
    ],
    plugins: [
      babel({
        babelrc: false,
        exclude: ['node_modules/**'],
        "presets": [
          ["env", {
            "targets": {
              "browsers": ["last 2 versions", "safari >= 8", "ie 11"]
            },
            "modules": false
          }]
        ]
      })
    ]
  }
];
