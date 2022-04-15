const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millioners");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//fetch randomuser and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

//Add new object to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

//Update DOM
function updateDOM(providedData = data) {
  //Clear the main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> $${item.money}`;
    main.appendChild(element);
  });
}

//format number to money
//https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
function formatNumberMoney(number) {
    return  (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
 }

 //Double money
 function doubleMoney() {
     data = data.map(user => {
         return {
             ...user,
             money: user.money * 2
         }
     });

     updateDOM()
 }

 //Sort user by money
 function sortByMoney() {
    data = data.sort((a, b) => b.money - a.money)
    updateDOM()
 }

 //Event Listeners
 addUserBtn.addEventListener('click', getRandomUser);
 doubleBtn.addEventListener('click', doubleMoney);
 sortBtn.addEventListener('click', sortByMoney);
 
 