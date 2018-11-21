// const { injectBabelPlugin } = require('react-app-rewired');
// const rewireMobX = require('react-app-rewire-mobx');

// module.exports = function override(config, env) {
//   config = injectBabelPlugin('babel-plugin-styled-components', config);
//   config = rewireMobX(config, env);

//   return config;
// };

const { override, addBabelPlugin, addDecoratorsLegacy, disableEsLint } = require('customize-cra');

module.exports = override(addBabelPlugin('babel-plugin-styled-components'), addDecoratorsLegacy(), disableEsLint());
