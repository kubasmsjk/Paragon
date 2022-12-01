import {Receipt, Product} from './classes.js';

var receipt = new Receipt();

var button = document.getElementById('btn');
var sum = document.getElementById('sum');
var table = document.getElementById('table').getElementsByTagName('tbody')[0];
var icon = document.getElementById('bi');

button.addEventListener("click", function(){

    let name = document.getElementById('nameOfProduct').value;
    let amount = document.getElementById('amountOfProduct').value;
    let price = document.getElementById('priceOfProduct').value;

    let product = new Product(name,price,amount);
    let checkProductIsNotInList = receipt.addProduct(product);
    if(checkProductIsNotInList){
        saveToLocalStorage();
   }
})




function printArray(receipt){

    for (var i = 0; i < receipt._listOfProducts.length; i++) {
        
        let row = table.insertRow(i);
        row.addEventListener("click", function(event) {
                if( event.target.id == 'bi' ){
                    receipt.deleteProduct(receipt._listOfProducts[row.id]);
                    saveToLocalStorage();
                    window.location.reload();
                }
                if(!event.target.id){
                    event.target.innerHTML = "<input type ='text' placeholder =" + event.target.textContent+"></input>"
                }
               
            })
            

        row.id = i;
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        let amount = receipt._listOfProducts[i]._amount;
        let price = receipt._listOfProducts[i]._price
        cell1.id = i;
        cell1.innerHTML = i;
        cell2.innerHTML = receipt._listOfProducts[i]._name;
        cell3.innerHTML = amount;
        cell4.innerHTML = price + " zł";
        cell5.innerHTML = Math.floor((amount*price) *100) / 100 + " zł";
        cell6.innerHTML='<i id="bi" class="bi bi-x-octagon"></i>'
        sum.innerHTML = parseInt(sum.textContent) + Math.floor((amount*price) *100) / 100 + " zł";
    }

}

function saveToLocalStorage() {
    localStorage.setItem("receipt",JSON.stringify(receipt));
 }

function getFromLocalStorage() {
    receipt._listOfProducts = JSON.parse(localStorage.getItem("receipt") || "[]")._listOfProducts;
}

window.addEventListener("load", function() {
    //window.localStorage.clear();
    if(localStorage.length > 0 ) {
        getFromLocalStorage();
        printArray(receipt);
    }
  });
