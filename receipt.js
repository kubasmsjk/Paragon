import {Receipt, Product} from './classes.js';

var receipt = new Receipt();

var button = document.getElementById('btn');
var sum = document.getElementById('sum');
var table = document.getElementById('table').getElementsByTagName('tbody')[0];
var numberOfRow = 0;

button.addEventListener("click", function(){

    let name = document.getElementById('nameOfProduct').value;
    let amount = document.getElementById('amountOfProduct').value;
    let price = document.getElementById('priceOfProduct').value;

    let product = new Product(name,price,amount);
    let checkIsProductInList = receipt.addProduct(product);

    if(checkIsProductInList){

        let row = table.insertRow(numberOfRow);
        numberOfRow++;

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);

        cell1.innerHTML = numberOfRow;
        cell2.innerHTML = name;
        cell3.innerHTML = amount;
        cell4.innerHTML = price + " zł";
        cell5.innerHTML = Math.floor((amount*price) *100) / 100 + " zł";
        sum.innerHTML = parseInt(sum.textContent) + Math.floor((amount*price) *100) / 100;
    }

    
})
//var newText = document.createTextNode('new row');
//newCell.appendChild(newText);