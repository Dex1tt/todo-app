let tasks = [];
let btn = document.getElementById("add-btn");
let taskInput = document.getElementById('task-input');
let currentFilter = 'all';

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved) tasks = JSON.parse(saved);
}

document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        currentFilter = this.dataset.filter;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderTasks();
    });
});

document.getElementById('clear-done').addEventListener('click', function() {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
});

function renderTasks() {
    const doneCount = tasks.filter(t => t.completed).length;
    document.getElementById('counter').textContent = `Выполнено: ${doneCount} из ${tasks.length}`;

    let filtered = tasks;
    if (currentFilter === 'active') filtered = tasks.filter(t => !t.completed);
    if (currentFilter === 'done') filtered = tasks.filter(t => t.completed);

    document.getElementById('empty-msg').style.display = filtered.length === 0 ? 'block' : 'none';
    document.getElementById('task-list').innerHTML = '';

    filtered.forEach(function(task) {
        let li = document.createElement('li');
        if (task.completed) li.classList.add('done');

        const checkBtn = document.createElement('button');
        checkBtn.className = 'check-btn';
        checkBtn.textContent = '✓';
        checkBtn.addEventListener('click', function() {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✕';
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.addEventListener('click', function() {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });

        li.appendChild(checkBtn);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        document.getElementById('task-list').appendChild(li);
    });
}

function addTask() {
    if (taskInput.value.trim() == '') {
        taskInput.classList.add('shake');
        setTimeout(() => taskInput.classList.remove('shake'), 300);
        return;
    }
    tasks.push({ id: Date.now(), text: taskInput.value, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
}

btn.addEventListener('click', function() {
    addTask();
});

taskInput.addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
        addTask();
    }
});

loadTasks();
renderTasks();