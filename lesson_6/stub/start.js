const express = require('express')
const webpack = require('webpack')
const bodyParser = require('body-parser')

const webpackDevMiddleware = require('webpack-dev-middleware')

const webpackConfig = require('../webpack.config')
//const list1 = require('./services/list-1.json')
const list2 = require('./services/list-2.json')

// Мидлвара, откладывающая на 1 секунду ответ для всех сервисов, принадлежащих ей
const timeoutMiddleware = (req, res, next) => setTimeout(next, 1000)

// Роутер - срез переиспользуемых совокупностей сервисов и мидлвар
const apiRouter = express.Router()
    // сервис
    .get('/list', (req, res) => {
        res.send(list2)
    })

// Функция, которая осуществляет сборку
const compiler = webpack(webpackConfig)

express()
    // Автоматически парсит входящие json
    .use(bodyParser.json())
    // Предоставляет доступ к файлам сборки в рантайме
    .use(webpackDevMiddleware(compiler))
    // Монтирование по контексту /api мидлвара на таймаут и роутер сервисов
    .use('/api', [timeoutMiddleware, apiRouter])
    // Активация сервера
    .listen(4242, null, () => {
        console.log('http://localhost:4242/index.html')
    })
