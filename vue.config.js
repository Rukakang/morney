const path = require('path');
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/morney-website/'
    : '/'

module.exports = {
  publicPath: BASE_URL,
  lintOnSave: false,
  chainWebpack:config=>{
    const dir = path.resolve(__dirname,'src/assets/icons');
    config.module
        .rule('svg-sprite')
        .test(/\.svg$/)
        .include.add(dir).end() //包含icons目录
        .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract:false}).end()
        .use('svgo-loader').loader('svgo-loader')
        .tap(options=>({...options,plugins:[{removeAttrs:{attrs:'fill'}}]})).end()
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    config.plugin('svt-sprite').use(require('svg-sprite-loader/plugin'),[{plainSprite:true}])
    config.module.rule('svg').exclude.add(dir)//其他 svg loader 排除 icons 目录
  }
}
