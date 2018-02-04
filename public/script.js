

// The array containing all the items on the list.
var inputList = [];

// This updates the counter with the array length.
function updateCounter(theList) {
  let counter = document.querySelector(".counter");
  counter.innerHTML = inputList.length;
};

// Declaring the <ul> and <li>
const ul = document.querySelector(".ul");

// For each item inserted into the array(inputList), create a "<li>", and append it to the <ul>(input).

function updateList () {
  for (let i = ul.children.length; i > 0; i--) {
    ul.removeChild(ul.children[i-1]);
  }
  inputList.forEach(function(item, index) {
    let newLi = document.createElement('li');
    let newImg = document.createElement('img');

    newLi.innerHTML = item.name;
    if(item.completed) {
      newLi.style.cssText = "color: lightgrey; text-decoration: line-through;"
    }
    newLi.classList.add("li-item")
    newImg.src = 'images/x-mark.png';
    newImg.classList.add('x-mark');
    newLi.dataset.index = index;
    newImg.dataset.index = index;

    ul.appendChild(newLi);
    newLi.appendChild(newImg);
    newLi.addEventListener("click", function(e){
      // TODO: Review this
      inputList[e.target.dataset.index].completed = !inputList[e.target.dataset.index].completed;
      updateList();
    })
    newImg.addEventListener('click', function(e) {
      e.stopPropagation();
      inputList.splice(e.target.dataset.index, 1);
      fetch(`/pisici/${e.target.dataset.index}`, {
      	method:"DELETE"
      })
      updateList();
      updateCounter();

    })
  })

}
// Add to the array all values submitted in input.
const addForm = document.querySelector(".form");
const addInput = document.querySelector(".form-input");

addForm.addEventListener('submit', function(e) {
  e.preventDefault(); //Prevent auto-submit.
  inputList.push({
    name: addInput.value,
    completed: false
  });

  fetch("/pisici", {
    method:"POST",
    body:JSON.stringify({pisica: addInput.value}),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })

  addInput.value = ''; //Clear the input after submit.
  updateCounter();
  updateList();
})

const removeButton = document.querySelector(".remove-button");
removeButton.addEventListener('click', function(){
  // while(ul.firstChild) {
  //   ul.removeChild(ul.firstChild)
  // }
  // ul.innerHTML = '';
  inputList = [];
  updateCounter();
  updateList();
  console.log("remove was pressed");
})

fetch("/pisici").then(r => r.json()).then((data) => {
  inputList = data;
  updateCounter();
  updateList();
} )




// TODO: Check updateList above
// const liItem = document.querySelector(".li-item");
// liItem.addEventListener("click", function(e){
//   e.target.style.cssText = "color: lightgrey; text-decoration: line-through;"
// })
//
// const xRemove = document.querySelector(".x-mark");
// xRemove.addEventListener("click", function(e){
//  console.log("X-REMOVE");
// })
