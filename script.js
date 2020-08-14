const balance = document.getElementById('balance');
const money_plus= document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list= document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTrans=[
    {id: 1,text: 'FLower', amount:-20},
    {id: 2,text: 'Sugar', amount:300},
    {id: 3,text: 'Book', amount:-10},
    {id: 4,text: 'Camera', amount:150}
];
let transactions= dummyTrans;
//Add transaction when enter in text, we need to generate an id to push unto the array eg above

function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '' ){
        alert('plfgvsj')
    }
    else{
        const transaction ={ id: generateID(), text: text.value, amount: +amount.value }; // + is placed ifront of amount to turn it into number
       transactions.push(transaction);
       addTransactionDOM(transaction);
       updateValues();
       text.value='';
       amount.value='';

    }
   
}
function generateID(){
    return Math.floor(Math.random() * 100000000);
}
//Add Trasaction to DOM list
function addTransactionDOM(transaction){
    //Get sign
    const sign = transaction.amount < 0 ? '-': '+';
    const item = document.createElement('li');

    //Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML= `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
    list.appendChild(item);
}
// update balance income and exp
function updateValues(){
    const amounts = transactions.map(transaction => transaction.amount); // This line will give us an array of the amounts from the abpve array dummytrans ie 0:-20 ....
    const total = amounts.reduce((acc,item) =>(acc += item),0).toFixed(2);

    const income = amounts.filter(item => item > 0)   
                          .reduce((acc, item) =>(acc += item), 0).toFixed(2);

    const expense = (amounts.filter(item => item < 0)   
                            .reduce((acc, item) =>(acc += item), 0)* -1).toFixed(2);                     

    balance.innerText = `$${total}`;
    money_plus.innerText =`$${income}`;
    money_minus.innerText=`$${expense}`;
                           
} 

//Remove Transaction by Id
function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
}
//Init app
function init(){
    list.innerHTML='';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();
form.addEventListener('submit', addTransaction);