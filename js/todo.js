'use strict'
//осн константы
const FIELD = document.querySelector('.field');
const BUTTON = document.querySelector('.add');
const LIST = document.querySelector('.list');

// let tasks = [];

//создает задачу с чекбоксом

function createTask(value) {
    const TASK = document.createElement('div');
    // TASK.textContent = value;
    TASK.classList.add('task');

    //

    const CHECKBOX = document.createElement('input');
    CHECKBOX.type = 'checkbox';
    CHECKBOX.classList.add('status')

    //

    const TASK_TEXT = document.createElement('div');
    TASK_TEXT.textContent = value;
    TASK_TEXT.classList.add('task-text');

    //

    const DEL = document.createElement('button')
    DEL.textContent = 'x'
    DEL.classList.add('del')
    DEL.addEventListener('click', function(){
        TASK.remove();
    });

    TASK.appendChild(CHECKBOX);
    TASK.appendChild(TASK_TEXT);
    TASK.appendChild(DEL);

    CHECKBOX.addEventListener('click', completeTask)
    // TASK.addEventListener('click', function(){
    //     this.classList.toggle('completed')
    // })
    return TASK;
}

//добавляет задачу в список на страницу

function addTask() {
    const TASK_VALUE = FIELD.value.trim();

    if(TASK_VALUE) {
        const NEW_TASK = createTask(TASK_VALUE);
        LIST.prepend(NEW_TASK);
        FIELD.value = '';
    }
};

//при нажатии на кнопку + выполняется эдтаск

BUTTON.addEventListener('click', addTask)

//при отмеченном чекбоксе 

function completeTask(event) {
    const CHECKBOX = event.target;
    const TASK = CHECKBOX.parentElement;

    if(CHECKBOX.checked) {
        TASK.classList.add('completed');
        LIST.appendChild(TASK)
    } else {
        TASK.classList.remove('completed');
        LIST.prepend(TASK)}
}