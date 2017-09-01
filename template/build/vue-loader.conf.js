var utils = require('./utils')
var config = require('../config')
var envToSourceMap = {"deploy": config.deploy.productionSourceMap, "production": config.build.productionSourceMap}
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: envToSourceMap[process.env.NODE_ENV] || config.dev.cssSourceMap,
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
