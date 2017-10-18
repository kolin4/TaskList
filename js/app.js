let btnSave = document.querySelector('#save'); //zapis listy
let inputNameList = document.querySelector('#listName'); // input nazwy listy

let input = document.querySelector('#task'); // input task
let tabList =  []; // main array
let form = document.querySelector('.form');
let listaUl = document.querySelector('.lista'); // list of user things to do

// Adding new items to list
form.addEventListener('submit', function(e){
    e.preventDefault();
    if (!input.value == "") {tabList.push(input.value)};
    this.reset();
    addItems();
    btnSave.disabled = false;


})

// on refresh loading storage list
window.onload = () =>{
    console.log(tempList);
    for ( let i = 0; i < localStorage.length; i++){
            tempList.push(localStorage.key(i));
    }
    addElementList();
}

// Add items to ul list
function addItems(){
    let list = tabList.map( (elem,i) =>{
        return `<li class='item' data-id=${i}>${elem} </li>
        `
    })
    listaUl.innerHTML = list.join("");

}
// function adding user lists
function addElementList(name){
    let result = document.querySelector('#result');
    let newTempList = tempList.map( (elem) =>{
        return `<li data-name = ${elem} class='yourList'>${elem}
        <button class='delList'>X</button>
        </li>`
    })
    return result.innerHTML = newTempList.join("");
}



//events
window.addEventListener('click', function(e){
    let item = e.target;
    if ( item.classList  == 'item'){
        let idToDel = item.dataset.id;
        tabList.splice(idToDel, 1);
        item.remove();
        addItems();
    } else if ( item.classList == 'yourList') {
        let allListItems = document.querySelectorAll('.yourList'); // active class adding

        for ( let i = 0; i < allListItems.length; i++){
            allListItems[i].classList.remove('active');
        }
        item.classList.add('active');

        tabList = JSON.parse(localStorage.getItem(item.dataset.name));
        addItems();
    } else if ( item.classList == 'delList') {

        // usun element z tempList
        console.log(tempList);
        let index = tempList.indexOf(item.parentElement.dataset.name);
        tempList.splice(index,1);
        console.log(tempList);
        localStorage.removeItem(item.parentElement.dataset.name);
        item.parentElement.remove();
    }

})

let tempList = []; //temp list for localStorage list
btnSave.addEventListener('click', function(e){
    if ( inputNameList.value == ""){
        localStorage.setItem('no-name', JSON.stringify(tabList));
        tempList.push('no-name')
        addElementList('no-name');
    } else {
        localStorage.setItem(inputNameList.value, JSON.stringify(tabList));
        tempList.push(inputNameList.value);
        addElementList(inputNameList.value);
    }

    inputNameList.value = "";
})
