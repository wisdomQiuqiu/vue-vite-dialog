
const config = {
  alias: {
    '@': require('path').resolve(__dirname, '/src/'),
    '~': require('path').resolve(__dirname, '/src/assets/'),
  },
  define: {
    __VALUE__: 'value',
  },
  jsx: 'vue',
  // proxy: {
  //   // string shorthand
  //   '/foo': 'http://localhost:4567/foo',
  //   // with options
  //   '/api': {
  //     target: 'http://jsonplaceholder.typicode.com',
  //     changeOrigin: true,
  //     rewrite: (path) => path.replace(/^\/api/, ''),
  //   },
  // },
}

export default config
