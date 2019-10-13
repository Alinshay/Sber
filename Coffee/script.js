function Machine() {
    this.banana = 500; //по 500
    this.vanilla = 500;
    this.cherry = 500;//500
    this.milk = 1000;//1000
    this.bigCup = 6;//6
    this.smallCup = 5;//5

    /*Проверяем наши запасы. Блокируем кнопки, которые на данный момент недоступны*/
    this.block = function(){
        disabled_on('syrup');

        if(this.banana < 50)
            disabled_on('banana');
        else disabled_off('banana');

        if(this.vanilla < 50)
            disabled_on('vanilla');
        else disabled_off('vanilla');

        if(this.milk < 120)
            disabled_on('flatWhite');
        else disabled_off('flatWhite');

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
            disabled_on('milk');
        else disabled_off('milk');

        disabled_off('espresso');

        if(this.bigCup < 1) {
            disabled_on('flatWhite');
            disabled_on('banana');
            disabled_on('vanilla');}

        else {
            disabled_off('flatWhite');
            disabled_off('banana');
            disabled_off('vanilla');}

        if((this.smallCup < 1)&&(this.bigCup < 1)){
            document.querySelectorAll('.drink').forEach(function (item) {item.disabled = 1;})
        }
    }

    /*Запас стаканчиков*/
    this.checkCup = function (coffee) {
        if (coffee.volume > 250) {
            if (this.bigCup > 0)
                this.bigCup -= 1;
        }

        else {
            if (this.smallCup > 0)
                this.smallCup -= 1;
           else {
                if (this.bigCup > 0)
                    this.bigCup -= 1;
            }
        }
        console.log(`Больших - ${this.bigCup}; Маленьких - ${this.smallCup}`);
        return true;

    }

    /*Запас молока*/
        this.checkMilk = function(coffee){
            if((coffee.name.includes('латте')) || (coffee.name.includes('Латте')))
            {if((this.milk - 100 - coffee.milk*50)>=0)
                this.milk = this.milk - 100 -coffee.milk*50;
            }

            if(coffee.name.includes('Капучино'))
            {if((this.milk - 80 - coffee.milk*50)>=0)
                this.milk = this.milk - 80 -coffee.milk*50;
            }

            if(coffee.name.includes('Флэт уайт'))
            {if((this.milk - 120 - coffee.milk*50)>=0)
                this.milk = this.milk - 120 -coffee.milk*50;
            }

            console.log(`Молока - ${this.milk}`);

        }

        /*Запас сиропа*/
    this.checkSyrup = function(coffee){
        if(this.cherry > 0)
            this.cherry = this.cherry - coffee.syrup*50;

        if(coffee.name.includes('Банановый'))
            if(this.banana > 0)
                this.banana -= 50;

        if(coffee.name.includes('Ванильный'))
            if(this.vanilla > 0)
                this.vanilla -= 50;

        console.log(`Вишневый - ${this.cherry}; Банановый - ${this.banana}; Ванильный - ${this.vanilla}`);

    }
}


