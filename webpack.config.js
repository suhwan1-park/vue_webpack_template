// 브라우저 환경이 아닌 nodejs 환경에서 실행 됨

// import
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

// export
module.exports = {   
    resolve: {
        // 경로에서 확장자 생략 설정
        extensions: ['.js', '.vue'],
        // 경로 별칭 설정
        alias: {
          '~': path.resolve(__dirname, 'src'),
          'assets': path.resolve(__dirname, 'src/assets')
        }
      },
    // 파일을 읽어들이기 시작하는 진입점 설정
    entry: './src/main.js',

    // 결과물(번들)을 반환하는 설정
    output: {
        // 절대경로로 path를 설정해주어야 함
        // 아래 코드 주석처리 한 이유는 Default로 dist 폴더 / main.js로 결과물이 남게 됨.
        // path: path.resolve(__dirname, 'dist'),
        // filename: 'main.js',

        // 기존에 실행한 파일들 제거 후 새로 생성
        clean: true
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.s?css$/,
                use: [
                    // 아래 기입하는 순서가 중요함.
                    'vue-style-loader',
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // 제외할 경로
                use: [
                  'babel-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                use: 'file-loader'
            }
        ]
    },

    plugins: [
        new HtmlPlugin({
            template: './index.html'
        }),
        new CopyPlugin({
            patterns:[
                // static 폴더를 dist에 복사하겠다는 의미
                {from : 'static'}
            ]
        }),
        new VueLoaderPlugin()
    ],

    devServer:{
        host: 'localhost',
    }
}