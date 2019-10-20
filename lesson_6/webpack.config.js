const path = require('path')
const webpack = require('webpack')

const postcssColorPantone = require('postcss-color-pantone')
const postcssNested = require('postcss-nested')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CopyPlugin = require('copy-webpack-plugin')
const output = path.resolve(__dirname, 'target')



module.exports = {
    entry: {
        // Входная точка
        index: require.resolve('./src/index.js')
    },
    output: {
        // Выходная точка
        path: output,
        // Имя основного результирующего файла
        filename: 'index.js'
    },

    module: {
        // Правила, тут объявляются лоадеры
        rules: [
            // js-файлы
            {
                test: /\.js$/,
                exclude: /node_modules[\\/].*/,
                // Лоадер транспайлинга кода
                use: require.resolve('babel-loader')
            },
            // css-файлы
            {
                test: /\.css$/,
                use: [
                    // Два лоадера всегда вместе - добавить в сборку, дать возможность применять по импорту
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            // css-modules используются для изоляции классов
                            modules: true,
                            // Впереди лоадера есть еще 1 лоадер
                            importLoaders: 1
                        }
                    },
                    // CSS-ный аналог babel
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            plugins: [
                                // Вложенные блоки css
                                postcssNested,
                                postcssColorPantone
                            ]
                        }
                    }
                ]
            }
        ]
    },
    // Плагины - это лоадеры на стероидах
    plugins: [
        // Перекладывать файлы в сборку
        new CopyPlugin([
            {
                from: 'static',
                to: '.'
            }
        ])
    ]
}

// Добавлять только в прод.сборке
if (process.env.NODE_ENV === 'production') {
    // Инструмент для анализа размера бандла и его кусков
    module.exports.plugins.push(
        new BundleAnalyzerPlugin({
            reportFilename: './statistics.html',
            analyzerMode: 'static',
            openAnalyzer: false
        })
    )
    //Минимайзер
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    )
}
