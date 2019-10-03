/**
 * Обучаам баристу инвентаризации.
 * Делается заказ, бариста проверяет, есть ли в меню такие кофе и печенье,
 * сверяется с рецептом, смотрит наличие ингредиентов
 * и готовит заказ / извиняется и дозаказывает ингредиенты
 */

const recipes = {
    'банановый латте': ['банановый сироп', 'молоко', 'кофе'],
    'черничный капучино': ['черничный сироп', 'молоко', 'кофе'],
    'баунти раф': ['раф-основа', 'кокосовое молоко', 'розовая соль'],
    'американо': ['кофе']
}

const cookies = ['шоколадное', 'овсяное', 'мятное', 'малиновое']

const box = {
    'банановый сироп': 2,
    'черничный сироп': 0,
    'молоко': 10,
    'кофе': 10,
    'раф-основа': 3,
    'кокосовое молоко': 0,
    'розовая соль': 1
}

function checkOrderItem(order, menu) {

    if((Object.keys(menu).includes(order)) || (menu.includes(order)))
        return true;
    else return false;

}



function checkIngredients(coffee){

    var arr = recipes[coffee];
    let i=0;
    arr.forEach(function(item) {

        if (parseInt(box[item])===0)
        {console.log("Памятка: Нужно заказать "+item+'!'); i=i+1;}
    });

    if(i===0)
        return true;
    else return false;


}



function order(coffee, cookie) {

    let answer ='';

    if(coffee==null){
        if (!checkOrderItem(cookie, cookies))
            answer= 'nojustCookie';
        else answer= 'justCookie';}

    if(cookie==undefined){
        if(checkOrderItem(coffee, recipes)){
            if (checkIngredients(coffee))
                answer = 'justCoffee';
            else answer = 'nojustCoffee';
        }
        else   answer = 'nojustCoffee';
    }

    if((cookie!=undefined)&&(coffee!=null))

    {if (!checkOrderItem(cookie, cookies))
        answer= 'noCookie';
    else answer= 'Cookie';


        if(checkOrderItem(coffee, recipes)){
            if (checkIngredients(coffee))
                answer = answer+ 'Coffee';
            else answer = answer+ 'noCoffee';
        }
        else   answer = answer+ 'noCoffee';}



    switch(answer){
        case 'CookieCoffee': answer = 'allOk';break;
        case 'noCookieCoffee': answer = 'noCookie';break;
        case 'CookienoCoffee': answer = 'noCoffee';break;
        case 'noCookienoCoffee': answer = 'allNotOk';break;
        case 'justCoffee': answer = 'justCoffee';break;
        case 'nojustCoffee': answer = 'allNotOk';break;
        case 'justCookie': answer = 'justCookie';break;
        case 'nojustCookie': answer = 'allNotOk';

    }


    const dictionary = {
        allOk:`Вот ваш заказ: ${coffee} и ${cookie} печенье! Хорошего дня!`,
        allNotOk:`Мы не можем обработать ваш заказ, извините.`,
        noCookie:`К сожалению, у нас нет такого печенья. Вот ваш ${coffee}`,
        justCookie:`Вот ваш заказ: ${cookie}! Хорошего дня!`,
        justCoffee:`Вот ваш заказ: ${coffee}! Хорошего дня!`,
        noCoffee:`К сожалению, сейчас не можем приготовить ${coffee}. Вот ваше ${cookie} печенье`,}


    console.log(dictionary[answer]);

    console.log('-----Следующий заказ-----')
}


order('американо', 'мятное')
//order('баунти раф', 'апельсиновое')
//order('банановый латте', 'мятное')
//order('баунти раф', 'малиновое')


order ('американо')
order('баунти раф');
order (null, 'малиновое')






// Ожидаемый вывод //
/*
"Вот ваш заказ: американо и мятное печенье! Хорошего дня!"
"-----Следующий заказ-----"
"--Памятка: Нужно заказать кокосовое молоко"
"Мы не можем обработать ваш заказ, извините."
"-----Следующий заказ-----"
"Вот ваш заказ: банановый латте и мятное печенье! Хорошего дня!"
"-----Следующий заказ-----"
"--Памятка: Нужно заказать кокосовое молоко"
"К сожалению, сейчас не можем приготовить баунти раф. Вот ваше малиновое печенье"
"-----Следующий заказ-----"
*/