function Ingredient(){
    this.name ='';
    this.cost = 0;
    this.volume = 0;
    this.type = '';
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
        if((this.name!=='')&&(CoffeeMachine.cherry>=50))
            disabled_off('syrup');

        /*Нельзя добавлять более 2 порций сиропа*/
        if(this.syrup===2){
            disabled_on('syrup');
        }

        /*Если выбрали авторский - можно только расплатиться*/
        if((this.name === 'Банановый латте')|| (this.name === 'Ванильный латте')||(this.name === 'Флэт уайт'))
        {
            document.querySelectorAll('.drink').forEach(function (item) {item.disabled = 1;})
        }

        /*Если выбрано что-то кроме авторских, заказать их уже нельзя*/
        if((this.name !== 'Банановый латте')|| (this.name !== 'Ванильный латте')||(this.name !== 'Флэт уайт')||(this.name!==''))
        {
            disabled_on('banana');
            disabled_on('vanilla');
            disabled_on('flatWhite');
        }

        /*Блокируем кнопки, которые не пройдут по объему стаканчика*/
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
        /*Если что-то добавили - расплатиться можно*/
        disabled_off('payment');
        disabled_on('register');

        /*Считаем стоимость напитка*/
        this.cost = this.cost + ingredient.cost;

        /*Считаем объем напитка*/
        this.volume = this.volume + ingredient.volume;

        /*При добавлении сиропа или молока напиток становится кастомным*/
        if (ingredient.type === 'syrup') {
            this.syrup += 1;
            this.type = 'custom';
            this.time = 8;
        }

        if (ingredient.type === 'milk') {
            this.milk += 1;
            this.type = 'custom';
            this.time = 8;
        }

        /*Авторские*/
        if (ingredient.type === 'author') {
            this.type = ingredient.type;
            this.time = 5;
        }

        /* НАЗВАНИЕ НАПИТКА */
        /* Выводим название 'Молоко', если выбрано только молоко */
        if(((this.name.search(/Молоко \(.\)/g)!==-1)||(this.name===''))&&(ingredient.name === 'Молоко'))
        {
            if(this.milk === 1)
                this.name +=`Молоко (1)`;
            else
                this.name = this.name.replace(/Молоко \(.\)/g, `Молоко (${this.milk})`);

        }

        /*Добавляем название кофе в название напитка*/
        if((ingredient.name !== 'Сироп')&&(ingredient.name !== 'Молоко')) {
            this.name = this.name.replace(/Молоко \(.\)/g, '');
            if (this.name === '')
                this.name = this.name + ingredient.name;
            else
                this.name = this.name + ' + ' + ingredient.name;
        }

        /*При выборе 2/3 порций эспрессо - выводим двойной/тройной*/
        if(ingredient.name === 'Эспрессо') {

            if((this.name.search(/Двойной эспрессо/g)!==-1)&&(this.name.search(/\+ Эспрессо/g)!==-1))
            {
                this.name = this.name.replace('Двойной эспрессо', 'Тройной эспрессо');
                this.name = this.name.replace('+ Эспрессо', '');
            }

            if(this.name.split("Эспрессо").length - 1 === 2)
            {this.name = this.name.replace('Эспрессо', 'Двойной эспрессо');
                this.name = this.name.replace('+ Эспрессо', '');
                this.name = this.name.replace('Эспрессо', '');}
        }

        /*Сироп в названии напитка*/
        if(this.syrup===1) {
            this.name = this.name.replace(/ с сиропом/g,'')
            this.name += ' с сиропом';
        }

        if(this.syrup===2) {
            this.name = this.name.replace(/ с сиропом/g,'');
            this.name = this.name.replace(/ с 2 порциями сиропа/g,'');
            this.name += ' с 2 порциями сиропа';
        }

        /*Молоко в названии напитка*/
        if (this.name.search(/Молоко/g)===-1)
        {
            if ((this.milk > 0) && (this.syrup > 0)) {
                this.name = this.name.replace(/ и/g, '');
                this.name += ' и';
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

        }

        this.check();

    }
}

