const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();

app.use(cors({
    origin: ['http://localhost:5000', 'http://127.0.0.1:3000']
}));
app.use(express.json());

const db = new sqlite3.Database('./habits.db', (err) => {
    if(err){
        console.log('Error connecting to database', err);
    } else {
        console.log('Connected to database');
    }
});

db.run(`CREATE TABLE IF NOT EXISTS habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    completed BOOLEAN DEFAULT 0,
    streak INTEGER DEFAULT 0,
    week_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    completed BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);


app.post('/habits', (req, res) => {
    const { name } = req.body;
    db.run('INSERT INTO habits (name) VALUES (?)', [name], function(err) {
        if(err){
            res.status(500).json({ error: 'something went wrong' });
            return;
        }
        res.status(201).json({ id: this.lastID, name: name });
    });
});

app.get('/habits', (req, res) => {
    db.all('SELECT * FROM habits', [], (err, rows) => {
        if(err){
            res.status(500).json({ error: 'something went wrong' });
            return;
        }
        res.json(rows);
    });
});

app.put('/habits/:id', (req, res) => {
    const { id } = req.params;
    const { completed, streak, week_count } = req.body;
    db.run('UPDATE habits SET completed=?, streak=?, week_count=? WHERE id=?', 
    [completed, streak, week_count, id], function(err){
        if(err){
            res.status(500).json({ error: 'something went wrong' });
            return;
        }
        res.json({ message: 'habit updated' });
    });
});

app.delete('/habits/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM habits WHERE id = ?', [id], function(err) {
        if(err){
            res.status(500).json({ error: 'something went wrong' });
            return;
        }
        res.json({ message: 'habit deleted' });
    });
});

// GET all tasks
app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if(err){
            res.status(500).json({ error: 'something went wrong' });
            return;
        }
        res.json(rows);
    });
});

// POST add task
app.post('/tasks', (req, res) => {
    const { name } = req.body;
    db.run('INSERT INTO tasks (name) VALUES (?)', [name], function(err) {
        if(err){
            res.status(500).json({ error: 'something went wrong' });
            return;
        }
        res.status(201).json({ id: this.lastID, name: name });
    });
});

// PUT update task
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    db.run('UPDATE tasks SET completed=? WHERE id=?', [completed, id], function(err) {
        if(err){
            res.status(500).json({ error: 'something went wrong' });
            return;
        }
        res.json({ message: 'task updated' });
    });
});

// DELETE task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM tasks WHERE id=?', [id], function(err) {
        if(err){
            res.status(500).json({ error: 'something went wrong' });
            return;
        }
        res.json({ message: 'task deleted' });
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});