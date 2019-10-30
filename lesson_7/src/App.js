import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

/*Поиск и добавление продуктов в меню*/
class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };

        this.handleSearchRequestChange = this.handleSearchRequestChange.bind(this);
        this.handleProductWeightChange = this.handleProductWeightChange.bind(this);
    }

    handleSearchRequestChange(e) {

        this.props.onSearchRequest(e.target.value);
        this.props.product_db.splice(0, this.props.product_db.length);
        fetch('http://api.nutritionix.com/v1_1/search/%20'+this.props.searchRequest+'?fields=item_name%2Citem_id%2Cnf_calories%2Cnf_total_fat%2Cnf_protein%2Cnf_total_carbohydrate&appId=0ef65026&appKey=+0d9c45522d76a90f850d2266a87a9917')
            .then(response=> response.json())

            .then(response=> {for(let i=0; i< response.hits.length; i++) {

                /*Проверка на пустые поля*/
                if(response.hits[i].fields.nf_protein === null)
                response.hits[i].fields.nf_protein =0;
                if(response.hits[i].fields.nf_total_fat === null)
                    response.hits[i].fields.nf_total_fat =0;
                if(response.hits[i].fields.nf_total_carbohydrate === null)
                    response.hits[i].fields.nf_total_carbohydrate =0;


                this.props.product_db.push({name: response.hits[i].fields.item_name,
                    cal:response.hits[i].fields.nf_calories,
                    prot:response.hits[i].fields.nf_protein,
                    fat:response.hits[i].fields.nf_total_fat,
                    carb:response.hits[i].fields.nf_total_carbohydrate })

 }})
            .then(
            () => {
                this.setState({
                    isLoaded: true,
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })

        this.forceUpdate();

    }

    handleProductWeightChange(e) {
        this.props.onProductWeight(e.target.value);
    }

    render() {
            return (
                <div>
                    <input placeholder="Search..." type="text" value={this.props.searchRequest}
                           onChange={this.handleSearchRequestChange}/>
                    <br/>
                    <input placeholder="Enter weight..." type="number" value={this.props.productWeight}
                           onChange={this.handleProductWeightChange}/> <a>gr.</a>

                    <SearchBarItems addMenuItem={this.props.addMenuItem} menu={this.props.menu}
                                    productWeight={this.props.productWeight} product_db={this.props.product_db} error={this.state.error} isLoaded={this.state.isLoaded} />
                </div>)
        }

}


/*Список продуктов для выбора*/
class SearchBarItems extends React.Component {
    constructor(props) {
        super(props);
        this.addNew= this.addNew.bind(this);
    }

    addNew(e) {
        this.props.addMenuItem(e.target.innerText);

    }


    render()
    {
        const mas =[];
        const gr = this.props.productWeight/100;

        for(let i=0; i<this.props.product_db.length; i++)
            {mas.push(<div key={i}><button onClick={this.addNew}> {this.props.product_db[i].name}
            ({Math.round(this.props.product_db[i].cal*gr)}/
                {Math.round(this.props.product_db[i].prot*gr)}/
                {Math.round(this.props.product_db[i].fat*gr)}/
                {Math.round(this.props.product_db[i].carb*gr)}) </button></div>)
            }

        const error = this.props.error;
        const isLoaded = this.props.isLoaded;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div> </div>;
        } else {
        return( <div id="db"> {mas}</div>)}
    }

}


/*Приложение целиком*/
class Calculator extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            searchRequest: '',
            productWeight: 100,
            product_db: [],
            menu: []
        };
        this.handleSearchRequestChange = this.handleSearchRequestChange.bind(this);
        this.handleProductWeightChange = this.handleProductWeightChange.bind(this);
        this.addMenuItem = this.addMenuItem.bind(this);
    }


    addMenuItem(newItem) {
        this.setState(prevState => ({
            menu: [...prevState.menu, newItem]
        }));
    }


    handleSearchRequestChange(searchRequest) {
    this.setState({
        searchRequest: searchRequest
    });
}

    handleProductWeightChange(productWeight) {
    this.setState({
        productWeight: productWeight
    })
}

    render(){
        return(

                <div>
                    <header className="App-header">
                        <p>Calorie Counter</p>
                    </header>
                    <SearchBar addMenuItem = {this.addMenuItem} menu = {this.state.menu}  product_db = {this.state.product_db} searchRequest = {this.state.searchRequest} productWeight = {this.state.productWeight} onSearchRequest={this.handleSearchRequestChange} onProductWeight={this.handleProductWeightChange}/>
                    <RationReport menu = {this.state.menu}/>

                </div>
            )
        }
}



/*Отображает общую сводку данных рациона*/
class RationReport extends React.Component {
    render() {
        let cal = 0, prot =0, fat =0, carb =0;
        const mas = [];
        this.props.menu.forEach(function (item, i) {
            mas.push(<div key={i}>{item}</div>);
        })

        const menu = this.props.menu;
        const menu2 =[];

            /*Вытягиваем цифры и считаем общее*/
            for(let i=0; i< menu.length; i++){
            menu2.push(menu[i].slice(menu[i].indexOf('(') + 1, menu[i].indexOf(')')));
            cal += parseInt(menu2[i]);
            menu2[i] = menu2[i].slice(menu2[i].indexOf('/')+1, menu2[i].length);
            prot += parseInt(menu2[i]);
            menu2[i] = menu2[i].slice(menu2[i].indexOf('/')+1,  menu2[i].length);
            fat += parseInt(menu2[i]);
            menu2[i] = menu2[i].slice(menu2[i].indexOf('/')+1,  menu2[i].length);
            carb += parseInt(menu2[i]);
            }

        return(

            <div id="report">
                <p> Calories Consumed: {cal}</p>
                <p> Protein: {prot}</p>
                <p> Total Fat: {fat}</p>
                <p> Total Carbohydrate: {carb}</p>
                <hr/>

                <div id="menu">{mas}</div>
            </div>

        )}
}


class About extends React.Component {
    render() {
        return(
            <div>
                <header className="App-header">
                    <p>Calorie Counter</p>
                </header>
                <div id="about">
                <h1>Hey!</h1>
                <p> Put some information here</p>
                </div>
            </div>

        )}
}


    export default function App() {
        return (
        <Router>
        <div>
            <nav>
                <Link style={{marginRight: "20px"}} to="/">Calculator</Link>
                <Link to="/about">About</Link>
            </nav>

        <Switch>
            <Route path="/about">
                <About />
            </Route>

            <Route path="/">
                <Calculator />
            </Route>
        </Switch>
        </div>
        </Router>
        );
    }
