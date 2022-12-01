import {Receipt, Product} from './classes.js';

var receipt = new Receipt();
var button = document.getElementById('btn');
var sum = document.getElementById('sum');
var table = document.getElementById('table').getElementsByTagName('tbody')[0];
var icon = document.createElement('i');
icon.id = "bi";
icon.classList.add("bi","bi-x-octagon");
var rowNumber = 0;

window.addEventListener("load", function() {
    //window.localStorage.clear();
    if(localStorage.length > 0 ) {
        getFromLocalStorage();
        printArray(receipt);
    }
    
});

button.addEventListener("click", function(){

    let name = document.getElementById('nameOfProduct').value;
    let amount = document.getElementById('amountOfProduct').value;
    let price = document.getElementById('priceOfProduct').value;

    let product = new Product(name,price,amount);
    let checkProductIsNotInList = receipt.addProduct(product);
    if(checkProductIsNotInList){
        printRow(receipt);
        rowNumber++;
        saveToLocalStorage();
   }
})

function printRow(receipt){
    let row = table.insertRow(rowNumber);
    addClickEvent(row);

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);

    row.id = rowNumber;
    cell1.id = rowNumber;
    cell2.id = rowNumber;
    cell3.id = "td" + 2;
    cell4.id = "td" + 3;
    cell5.id = "td" + rowNumber;
    cell6.id = rowNumber;

    let amount = receipt.listOfProducts[rowNumber]._amount;
    let price = receipt.listOfProducts[rowNumber]._price

    cell1.innerHTML = rowNumber;
    cell2.innerHTML = receipt._listOfProducts[rowNumber]._name;
    cell3.innerHTML = amount;
    cell4.innerHTML = price + " zł";
    cell5.innerHTML = Math.floor((amount*price) *100) / 100 + " zł";
    cell6.innerHTML = '<i id="bi" class="bi bi-x-octagon"></i>'
    sum.innerHTML = parseInt(sum.textContent) + Math.floor((amount*price) *100) / 100 + " zł";
}

function addClickEvent(row){

    row.addEventListener("click", function(event) {
        if( event.target.id == 'bi' ){
            if (confirm("Czy na pewno chcesz usunąć produkt ")) {
                receipt.deleteProduct(receipt.listOfProducts[row.id]);
                rowNumber--;
                saveToLocalStorage();
                window.location.reload();
              }
        }
        edit(event,row.id);
       
    })
}

function edit(event,rowId){
    switch (event.target.id) {
        case 'td2':
            innerInputAndEdit(event,rowId);
          break;
        case 'td3':
            innerInputAndEdit(event,rowId);
            break;
      }
}

function innerInputAndEdit(event,rowId){
    event.target.innerHTML = `<input type ='text' value="${event.target.textContent}" ></input>`;
    changeValue(event,rowId);
}

function changeValue(event,rowId){
    event.target.addEventListener("keyup", function(el) {
        if (el.key === "Enter") {
            checkIdAndChagne(event,rowId)
            saveToLocalStorage();
        }
      });
}

function checkIdAndChagne(event,rowId){
    let price = receipt._listOfProducts[rowId]._price;
    let amount = receipt._listOfProducts[rowId]._amount;
    let sumOfProduct = document.getElementById('td' + rowId);
    switch (event.target.id) {
        case 'td2':
            let value2 = event.target.querySelector('input').value;
            receipt._listOfProducts[rowId]._amount = parseInt(value2);
            event.target.innerHTML = receipt._listOfProducts[rowId]._amount;
            sumOfProduct.innerHTML = suma(receipt._listOfProducts[rowId]._amount,receipt._listOfProducts[rowId]._price) +" zł";
            sum.innerHTML = (parseInt(sum.textContent) - suma(amount,price)) + suma(receipt._listOfProducts[rowId]._amount,receipt._listOfProducts[rowId]._price) + " zł";
            break;
        case 'td3':
            let value3 = event.target.querySelector('input').value;
            receipt._listOfProducts[rowId]._price = parseInt(value3);
            event.target.innerHTML = receipt._listOfProducts[rowId]._price + " zł";
            sumOfProduct.innerHTML = suma(receipt._listOfProducts[rowId]._amount,receipt._listOfProducts[rowId]._price) +" zł";
            sum.innerHTML = (parseInt(sum.textContent) - suma(amount,price)) + suma(receipt._listOfProducts[rowId]._amount,receipt._listOfProducts[rowId]._price) + " zł";
            break;
      }
}

function printArray(receipt){
    
    for (var i = 0; i < receipt._listOfProducts.length; i++) {
        
        let row = table.insertRow(i);
        addClickEvent(row);

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);

        row.id = i;
        cell1.id = i;
        cell2.id = i;
        cell3.id = "td" + 2;
        cell4.id = "td" + 3;
        cell5.id = "td" + i;
        cell6.id = i;

        let amount = receipt._listOfProducts[i]._amount;
        let price = receipt._listOfProducts[i]._price

        cell1.innerHTML = i;
        cell2.innerHTML = receipt._listOfProducts[i]._name;
        cell3.innerHTML = amount;
        cell4.innerHTML = price + " zł";
        cell5.innerHTML = suma(amount,price) + " zł";
        cell6.innerHTML='<i id="bi" class="bi bi-x-octagon"></i>'
        sum.innerHTML = parseInt(sum.textContent) + suma(amount,price) + " zł";
    }

}
function suma(amount,price){
    return Math.floor((amount*price) *100) / 100
}
function saveToLocalStorage() {
    localStorage.setItem("receipt",JSON.stringify(receipt.listOfProducts));
    localStorage.setItem('rowNumber', rowNumber);
}

function getFromLocalStorage() {
    receipt._listOfProducts = JSON.parse(localStorage.getItem("receipt") || "[]");
    rowNumber = localStorage.getItem('rowNumber') || 0;
}
