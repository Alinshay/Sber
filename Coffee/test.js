
function Ingredient(){
    this.name ='';
    this.cost = 0;
    this.time =0;
    this.volume = 0;
    this.type = '';
    this.link = '';
}


function Drink() {
    this.name = '';
    this.cost = 0;
    this.time = 0;
    this.volume = 0;
    this.milk = 0;
    this.syrup = 0;
    this.type = '';

    this.add = function (ingredient) {

        if ((ingredient.type === 'syrup') && (this.volume === 0)) {
            console.log('Ошибка! Не наливаем сироп в пустой стакан');
            return 0;
        }

        if (((ingredient.type === 'syrup')||(ingredient.type === 'milk'))&&(this.type === 'author'))
        {
            console.log('Ошибка! Нельзя добавлять сироп или молоко в авторские напитки');
            return 0;
        }

        if (ingredient.type === 'syrup') {

            if (this.syrup >= 2) {
                console.log('Ошибка! Нельзя налить более 100мл сиропа');
                return 0;
            }
            this.syrup += 1;
            this.type = 'custom';
        }

        this.volume = this.volume + ingredient.volume;
        if (this.volume > 380) {
            this.volume = this.volume - ingredient.volume;
            console.log('Ошибка! Переполнение стакана');
            return 0;
        }

        if (ingredient.type === 'milk') {

            this.milk += 1;
            this.type = 'custom';
        }

        if(this.name==='')
            this.name = this.name + ingredient.name;
        else
            this.name = this.name +' + '+ ingredient.name;
        this.cost = this.cost + ingredient.cost;
        this.time = this.time + ingredient.time;

        if(ingredient.type === 'author')
            this.type = ingredient.type;
    }
}



function logic(){

    const div = document.getElementById('name');
    const picture = document.getElementById('picture');

    div.innerHTML = '' ;
    document.body.append(div);


    const Espresso = new Ingredient();
    Espresso.name = 'Эспрессо';
    Espresso.cost = 90;
    Espresso.volume = 100;
    Espresso.time = 3;
    Espresso.type = 'simple';

    const Latte = new Drink();
    Latte.name = 'Латте';
    Latte.cost = 130;
    Latte.volume = 250;
    Latte.time = 3;
    Latte.type = 'simple';

    const Cappuccino = new Ingredient();
    Cappuccino.name = 'Капучино';
    Cappuccino.cost = 110;
    Cappuccino.volume = 250;
    Cappuccino.time = 3;
    Cappuccino.type = 'simple';


    const Banana = new Ingredient();
    Banana.name = 'Банановый латте';
    Banana.cost = 150;
    Banana.volume = 300;
    Banana.time = 5;
    Banana.type = 'author';

    const Vanilla = new Ingredient();
    Vanilla.name = 'Ванильный латте';
    Vanilla.cost = 150;
    Vanilla.volume = 300;
    Vanilla.time = 5;
    Vanilla.type = 'author';

    const FlatWhite = new Ingredient();
    FlatWhite.name = 'Флэт уайт';
    FlatWhite.cost = 100;
    FlatWhite.volume = 280;
    FlatWhite.time = 5;
    FlatWhite.type = 'author';

    const Milk = new Ingredient();
    Milk.name = 'Молоко';
    Milk.cost = 25;
    Milk.volume = 50;
    Milk.time = 0;
    Milk.type = 'milk';

    const Syrup = new Ingredient();
    Syrup.name = 'Сироп';
    Syrup.cost = 35;
    Syrup.volume = 50;
    Syrup.time = 0;
    Syrup.type = 'syrup';


    const Coffee = new Drink();


    document.getElementById('espresso').onclick = function (){Coffee.add(Espresso);input(Coffee);};
    document.getElementById('latte').onclick = function (){Coffee.add(Latte);input(Coffee);};
    document.getElementById('cappuccino').onclick = function (){Coffee.add(Cappuccino);input(Coffee);};
    document.getElementById('banana').onclick = function (){Coffee.add(Banana);input(Coffee);};
    document.getElementById('vanilla').onclick = function (){Coffee.add(Vanilla);input(Coffee);};
    document.getElementById('flatWhite').onclick = function (){Coffee.add(FlatWhite);input(Coffee);};
    document.getElementById('milk').onclick = function (){Coffee.add(Milk);input(Coffee);};
    document.getElementById('syrup').onclick = function (){Coffee.add(Syrup);input(Coffee);}
    document.getElementById('payment').onclick = make;




    function make()
    {
        let p ='';

        fetch(`https://source.unsplash.com/200x200/?coffee`)
            .then(function (data) {
                return p = '<img alt ="" src="'+data.url+'">';
            });
            /*
            .then((response) => {
                setTimeout(function () {picture.innerHTML = '<img alt ="" src="'+response.url+'>';
                document.body.append(picture);},
                    2000);
            });*/

        if(Coffee.time>0) {


            const elem = document.getElementById("greenBar");
            let width = 1;

            let id = setInterval(frame, 30);

            function frame() {
                if (width >= 100)
                {clearInterval(id);
                    picture.innerHTML = p;//вроде получилось, но как-то странно
            }
                else {
                    width += 1;
                    elem.style.width = width + '%';
                    elem.innerHTML = width + '%';
                }
            }

        }
    }



    function input(coffee) {
    const div = document.getElementById('name');
    div.innerHTML = 'Ваш напиток <strong>'+ coffee.name + '</strong> стоимостью '+coffee.cost +' рублей ' + coffee.type ;
    document.body.append(div);
    }




}









//logic();