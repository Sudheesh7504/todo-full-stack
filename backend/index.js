const mongoose = require('mongoose');

const uri = "mongodb://ksudeesh761_db_user:Sudeesh_123@ac-xo5iybg-shard-00-00.ho2kgac.mongodb.net:27017,ac-xo5iybg-shard-00-01.ho2kgac.mongodb.net:27017,ac-xo5iybg-shard-00-02.ho2kgac.mongodb.net:27017/tododb?ssl=true&replicaSet=atlas-117pk2-shard-0&authSource=admin";

mongoose.connect(uri)
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch(err => console.error("❌ Connection error:", err));







const Todo = require('./models/todo');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const todos = [
    { id: 1, task: 'Learn Angular', done: false },
    { id: 2, task: 'Learn nodejs', done: false }
]

app.get('/', (req, res) => {
    console.log(`welcome to angular todo app backend`);
});

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.get('/test-insert', async (req, res) => {
    try {
        const todo = new Todo({ task: "Test from backend" });
        await todo.save();
        res.json({ success: true, todo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


let currentId = 1;

app.post('/todos', async (req, res) => {
    const todo = new Todo({ task: req.body.task });
    await todo.save();
    res.json(todo);
    // const newTodo = {
    //     id: currentId++,
    //     task: req.body.task,
    //     done: false
    // }
    // todos.push(newTodo);
    // res.status(201).json(newTodo);
});

app.put('/todos/:id', async (req, res) => {

    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }


    // const { id } = req.params;
    // const { task, done } = req.body;

    // const todo = todos.find(t => t.id === parseInt(id));
    // if (!todo) {
    //     return res.status(404).json({ error: 'Todo not found' });
    // }

    // if (task !== undefined) todo.task = task;
    // if (done !== undefined) todo.done = done;
    res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ success: true });
    // const { id } = req.params;
    // const index = todos.findIndex(t => t.id === parseInt(id));
    // if (index === -1) {
    //     return res.status(404).json({ error: 'Todo not found' });
    // }
    // const deletedTodo = todos.splice(index, 1);
    // res.json(deletedTodo[0]);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend Server is running on http://localhost:${PORT}`);
});