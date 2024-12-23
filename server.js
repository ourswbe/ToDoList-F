const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Файл для хранения задач
const TASKS_FILE = 'tasks.json';

// Загрузка задач из файла
const loadTasks = () => {
    if (!fs.existsSync(TASKS_FILE)) {
        fs.writeFileSync(TASKS_FILE, JSON.stringify([]));
    }
    const data = fs.readFileSync(TASKS_FILE);
    return JSON.parse(data);
};

// Сохранение задач в файл
const saveTasks = (tasks) => {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

// Корневой маршрут
app.get('/', (req, res) => {
    res.send('Добро пожаловать на сервер ToDoList!');
});

// Получение всех задач
app.get('/tasks', (req, res) => {
    const tasks = loadTasks();
    res.json(tasks);
});

// Добавление новой задачи
app.post('/tasks', (req, res) => {
    const { text } = req.body;
    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Текст задачи не может быть пустым' });
    }

    const tasks = loadTasks();
    const newTask = { id: Date.now(), text: text.trim() };
    tasks.push(newTask);
    saveTasks(tasks);

    res.status(201).json(newTask);
});

// Удаление задачи
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const tasks = loadTasks();
    const updatedTasks = tasks.filter(task => task.id !== taskId);

    if (tasks.length === updatedTasks.length) {
        return res.status(404).json({ error: 'Задача не найдена' });
    }

    saveTasks(updatedTasks);
    res.status(200).json({ message: 'Задача удалена' });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