const CoffeeMachine = new Machine();



        function logic() {

        CoffeeMachine.block();
        const div = document.getElementById('name'); /*место для вывода имени напитка*/
        const menu = document.getElementById('menu'); /*окно с маленькой картинкой*/
        document.getElementById('window1').style.display = 'none';
        document.getElementById('window2').style.display = 'none';
        document.getElementById('cancel').onclick = logic;

        div.innerHTML = '<p>Сделайте заказ</p>';

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
            disabled_on('payment');/*пока ничего не выбрано - платить нельзя*/

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

                 CoffeeMachine.checkCup(Coffee);
                 CoffeeMachine.checkMilk(Coffee);
                 CoffeeMachine.checkSyrup(Coffee);
                 document.getElementById('window1').style.display = 'none';
                 document.getElementById('window2').style.display = 'none';

                    /*Во премя приготовления напитка ничего нажать нельзя*/
                    document.querySelectorAll('.coffee').forEach(function (item) {
                        item.disabled = 1;
                    })

                    disabled_on('cancel');
                    disabled_on('cardNum');


                    /*Загружаем картинку*/
                    let loadPic = '';
                    fetch(`https://source.unsplash.com/300x200/?coffee`)
                        .then(function (data) {
                            return loadPic = `${data.url}`;
                        }, function () {
                            return loadPic = `default.png`;
                        });

                    if (Coffee.time > 0) {
                        const elem = document.getElementById("greenBar");
                        let width = 1;//ширина прогрессбара
                        let id = setInterval(frame, Coffee.time * 10);
                        function frame() {
                            if (width < 100) {
                                width += 1;
                                elem.style.width = width + '%';
                                elem.innerHTML = width + '%';}
                            else {
                                clearInterval(id);
                                /*Добавляем загруженную картинку*/
                                menu.style.background = `no-repeat center/100% url(${loadPic}) tan`;
                                get();}
                        }
                    }
        }


            function get() {
                const cup = document.getElementById('get');
                cup.innerHTML = '<img alt="" src="content/cup.png">';
                cup.classList.add('blink');
                const music_timer = setTimeout(function(){div.innerHTML += '<audio src="content/music.mp3" autoplay> </audio>';}, 5000);
                const last_timer = setTimeout(function(){
                    clearInterval(music_timer);
                    div.innerHTML = `<p><strong> ВАШ НАПИТОК ${Coffee.name} НАХОДИТСЯ В ЗОНЕ ВЫДАЧИ!</strong> </p>`;
                    cup.classList.remove('blink');
                    }, 20000);

                    /*Забираем напиток - выключаем все напоминания*/
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

                    disabled_off('cancel');
                    disabled_off('cardNum');
                    disabled_off('register');


                    logic();
                };


            }


         /*Выводим название и стоимость на экран*/
        function input(coffee) {
            const div = document.getElementById('name');
            if (Coffee.name !== '') {
                if (dis === 0)
                    div.innerHTML = `<p>Ваш напиток <strong>${coffee.name}</strong> стоимостью ${coffee.cost} рублей </p>`;
                if (dis === 1)
                    div.innerHTML = `<p>Ваш напиток <strong>${coffee.name}</strong> стоимостью ${coffee.cost * 0.95} рублей со скидкой 5%</p>`;
                }
        }

        /*Всплывающие окна*/
        document.getElementById('cardNum').onclick = function(){
            if(document.getElementById('window1').style.display==='none'){
            document.getElementById('window1').style.display = 'block';
            document.getElementById('window2').style.display = 'none';}
        else document.getElementById('window1').style.display = 'none';
        };

        document.getElementById('register').onclick = function() {
            if (document.getElementById('window2').style.display === 'none') {
                document.getElementById('window2').style.display = 'block';
                document.getElementById('window1').style.display = 'none';
            } else document.getElementById('window2').style.display = 'none';
        }


        /*Проверяем есть ли код в базе client_db.json*/
        let dis = 0;
        document.getElementById('check').onclick = function discountList() {
            document.getElementById('window1').style.display = 'none';
            fetch('./client_db.json')
                .then(response => response.json())
                .then (function (data) {
                    data.forEach(function (item) {
                        if (item.code === document.getElementById('code').value) {
                            dis = 1;
                            console.log('Скидка 5%');
                            if ((div.innerHTML !== '') && (Coffee.name !== ''))
                                div.innerHTML = `<p>Ваш напиток <strong>${Coffee.name}</strong> стоимостью ${Coffee.cost * 0.95} рублей со скидкой 5%</p>`;
                        }
                    }
                    );
        })
        }


        /* Нет серверной части*/
        document.getElementById('ok').onclick = function form() {

            const object = {};
            const formData = new FormData(formElem);
            formData.forEach(function (value, key) {
                object[key] = value;
            });
            const json = JSON.stringify(object);
            console.log(json);

            document.getElementById('formElem').onsubmit = async () => {
                const response = await fetch('./', {
                    method: 'POST',
                    body: json
                });

                const result = await response.json();
                alert(result.message);/*должен отдавать номер карты*/
            };
        };

    }




function disabled_on(id){
        document.getElementById(id).disabled = 1;
   }

    function disabled_off(id){
        document.getElementById(id).disabled = 0;
    }


/*
TODO:
- верстка окон

- Кнопки туда-сюда
- Запуск кода, как сказала Наташа

*/

