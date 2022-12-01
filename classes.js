
export class Receipt{

    constructor(){
        this._listOfProducts = [];
    }

    get listOfProducts(){
        return this._listOfProducts;
    }

    checkIsProductOnList(Product){
        var isProductOnList = this.listOfProducts.some(el => el._name == Product._name);
        return isProductOnList;
    }

    addProduct(Product){
        if(!this.checkIsProductOnList(Product)){
            this.listOfProducts.push(Product);
        return true;
        }else{
            alert("Produkt jest umieszczony na paragonie, aby zmienić jego wartości kliknij w odpowiednią wartość");
            return false;
        }
    }

    deleteProduct(Product){
        if (this.checkIsProductOnList(Product)) {
            let id = this._listOfProducts.indexOf(Product);
            this._listOfProducts.splice(id, 1);
        }else{
            alert("Produkt nie występuje na paragonie");
        }
    }
}

export class Product{

    constructor(name, price, amount) {
        this._name = name;
        this._price = price;
        this._amount = amount;
    }

    get Name() {
        return this._name;
    }

    set Name(name){
        this._name = name;
    }

    get Price() {
        return this._price;
    }

    set Price(price){
        this._price = price;
    }

    get Amount() {
        return this._amount;
    }

    set Amount(amount){
        this._amount = amount;
    }

}
