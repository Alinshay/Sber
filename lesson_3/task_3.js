/** Бабулькины рецепты.
 * На чердаке нашлись несколько тетрадок с рецептами кофе от бабушки, она была еще та любительница этого напитка.
 * В меню уже был раздел с её рецептом, 'oldfashion'. Теперь вы хотите удалить этот раздел и создать новый (grannys), со всеми известными
 * бабулькиными рецептами (из текущего oldfashion тоже). Цена будет на все одна - 140.
 * Обновите меню (создайте функцию menuRenovation, обновляющую текущее меню)
 */
const myCoffeeShopMenu = {
    classic: [{'latte': 130}, {'cappuccino': 120}, {'americano': 80}],
    author: [{'banana raf': 150}, {'cherry pie latte': 150}],
    ethic: [{'vegan apple cookie latte': 190}],
    oldfashion: [{'cezve turkish delight': 140}]
}

const grannysNote1 = ['hot sand coffee', 'brazilian night dark roast']
const grannysNote2 = ['Midterranian delux', 'Black Sea Flat white']

function menuRenovation(){



    myCoffeeShopMenu['grannys']=myCoffeeShopMenu['oldfashion'];

    let i=1;
    grannysNote1.forEach(function(item){
        myCoffeeShopMenu['grannys'].push(new Object);
        myCoffeeShopMenu['grannys'][i][item]=140;
        i+=1;
    });

    grannysNote2.forEach(function(item){
        myCoffeeShopMenu['grannys'].push(new Object);
        myCoffeeShopMenu['grannys'][i][item]=140;
        i+=1;
    });


    delete myCoffeeShopMenu['oldfashion'];

}
menuRenovation()
console.log(myCoffeeShopMenu)