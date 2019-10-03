/**
 * Открываем кофешоп. Обучаем баристу общаться с клиентами.
 * Кофешоп поддерживает приют с котиками. Любой клиент может добавить пожертвование.
 *
 * menu - Наше меню с ценами.
 * baristaAsk - запрос заказа
 * baristaSay - принимает заказ, пожертвование, вычисляет цену.
 * бариста принял заказ - отвечает "Вы заказали *кофе* и сделали пожертвование. С Вас *цена кофе+донат* рублей"
 * клиент спросил что-то не из меню - "Извините, ничем не могу помочь. Хорошего дня!"
 * order - знает размер пожертвования, оперирует вопросом и ответом баристы.
 */
const menu = {
    'ЛАТТЕ': 100,
    'БАНАНОВЫЙ КАПУЧИНО': 120,
    'ВАНИЛЬНЫЙ РАФ': 110,
    'АМЕРИКАНО': 90

}

function baristaAsk(){
    let cupOfCoffee = prompt('Что желаете?', '');
    return cupOfCoffee
}


function baristaSay(coffee, charity, price) {

    if(Object.keys(menu).includes(coffee)) {
        //Object.keys - возвращает массив, содержащий ключи объекта,
        // .includes - проверяет наличие заданного аргумента в массиве
        let sum = parseInt(price)+parseInt(charity);
        console.log('Вы заказали ' + coffee +' и сделали пожертвование! С Вас '+ sum +' рублей!');}

    else
        console.log('Извините, ничем не могу помочь. Хорошего дня');

}

function order(){

    const donation = '10';
    let coffee = baristaAsk();
    baristaSay(coffee, parseInt(donation), menu[coffee.toUpperCase()]);
}

order();