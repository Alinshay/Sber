function Machine() {
    this.banana = 500; //по 500
    this.vanilla = 500;
    this.cherry = 500;//500
    this.milk = 1000;//1000
    this.bigCup = 6;//6
    this.smallCup = 5;//5

    this.block = function(){
        /*Нужно ли это вообще и как глубоко нужно заходить?*/
        if(this.cherry < 50)
            document.getElementById('syrup').disabled=1;


        if(this.banana < 50)
            document.getElementById('banana').disabled=1;
        else document.getElementById('banana').disabled=0;

        if(this.vanilla < 50)
            document.getElementById('vanilla').disabled=1;
        else document.getElementById('vanilla').disabled=0;

        if(this.milk < 120)
            document.getElementById('flatWhite').disabled=1;
        else document.getElementById('flatWhite').disabled=0;

        if(this.milk <100) {
            disabled_on('latte');
            disabled_on('banana');
            disabled_on('vanilla');
        }
        else {
            disabled_off('latte');
            disabled_off('banana');
            disabled_off('vanilla');
        }

        if(this.milk < 80)
            disabled_on('cappuccino');
        else disabled_off('cappuccino');

        if(this.milk < 50)
            document.getElementById('milk').disabled=1;
        else document.getElementById('milk').disabled=0;

        if(this.bigCup < 1) {
            disabled_on('flatWhite');
            disabled_on('banana');
            disabled_on('vanilla');}

        else {
            disabled_off('flatWhite');
            disabled_off('banana');
            disabled_off('vanilla');}

        disabled_off('espresso');


    }

    this.checkCup = function (coffee) {
        if (coffee.volume > 250) {
            if (this.bigCup > 0)
                this.bigCup -= 1;
            else
                {console.log('Ошибка! Не осталось больших стаканов'); return false;}
        } else {
            if (this.smallCup > 0)
                this.smallCup -= 1;
            else {
                if (this.bigCup > 0)
                    this.bigCup -= 1;
                else {console.log('Ошибка! Не осталось никаких стаканов');  return false;}
            }
        }
        console.log(`Больших - ${this.bigCup}; Маленьких - ${this.smallCup}`);
        return true;

    }

        this.checkMilk = function(coffee){


            if((coffee.name.includes('латте')) || (coffee.name.includes('Латте')))
            {if((this.milk - 100 - coffee.milk*50)>=0)
                this.milk = this.milk - 100 -coffee.milk*50;
            else {console.log('Ошибка! Недостаточно молока'); return false;}}

            if(coffee.name.includes('Капучино'))
            {if((this.milk - 80 - coffee.milk*50)>=0)
                this.milk = this.milk - 80 -coffee.milk*50;
            else {console.log('Ошибка! Недостаточно молока'); return false;}}

            if(coffee.name.includes('Флэт уайт'))
            {if((this.milk - 120 - coffee.milk*50)>=0)
                this.milk = this.milk - 120 -coffee.milk*50;
            else {console.log('Ошибка! Недостаточно молока'); return false;}}

            console.log(`Молока - ${this.milk}`);
            return true;
        }

    this.checkSyrup = function(coffee){
        if(this.cherry > 0)
            this.cherry = this.cherry - coffee.syrup*50;
        else {console.log('Ошибка! Вишневый сироп закончился'); return false;}


        if(coffee.name.includes('Банановый'))
            if(this.banana > 0)
                this.banana -= 50;
            else {console.log('Ошибка! Банановый сироп закончился'); return false;}

        if(coffee.name.includes('Ванильный'))
            if(this.vanilla > 0)
                this.vanilla -= 50;
            else {console.log('Ошибка! Ванильный сироп закончился'); return false;}

        console.log(`Вишневый - ${this.cherry}; Банановый - ${this.banana}; Ванильный - ${this.vanilla}`);
            return true;
    }
}


function Ingredient(){
    this.name ='';
    this.cost = 0;
    this.volume = 0;
    this.type = '';
    this.link = '';
}


