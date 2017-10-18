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
// functoin adding user lists
function addElementList(name){
    let result = document.querySelector('#result');
    let newTempList = tempList.map( (elem) =>{
        return `<li class='yourList'>${elem}</li>`
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
        console.log('wcisnales liste');
        console.log(item.innerText);
        tabList = JSON.parse(localStorage.getItem(item.innerText));
        addItems();
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
    console.log(tempList);
    inputNameList.value = "";
})
