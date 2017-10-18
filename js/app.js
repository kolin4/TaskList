let btnSave = document.querySelector('#save'); //zapis listy
let inputNameList = document.querySelector('#listName'); // input nazwy listy

let input = document.querySelector('#task'); // input task
let tabList =  [];
let form = document.querySelector('.form');
let listaUl = document.querySelector('.lista');

// Adding new items to list
form.addEventListener('submit', function(e){
    e.preventDefault();
    if (!input.value == "") {tabList.push(input.value)};
    this.reset();
    addItems();
    btnSave.disabled = false;
// localStorage.setItem('lista', JSON.stringify(tabList));

})


// window.onload = () =>{
//     tabList = JSON.parse(localStorage.getItem('lista')) || [];
//     console.log(tabList);
//     if (tabList == []) return;
//     addItems();
// }

// Add items to ul list
function addItems(){
    let list = tabList.map( (elem,i) =>{
        return `<li class='item' data-id=${i}>${elem} </li>
        `
    })
    listaUl.innerHTML = list.join("");

}


window.addEventListener('click', function(e){
    let item = e.target;
    if ( item.classList  == 'item'){
        let idToDel = item.dataset.id;
        tabList.splice(idToDel, 1);
        item.remove();
        addItems();
    }

})

btnSave.addEventListener('click', function(e){

    function list(name,list){
        this.name = name,
        this.list = [list]
    }
    let listObj = new list(inputNameList.value, tabList);
    localStorage.setItem(inputNameList.value, tabList);
    inputNameList.value = "";
})
