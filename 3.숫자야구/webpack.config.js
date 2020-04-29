const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path');

module.exports = {
  mode: 'development', // 'production'
  devtool: 'eval', // 'hidden-source-map', 'eval'(웹팩빌드속도빠름)
  resolve: {
    extensions: ['.js', '.vue']  // 확장자 처리
  },
  entry: {
    // main.js에 연결된 여러 js들이 하나도 합쳐지게 된다
    app: path.join(__dirname, 'main.js')  
  },
  module : {  // module:어떻게 합칠건지를 정하는 부분
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'  // use, loader 같은 기능
    }]
  },
   plugins: [
     new VueLoaderPlugin()
   ],
   output: {
     filename: '[name].js',
     path: path.join(__dirname, 'dist')
   }
}