function Drink() {
    this.name = '';
    this.cost = 0;
    this.time = 3;
    this.volume = 0;
    this.milk = 0;
    this.syrup = 0;
    this.type = 'simple';

    this.check = function(){
        /*Нельзя наливать сироп в пустой станак*/
        if(this.name!=='')
            disabled_off('syrup');

        /*Нельзя добавлять более 2 порций сиропа*/
        if(this.syrup===2){
            disabled_on('syrup');
        }

        if((this.name === 'Банановый латте')|| (this.name === 'Ванильный латте')||(this.name === 'Флэт уайт'))
        {
            document.querySelectorAll('.drink').forEach(function (item) {item.disabled = 1;})
        }

        /*Блокировать авторские, если нажаты не они*/
        if((this.name !== 'Банановый латте')|| (this.name !== 'Ванильный латте')||(this.name !== 'Флэт уайт')||(this.name!==''))
        {
            disabled_on('banana');
            disabled_on('vanilla');
            disabled_on('flatWhite');
        }


        /*Объем*/
        /*Большие стаканы*/
        if(CoffeeMachine.bigCup>0) {
            if (380 - this.volume < 250) {
                disabled_on('latte');
                disabled_on('cappuccino');
            }

            if (380 - this.volume < 100) {
                disabled_on('espresso');
            }

            if (380 - this.volume < 50) {
                disabled_on('milk');
                disabled_on('syrup');
            }
        }
        /*Маленький стакан*/
        else {
            if (250 - this.volume < 250) {
                disabled_on('latte');
                disabled_on('cappuccino');
            }

            if (250 - this.volume < 100) {
                disabled_on('espresso');
            }

            if (250 - this.volume < 50) {
                disabled_on('milk');
                disabled_on('syrup');
            }
        }
    }

    this.add = function (ingredient) {
        disabled_off('payment');
        /*if ((ingredient.type === 'syrup') && (this.volume === 0)) {
            console.log('Ошибка! Не наливаем сироп в пустой стакан');
            return false;
        }*/

        /* if (((ingredient.type === 'syrup')||(ingredient.type === 'milk'))&&(this.type === 'author'))
        {
            console.log('Ошибка! Нельзя добавлять сироп или молоко в авторские напитки');
            return false;
        }*/

        if (ingredient.type === 'syrup') {

            /*if (this.syrup >= 2) {
                console.log('Ошибка! Нельзя налить более 100мл сиропа');
                return false;
            }*/
            this.syrup += 1;
            this.type = 'custom';
            this.time = 8;
        }

        this.volume = this.volume + ingredient.volume;
        /*if (this.volume > 380) {
            this.volume = this.volume - ingredient.volume;
            console.log('Ошибка! Переполнение стакана');
            return false;
        }*/

        if (ingredient.type === 'milk') {
            this.milk += 1;
            //if ((this.name === '')||(this.name === 'Молоко 1'))
              //  this.name = `Молоко ${this.milk}`;

            this.type = 'custom';
            this.time = 8;
        }

        if(ingredient.name === 'Эспрессо') {
            this.name = this.name.replace('Двойной эспрессо', 'Тройной эспрессо');
            this.name = this.name.replace('Эспрессо', 'Двойной эспрессо');
        }


        if((ingredient.name !== 'Сироп')&&(ingredient.name !== 'Молоко')) {
            //this.name = this.name.replace(/Молоко . /g, '');
            if (this.name === '')
                this.name = this.name + ingredient.name;
            else {
                if (ingredient.name !== 'Эспрессо')
                this.name = this.name + ' + ' + ingredient.name;
            }
        }

            this.cost = this.cost + ingredient.cost;

            if (ingredient.type === 'author') {
                this.type = ingredient.type;
                this.time = 5;
            }


        if(this.syrup===1) {
            this.name = this.name.replace(/ с сиропом/g,'')
            this.name += ' с сиропом';
        }

        if(this.syrup===2) {
            this.name = this.name.replace(/ с сиропом/g,'');
            this.name = this.name.replace(/ с 2 порциями сиропа/g,'');
            this.name += ' с 2 порциями сиропа';
        }


            if (this.milk === 1) {
                this.name = this.name.replace(/ с молоком/g, '');
                this.name += ' с молоком';
            }

            if (this.milk > 1) {
                this.name = this.name.replace(/ с молоком/g, '')
                this.name = this.name.replace(/ c . порциями молока/g, '')
                this.name += ` c ${this.milk} порциями молока`;
            }


        /*Предусмотреть, когда мы наливаем только молоко*/


        this.check();

    }
}

