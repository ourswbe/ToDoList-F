const input = document.getElementsByClassName('input')[0];
const add_button = document.getElementsByClassName('add_button')[0];
const taskList = document.getElementsByClassName('taskList')[0];

// Функция загрузки задач с сервера
async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:4000/tasks'); // Используем порт 4000
        const tasks = await response.json();
        taskList.innerHTML = ''; // Очистка списка перед добавлением задач
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
    } catch (error) {
        console.error('Ошибка загрузки задач:', error);
    }
}

// Функция добавления задачи
async function addTask() {
    const saveText = input.value.trim(); // Получаем текст задачи
    if (saveText === "") {
        alert("Введите задачу");
        return;
    }

    try {
        const response = await fetch('http://localhost:4000/tasks', {  // Используем порт 4000
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: saveText }) // Отправляем текст задачи
        });

        if (response.ok) {
            const newTask = await response.json();
            addTaskToDOM(newTask); // Добавить новую задачу в DOM
            input.value = ''; // Очистить поле ввода после добавления задачи
        } else {
            alert("Ошибка при добавлении задачи");
        }
    } catch (error) {
        console.error('Ошибка добавления задачи:', error);
    }
}

// Функция удаления задачи
async function deleteTask(taskId, taskElement) {
    try {
        await fetch(`http://localhost:4000/tasks/${taskId}`, {  // Используем порт 4000
            method: 'DELETE'
        });
        taskElement.remove(); // Удаление элемента из DOM
    } catch (error) {
        console.error('Ошибка удаления задачи:', error);
    }
}

// Функция добавления задачи в DOM
function addTaskToDOM(task) {
    const taskItem = document.createElement('li');
    taskItem.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(task.id, taskItem));

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

// Добавляем слушатель на кнопку добавления задачи
add_button.addEventListener('click', addTask);

// Также добавляем возможность добавления задачи по нажатию Enter
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Ждём загрузки DOM перед загрузкой задач
document.addEventListener('DOMContentLoaded', fetchTasks);



// const input = document.getElementsByClassName('input')[0];
// const add_button = document.getElementsByClassName('add_button')[0];
// const taskList = document.getElementsByClassName('taskList')[0];

// // Функция загрузки задач с сервера
// async function fetchTasks() {
//     try {
//         const response = await fetch('http://localhost:4000/tasks');
//         const tasks = await response.json();
//         taskList.innerHTML = ''; // Очистка списка перед добавлением задач
//         tasks.forEach(task => {
//             addTaskToDOM(task);
//         });
//     } catch (error) {
//         console.error('Ошибка загрузки задач:', error);
//     }
// }

// // Функция добавления задачи
// async function addTask() {
//     const saveText = input.value.trim();
//     if (saveText === "") {
//         alert("Введите задачу");
//         return;
//     }

//     try {
//         const response = await fetch('http://localhost:4000/tasks', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ text: saveText })
//         });
//         const newTask = await response.json();
//         addTaskToDOM(newTask); // Добавить новую задачу в DOM
//         input.value = '';
//     } catch (error) {
//         console.error('Ошибка добавления задачи:', error);
//     }
// }

// // Функция удаления задачи
// async function deleteTask(taskId, taskElement) {
//     try {
//         await fetch(`http://localhost:4000/tasks/${taskId}`, {
//             method: 'DELETE'
//         });
//         taskElement.remove(); // Удаление элемента из DOM
//     } catch (error) {
//         console.error('Ошибка удаления задачи:', error);
//     }
// }

// // Функция добавления задачи в DOM
// function addTaskToDOM(task) {
//     const taskItem = document.createElement('li');
//     taskItem.textContent = task.text;

//     const deleteButton = document.createElement('button');
//     deleteButton.textContent = 'Delete';
//     deleteButton.addEventListener('click', () => deleteTask(task.id, taskItem));

//     taskItem.appendChild(deleteButton);
//     taskList.appendChild(taskItem);
// }

// // Добавляем слушатель на кнопку добавления задачи
// input.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter') {
//         addTask();
//     }
// });


// // Ждём загрузки DOM перед загрузкой задач
// document.addEventListener('DOMContentLoaded', fetchTasks);

// // Дополнительный отладочный код
// add_button.addEventListener('click', () => {
//     console.log('Кнопка нажата!');
// });


// const input = document.getElementsByClassName('input')[0];
// const add_button = document.getElementsByClassName('add_button')[0];
// const taskList = document.getElementsByClassName('taskList')[0];



// function addTask(){//добавление и сохранения задач )
//     const saveText=input.value.trim();//value для установки значения,trim чтобы убрать лишние пробелы)
//     if(saveText===""){
//         alert("Введите задачу (((")
//         return;
//     }
//     const taskItem=document.createElement('li');
//     taskItem.textContent=saveText;//добавляется текст с помощью .textContent

//     const deleteButton=document.createElement('button');
//     deleteButton.textContent='Delete';
//     // deleteButton.addEventListener('click', ()=>{
//     //     saveText.remove();

//     // });

//     deleteButton.addEventListener('click', () => {
//         taskItem.remove();
//     });
    

//     // saveText.addEventListener('click', ()=>{
//     //     saveText.classList.toggle('complited');

//     // })

//     taskItem.addEventListener('click', () => {
//         taskItem.classList.toggle('complited');
//     });
    

//     taskItem.appendChild(deleteButton);
//     taskList.appendChild(taskItem);
//     input.value='';


// }
// add_button.addEventListener('click',addTask);
// taskInput.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter') {
//         addTask();
//     }
// });


// async function fetchTasks() {
//     try {
//         const response = await fetch('http://localhost:3000/tasks');
//         const tasks = await response.json();
//         taskList.innerHTML = ''; // Очистка списка перед добавлением задач
//         tasks.forEach(task => {
//             addTaskToDOM(task);
//         });
//     } catch (error) {
//         console.error('Ошибка загрузки задач:', error);
//     }
// }
