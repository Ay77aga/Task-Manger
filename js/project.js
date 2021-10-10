let input = document.querySelector('#input_task');
let submit = document.querySelector('#submit');
let output = document.querySelector('.output');

// Array of tasks
let tasks = [];

if (localStorage.tasks) {
  tasks = JSON.parse(localStorage.tasks);
}
// get data from localStorage
getData();

// Add tasks
submit.onclick = function() {
  if (input.value !== '') {
    addTasks(input.value);
    input.value = '';
  }
}
// Delete btn
output.addEventListener('click', (e) => {
  if (e.target.classList.contains('del')) {
    deletTask(e.target.parentElement.getAttribute('data'));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains('task')) {
    status(e.target.getAttribute('data'));
    e.target.classList.toggle('done');
  }
});

function addTasks(txt) {
  // task data
  const task = {
    id: Date.now(),
    text: txt,
    complete: false,
  }
  // Add to array
  tasks.push(task);
  // add element in page
  addElement(tasks);
  // Add to localStorag
  addToLocalStor(tasks);
}
// Add element to page
function addElement(tasks) {
  output.innerHTML = '';
  tasks.forEach((task) => {
    let div = document.createElement('div');
    div.className = 'task';
    if (task.complete) {
      div.classList = 'task done';
    }
    div.setAttribute('data', task.id);
    let p = document.createElement('p');
    p.appendChild(document.createTextNode(task.text));
    div.appendChild(p);

    let del = document.createElement('span');
    del.className = 'del';
    del.appendChild(document.createTextNode('X'));
    div.appendChild(del);
    output.appendChild(div);
  });
}
// add to localStorage
function addToLocalStor(tasks) {
  window.localStorage.tasks = JSON.stringify(tasks)
}

function getData() {
  data = window.localStorage.getItem('tasks');
  if (data) {
    let tasks = JSON.parse(data);
    addElement(tasks);
  }
}

// delete task 
function deletTask(taskid) {
  tasks = tasks.filter((task) => task.id != taskid);
  addToLocalStor(tasks);

}

function status(taskid) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == taskid) {
      tasks[i].complete == false ? tasks[i].complete = true : tasks[i].complete = false;
    }
  }
  addToLocalStor(tasks);
}

let open = document.querySelector('.open');

open.onclick = function (){
  output.classList.toggle('show');
}