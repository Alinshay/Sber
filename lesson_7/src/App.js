import React from 'react';
import ReactDom from 'react-dom';
import './App.css';


let value =1;
/*Выводим списочек продуктов в базе*/
function tick() {
    setTimeout(function(){
        let mas=[];
        {product_db.forEach(function(item){
            mas.push(<div><button onClick={function () {
                menu.push(<div class="item_menu"><p>{item.name} ({item.cal*value}/{item.prot*value}/{item.fat*value}/{item.carb*value})</p></div>);
                result[0]+=item.cal*value;
                result[1]+=item.prot*value;
                result[2]+=item.fat*value;
                result[3]+=item.carb*value;
                updateMenu();
                updateResult();
            }}> {item.name} ({item.cal}/{item.prot}/{item.fat}/{item.carb}) </button></div>)
        })}
        const element = (<div id ="db1"> {mas} </div>);
        ReactDom.render(element, document.getElementById('db'))
    }, 1000)

}

/*Выводим меню (список продуктов, которые мы добавили)*/
function updateMenu(){
    const element = (<div>{menu}</div>);
    ReactDom.render(element, document.getElementById('menu'))

}

let product_db = []
let menu = [];
let result =[0,0,0,0];

function updateResult(){
    const element = (<div id="report"> <p> Общее кол-во калорий: {result[0]}</p> <p> Белки: {result[1]}</p> <p> Жиры: {result[2]}</p> <p> Углеводы: {result[3]}</p> </div>);
    ReactDom.render(element, document.getElementById('result'))
}

class Calculator extends React.Component {

    constructor(props) {
        super(props);

        this.state ={value: '', number: 100, list: [], sum: 0, fat: 0, prot: 0, carb: 0};

        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);

    }

/*Подтягивает бд*/
    handleChange(event) {
        this.setState({value: event.target.value});
        product_db =[];
        fetch('http://api.nutritionix.com/v1_1/search/%20'+this.state.value+'?fields=item_name%2Citem_id%2Cnf_calories%2Cnf_total_fat%2Cnf_protein%2Cnf_total_carbohydrate&appId=0ef65026&appKey=+0d9c45522d76a90f850d2266a87a9917')
            .then(response=> response.json())
            .then(response=> {for(let i=0; i< response.hits.length; i++) {

                if(response.hits[i].fields.nf_protein === null)
                    response.hits[i].fields.nf_protein =0;
                if(response.hits[i].fields.nf_total_fat === null)
                    response.hits[i].fields.nf_total_fat =0;
                if(response.hits[i].fields.nf_total_carbohydrate === null)
                    response.hits[i].fields.nf_total_carbohydrate =0;

                product_db.push({name: response.hits[i].fields.item_name, cal:response.hits[i].fields.nf_calories, prot:response.hits[i].fields.nf_protein, fat:response.hits[i].fields.nf_total_fat, carb:response.hits[i].fields.nf_total_carbohydrate })}});

        tick();
    }

    handleChange1(event) {
        this.setState({number: event.target.value});
    }

    render() {return(

       <div className='Calk'>
            <header className="App-header">
                <p>Калькулятор калорий</p>
            </header>

        <div>
            <h3>Выберите продукт</h3>
                    <input type="text"  list="food" className="input"  value={this.state.value}  onChange={this.handleChange}/>
            <div id="result"> </div>
            <div id="db"></div>
            <div id="menu"> </div>

        </div>
       </div>

    )}

}


export default Calculator
