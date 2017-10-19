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
    addItems(tabList);
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
function addItems(elem){
    let list = elem.map( (elem,i) =>{
        return `<li class='item' data-id=${i}>${elem} </li>
        `
    })
    listaUl.innerHTML = list.join("");

}
// function adding user lists
function addElementList(name){
    let result = document.querySelector('#result');
    result.innerHTML = "";
    console.log(tempList);
    let newTempList = tempList.map( (elem) =>{

        let li = document.createElement('li');
        li.innerText = elem;
        li.dataset.name = elem;
        li.classList.add('yourList');

        let btn = document.createElement('button');
        btn.classList.add('delList');
        btn.innerText = 'DEL';
        li.appendChild(btn);


        result.appendChild(li);

        // `<li data-name = ${(elem)} class='yourList'>${elem}
        // <button class='delList'>X</button>
        // </li>`
    })
    // return result.innerHTML = newTempList.join("");
}



//events
window.addEventListener('click', function(e){
    let item = e.target;
    if ( item.classList  == 'item'){
        console.log(tabList);
        let idToDel = item.dataset.id;
        tabList.splice(idToDel, 1);
        item.remove();
        addItems(tabList);
    } else if ( item.classList == 'yourList') {
        let allListItems = document.querySelectorAll('.yourList'); // active class adding

        for ( let i = 0; i < allListItems.length; i++){
            allListItems[i].classList.remove('active');
        }
        item.classList.add('active');


        let dataset = item.dataset.name;
        console.log(item.dataset.name);
        tabList = JSON.parse(localStorage.getItem(dataset))
        addItems(tabList);
    } else if ( item.classList == 'delList') {

        // usun element z tempList
        console.log(tempList);
        listaUl.innerHTML = "";
        let index = tempList.indexOf(item.parentElement.dataset.name);
        tempList.splice(index,1);
        tabList = [];
        console.log(tempList);
        localStorage.removeItem(item.parentElement.dataset.name);
        item.parentElement.remove();
    }

})

let tempList = []; //temp list for localStorage list
btnSave.addEventListener('click', function(e){
    if ( inputNameList.value == ""){
        // localStorage.setItem('no-name', JSON.stringify(tabList));
        // tempList.push('no-name')
        // tabList = [];
        // btnSave.disabled = true;
        // addElementList('no-name');
        // listaUl.innerHTML = "";
        alert('type a list name');
    } else {
        // check if the new list name already exist
        console.log('else');
        if ( localStorage.length > 0 ){
            for ( let i = 0; i < localStorage.length; i++ ){
                console.log('petla');
                if ( localStorage.key(i) == inputNameList.value ){
                    return ( inputNameList.value = "",
                        alert('List type already exist!'))
                } else {
                    return ( localStorage.setItem(inputNameList.value, JSON.stringify(tabList)),
                    tempList.push(inputNameList.value),
                    tabList = [],
                    listaUl.innerHTML = "",
                    inputNameList.value = "",
                    addElementList(inputNameList.value)
                )
                }
            }
        } else {
            localStorage.setItem(inputNameList.value, JSON.stringify(tabList));
            tempList.push(inputNameList.value);
            tabList = [];
            listaUl.innerHTML = "";
            inputNameList.value = "";
            addElementList(inputNameList.value);
        }
    }

    inputNameList.value = "";
})
// przy usunineciu elementu ze storage wyczysc tablice
