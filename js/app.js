let btn = document.querySelector('button');
let input = document.querySelector('input[type=text]');
let tabList =  [];
let form = document.querySelector('form');
let listaUl = document.querySelector('.lista');

form.addEventListener('submit', function(e){

    e.preventDefault();
    if (!input.value == "") {tabList.push(input.value)};
    this.reset();

    addItems();
localStorage.setItem('lista', JSON.stringify(tabList));

})
window.onload = () =>{
    tabList = JSON.parse(localStorage.getItem('lista')) || [];
    console.log(tabList);
    if (tabList == []) return;
    addItems();
}

function addItems(){
    let list = tabList.map( (elem,i) =>{
        return `<li data-id=${i}>${elem}
        <button class='del'>Usun</button>
        </li>

        `
    })

    listaUl.innerHTML = list.join("");

}
window.addEventListener('click', function(e){
    let item = e.target;
    if ( item.classList  == 'del'){
        let idToDel = item.parentElement.dataset.id;

        tabList.splice(idToDel, 1);
        item.parentElement.remove();
        addItems();
        console.log(tabList);
    }

})
