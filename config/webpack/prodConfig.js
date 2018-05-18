const createBaseConfig = require('./createBaseConfig')

module.exports = createBaseConfig({ isProd: true }).toConfig()
