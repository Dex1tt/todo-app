let tasks = [];
let saved = localStorage.getItem('tasks');
if (saved) {
    tasks = JSON.parse(saved);
}
renderTasks();
let btn = document.getElementById('add-btn')
let taskInput = document.getElementById('task-input')
function addTask() {
    let text = taskInput.value
    if (text == '') return;
    tasks.push(text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    let li = document.createElement('li');
    li.textContent = text
    let deleteBtn = document.createElement('button')
    deleteBtn.textContent = '✕';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function(){
        li.remove();
        tasks = tasks.filter(t => t !== text);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    })
    li.appendChild(deleteBtn)
    document.getElementById('task-list').appendChild(li)
    taskInput.value = ''
}
btn.addEventListener('click', addTask);
function renderTasks() {
    tasks.forEach(function(text) {
         let li = document.createElement('li');
         li.textContent = text
         let deleteBtn = document.createElement('button')
    deleteBtn.textContent = '✕';
    deleteBtn.addEventListener('click', function(){
        li.remove();
        tasks = tasks.filter(t => t !== text);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    })
    li.appendChild(deleteBtn)
    document.getElementById('task-list').appendChild(li)        
    })
}
taskInput.addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
        addTask();
    }
})