const CoffeeMachine = new Machine();

    function logic() {

        CoffeeMachine.block();
        const div = document.getElementById('name');
        const menu = document.getElementById('menu');

        div.innerHTML = '';


        const Espresso = new Ingredient();
        Espresso.name = 'Эспрессо';
        Espresso.cost = 90;
        Espresso.volume = 100;
        Espresso.type = 'simple';

        const Latte = new Drink();
        Latte.name = 'Латте';
        Latte.cost = 130;
        Latte.volume = 250;
        Latte.type = 'simple';

        const Cappuccino = new Ingredient();
        Cappuccino.name = 'Капучино';
        Cappuccino.cost = 110;
        Cappuccino.volume = 250;
        Cappuccino.type = 'simple';


        const Banana = new Ingredient();
        Banana.name = 'Банановый латте';
        Banana.cost = 150;
        Banana.volume = 300;
        Banana.type = 'author';

        const Vanilla = new Ingredient();
        Vanilla.name = 'Ванильный латте';
        Vanilla.cost = 150;
        Vanilla.volume = 300;
        Vanilla.type = 'author';

        const FlatWhite = new Ingredient();
        FlatWhite.name = 'Флэт уайт';
        FlatWhite.cost = 100;
        FlatWhite.volume = 280;
        FlatWhite.type = 'author';

        const Milk = new Ingredient();
        Milk.name = 'Молоко';
        Milk.cost = 25;
        Milk.volume = 50;
        Milk.type = 'milk';

        const Syrup = new Ingredient();
        Syrup.name = 'Сироп';
        Syrup.cost = 35;
        Syrup.volume = 50;
        Syrup.type = 'syrup';


        const Coffee = new Drink();
        if(Coffee.name === '')
            disabled_on('payment');

        document.getElementById('espresso').onclick = function () {
            Coffee.add(Espresso);
            input(Coffee);
        };
        document.getElementById('latte').onclick = function () {
            Coffee.add(Latte);
            input(Coffee);
        };
        document.getElementById('cappuccino').onclick = function () {
            Coffee.add(Cappuccino);
            input(Coffee);
        };
        document.getElementById('banana').onclick = function () {
            Coffee.add(Banana);
            input(Coffee);
        };
        document.getElementById('vanilla').onclick = function () {
            Coffee.add(Vanilla);
            input(Coffee);
        };
        document.getElementById('flatWhite').onclick = function () {
            Coffee.add(FlatWhite);
            input(Coffee);
        };
        document.getElementById('milk').onclick = function () {
            Coffee.add(Milk);
            input(Coffee);
        };
        document.getElementById('syrup').onclick = function () {
            Coffee.add(Syrup);
            input(Coffee);
        }

            document.getElementById('payment').onclick = make;


        function make() {

                if ((CoffeeMachine.checkCup(Coffee)) && (CoffeeMachine.checkMilk(Coffee)) && (CoffeeMachine.checkSyrup(Coffee))) {

                    //заблочить все кнопки
                    document.querySelectorAll('.coffee').forEach(function (item) {
                        item.disabled = 1;
                    })

                    document.getElementById('cancel').disabled = 1;
                    document.getElementById('check').disabled = 1;

                    let p = '';


                    fetch(`https://source.unsplash.com/300x200/?coffee`)
                        .then(function (data) {
                            return p = `${data.url}`;
                        }, function () {
                            return p = `default.png`;
                        });

                    if (Coffee.time > 0) {

                        const elem = document.getElementById("greenBar");
                        let width = 1;
                        let id = setInterval(frame, Coffee.time * 10);

                        function frame() {
                            if (width >= 100) {
                                clearInterval(id);

                                menu.style.background = `no-repeat center/100% url(${p}) tan`;
                                get();
                            } else {
                                width += 1;
                                elem.style.width = width + '%';
                                elem.innerHTML = width + '%';
                            }
                        }
                    }
                } else {
                    console.log('Попробуйте заказать что-то еще!');
                    logic();
                }


        }

            function get() {
                const cup = document.getElementById('get');
                cup.innerHTML = '<img alt="" src="cup.png">';
                cup.classList.add('blink');
                const music_timer = setTimeout(function(){div.innerHTML += '<audio src="music.mp3" autoplay> </audio>';}, 5000);
                const last_timer = setTimeout(function(){
                    clearInterval(music_timer);
                    div.innerHTML = `<p> ВАШ НАПИТОК ${Coffee.name} НАХОДИТСЯ В ЗОНЕ ВЫДАЧИ! </p>`;
                    cup.classList.remove('blink');


                    }, 20000);

                    document.getElementById('get').onclick = function () {
                    clearInterval(music_timer);
                    clearInterval(last_timer);
                        cup.classList.remove('blink');
                    document.getElementById('greenBar').style.width = '0';
                    document.getElementById('greenBar').innerHTML ='';
                    menu.style.background = `tan`;
                    cup.innerHTML = '';
                    document.querySelectorAll('.coffee').forEach(function (item) {
                        item.disabled =0;
                    });
                    document.getElementById('cancel').disabled =0;
                    document.getElementById('check').disabled =0;


                    logic();
                };


            }

        let dis = 0;
         document.getElementById('check').onclick = function discount() {
            const base = createDiscount();
            base.forEach(function (item) {
                if (item === document.getElementById('code').value)
                {   dis = 1; console.log('Скидка 5%');
                    if((div.innerHTML!=='')&&(Coffee.name !== ''))
                        div.innerHTML = `<p>Ваш напиток <strong>${Coffee.name}</strong> стоимостью ${Coffee.cost*0.95} рублей со скидкой</p>`;}
            });

        };


            function input(coffee) {
                const div = document.getElementById('name');
                if (Coffee.name !== '') {
                    if (dis === 0)
                        div.innerHTML = `<p>Ваш напиток <strong>${coffee.name}</strong> стоимостью ${coffee.cost} рублей </p>`;
                    if (dis === 1)
                        div.innerHTML = `<p>Ваш напиток <strong>${coffee.name}</strong> стоимостью ${coffee.cost * 0.95} рублей со скидкой</p>`;
                }
            }


            function createDiscount() {
                const p = ['111', 'Alino4ka', '123456'];
                return JSON.parse(JSON.stringify(p));
            }



    }

   function disabled_on(id){
        document.getElementById(id).disabled = 1;
   }

function disabled_off(id){
    document.getElementById(id).disabled = 0;
}


/*
TODO:
Узнать:
- Зачем температура напитков?

Не реализовано:
- Заголовка 'с молоком', когда наливает одно молоко

- Верстка
- Всплывающее окно с кодами из файла
- Регистрация постоянных посетителей

Недоработки:
- Сделать через функции то, что можно через них сделать


*/
