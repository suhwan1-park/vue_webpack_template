// 브라우저 환경이 아닌 nodejs 환경에서 실행 됨

// import
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

// export
module.exports = {    
    // 파일을 읽어들이기 시작하는 진입점 설정
    entry: './js/main.js',

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
                test: /\.s?css$/,
                use: [
                    // 아래 기입하는 순서가 중요함.
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
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
        })
    ],

    devServer:{
        host: 'localhost'
    }
}