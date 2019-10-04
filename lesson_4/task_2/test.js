

/** Создать простую страничку которая выводит в выпадающий список
 * всех персонажей (people) с name 'Cat' по запросу https://ghibliapi.herokuapp.com/species
 * для начала, пусть в значении опции будет просто порядковый номер.
 * после выбора опции, отсылается запрос на url https://ghibliapi.herokuapp.com/people/{id}
 * внизу появляется информация о персонаже -
 * // name, eye_color, gender, films
 * а так же изображение (случайное с unsplash)
 * https://ghibliapi.herokuapp.com/#
 **/

global.fetch = require("node-fetch");

global.page = document.getElementById('page');
/*получаем список людей*/
function getAllChars() {
    fetch('https://ghibliapi.herokuapp.com/species')
        .then(response=> response.json())
        .then(data => data.forEach( function(item){
            if(item.name === 'Cat')
                return item.people.forEach( function(item, index){
                    //let div = document.createElement('div');
                    let div = document.getElementById('button');
                        div.className = "list";
                    index= index+1;
                    div.innerHTML = div.innerHTML + '<button onclick=getPeople("'+item +'") >'+ index +'</button>';
                    document.body.append(div);
                });
        }))
}

/*Информация о человеке*/
function getPeople(link){

    page.innerHTML='';
    document.body.append(page);

    fetch(link)
        .then(response=> response.json())

        .then(function(data) {
            renderCatPic();
            page.innerHTML = page.innerHTML +'<p> <strong>Name:</strong> '+ data.name +'</p>'+'<p><strong>Gender:</strong> '+ data.gender +'</p>'+'<p> <strong>Age:</strong> '+ data.age +'</p>'+'<p><strong> Eye color:</strong> '+ data.eye_color +'</p>'+'<p><strong> Hair color:</strong> '+ data.hair_color +'</p>';
            document.body.append(page);
            getFilm(data.films);
        }, function(reason) {
            console.log(reason);
        });
}

/*Добавляем фильмы*/
function getFilm(link) {
    page.innerHTML = page.innerHTML + '<p><strong> Films:</strong>';
    link.forEach(function (item) {
        fetch(item)
            .then(response=> response.json())
            .then(function (data) {
                   page.innerHTML = page.innerHTML + '<p> - '+ data.title + ' </p>';
                document.body.append(page);
            }, function (reason) {
                console.log(reason); // Ошибка!
            });
    });
}

/*Картинка*/
function renderCatPic(){
    fetch(`https://source.unsplash.com/200x200/?cat`)
        .then((response) => {
            page.innerHTML = page.innerHTML+ '<img alt ="" src="'+response.url+'">';
            document.body.append(page);
        })
}






