'use strict'
//осн константы
const field = document.querySelector('.field');
const button = document.querySelector('.add');
const list = document.querySelector('.list');

// let tasks = [];

//создает задачу с чекбоксом

function createTask(value) {
    const task = document.createElement('div');
    // TASK.textContent = value;
    task.classList.add('task');

    //

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('status')

    //

    const taskText = document.createElement('div');
    taskText.textContent = value;
    taskText.classList.add('task-text');

    //

    const del = document.createElement('button')
    del.textContent = 'x'
    del.classList.add('del')
    del.addEventListener('click', function(){
        task.remove();
        saveTask();
    });

    task.appendChild(checkbox);
    task.appendChild(taskText);
    task.appendChild(del);

    checkbox.addEventListener('click', completeTask)
    // TASK.addEventListener('click', function(){
    //     this.classList.toggle('completed')
    // })
    return task;
}

//добавляет задачу в список на страницу

function addTask() {
    const taskValue = field.value.trim();

    if(taskValue) {
        const newTask = createTask(taskValue);
        list.prepend(newTask);
        field.value = '';
        saveTask();
    }
};

//при нажатии на кнопку + выполняется эдтаск

button.addEventListener('click', addTask)

//при отмеченном чекбоксе 

function completeTask(event) {
    const checkbox = event.target;
    const task = checkbox.parentElement;

    if(checkbox.checked) {
        task.classList.add('completed');
        list.appendChild(task)
    } else {
        task.classList.remove('completed');
        list.prepend(task)
    }
    saveTask()
}

//сохранение 

function saveTask() {
    const tasks = [];
    const allTasks = document.querySelectorAll('.task');

    allTasks.forEach(task => {
        const checkbox = task.querySelector('.status')
        const taskText = task.querySelector('.task-text');

        tasks.push({
            text: taskText.textContent,
            completed: checkbox.checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//загрузка из localStorage

function loadTask() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        const tasks = JSON.parse(saved);
        tasks.forEach(task => {
            const newTask = createTask(task.text);
            if(task.completed) {
                const checkbox = newTask.querySelector('.status');
                checkbox.checked = true;
                newTask.classList.add('completed');
            }
            list.appendChild(newTask);
        });
    }
}

loadTask()

//энтер тоже добавляет

field.addEventListener('keypress', function(event) {
    if(event.key === 'Enter') {
        addTask();
    }
});