import axios from 'axios'
import { Meat } from './meat'
import { Eggs } from './eggs'
import { Milk } from './milk'
import { Beer } from './beer'
import { Bread } from './bread'
import totalWeight from './total-weight'
import numberOfItems from './number-of-items'
import numberOfProducts from './number-of-products'
import color from './color'
import style from './style.css'

axios({
    method: 'get',
    url: '/api/list'
})

    /* list2 -> list1 */
    .then((response) => {
        response.data.forEach(function (item) {
            item.costs = item.costsPerItem * item.items.length
            item.params = {}
            item.params.count = item.items.length
            item.params.weight = item.items[0].weight
            item.params.color = item.items[0].color
            delete item.items
            delete item.costsPerItem
        })
        return Promise.resolve(response)
    })

    .then((response) => {
        const list = []
        /* Создаем экзампляры разных классов (продуктов), добавляем в массив */
        response.data.forEach(function (item) {
            switch (item.title) {
            case 'Мясо': list.push(new Meat(item)); break
            case 'Яйца':list.push(new Eggs(item)); break
            case 'Пиво':list.push(new Beer(item)); break
            case 'Молоко':list.push(new Milk(item)); break
            case 'Хлеб':list.push(new Bread(item)); break
            }
        })
        return Promise.resolve(list)
    })

    .then((list) => {
        // Работа со списком параметров корзины
        const statisticsNode = document.createElement('dl')
        statisticsNode.classList.add(style.statistics)

        /* Выводим общую сводку по корзине */
        statisticsNode.innerHTML =
            `<dt>Суммарный вес корзины</dt>` +
            `<dd class=${style.term}>${totalWeight(list)} кг</dd>` +
            `<dt>Количество наименований</dt>` +
            `<dd class=${style.term}>${numberOfItems(list)}</dd>` +
            `<dt>Количество продуктов</dt>` +
            `<dd class=${style.term}>${numberOfProducts(list)}</dd>` +
            `<dt>Цвет корзины</dt>` +
            `<dd class=${style.term}>${color(list)}</dd>`

        document.body.appendChild(statisticsNode)

        /* Выводим инфу о продукте и его методы */
        list.forEach(function (item) {
            let elemWindow = document.createElement('div')
            elemWindow.classList.add(style.window)
            elemWindow.id = `${item.title}`

            elemWindow.innerHTML = `<div id="${item.id}info"> <p> Название: ${item.title} </p>` +
                `<p>Стоимость: ${item.costs} рублей </p>` +
                `<p>Вес (1): ${item.params.weight} кг </p>` +
                `<p>Количество: ${item.params.count} шт</p><hr> </div>` +
                `<button id="${item.id}1"> </button>` +
                `<button id="${item.id}2"> </button>`

            document.body.appendChild(elemWindow)

            /* Добавляем кнопки взаимодействия с каждым продуктом */
            const button1 = document.getElementById(`${item.id}1`)
            const button2 = document.getElementById(`${item.id}2`)

            switch (item.title) {
            case 'Мясо':
            case 'Яйца':
                button1.innerText = `Пожарить ${item.title}`
                button2.innerText = `Съесть ${item.title}`
                button2.disabled = true
                button1.addEventListener('click', function (event) {
                    item.roast()
                    button2.disabled = false
                    button1.disabled = true
                })
                button2.addEventListener('click', function (event) {
                    item.eat()
                    button2.disabled = true
                    button1.disabled = false
                    update(item, item.title)
                }); break

            case 'Пиво':
            case 'Молоко':
                button1.innerText = `Налить ${item.title}`; button2.innerText = `Выпить ${item.title}`
                button2.disabled = true
                button1.addEventListener('click', function (event) {
                    item.pour()
                    button2.disabled = false
                    button1.disabled = true
                })
                button2.addEventListener('click', function (event) {
                    item.drink()
                    button2.disabled = true
                    button1.disabled = false
                    update(item, item.title)
                }); break

            case 'Хлеб':
                button1.innerText = `Нарезать ${item.title}`; button2.innerText = `Съесть ${item.title}`
                button1.addEventListener('click', function (event) {
                    item.slice()
                })
                button2.addEventListener('click', function (event) {
                    item.eat(); update(item, item.title)
                })
            }

            document.body.appendChild(elemWindow)

            /* Обновляем общую сводку, при изменении кол-ва продукта */
            function update (item) {
                item.costs -= item.costs / item.params.count
                item.params.count -= 1

                /* Если продукта нет - взаимодействовать с ним нельзя */
                if (item.params.count === 0) { button1.disabled = true; button2.disabled = true }

                document.getElementById(`${item.id}info`).innerHTML = `<p> Название: ${item.title} </p>` +
                    `<p>Стоимость: ${item.costs} </p>` +
                    `<p>Вес (1): ${item.params.weight} </p>` +
                    `<p>Количество: ${item.params.count} </p><hr>`

                statisticsNode.innerHTML =
                    `<dt>Суммарный вес корзины</dt>` +
                    `<dd class=${style.term}>${totalWeight(list)} кг</dd>` +
                    `<dt>Количество наименований</dt>` +
                    `<dd class=${style.term}>${numberOfItems(list)}</dd>` +
                    `<dt>Количество продуктов</dt>` +
                    `<dd class=${style.term}>${numberOfProducts(list)}</dd>` +
                    `<dt>Цвет корзины</dt>` +
                    `<dd class=${style.term}>${color(list)}</dd>`
            }
        })
    })

    .catch(() => {
        document.body.innerHTML = 'Сервис недоступен!'
    })
