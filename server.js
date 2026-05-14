require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();

app.use(cors({
    origin: ['http://localhost:5000', 'http://127.0.0.1:3000']
}));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);


app.post('/habits', async (req, res) => {
    const { name } = req.body;
    const { data, error } = await supabase.from('habits').insert([{ name }]).select();
    if(error){
        res.status(500).json({ error: error.message });
        return;
    }
    res.status(201).json(data[0]);
});

app.get('/habits', async (req, res) => {
    const { data, error } = await supabase.from('habits').select('*');
    if(error){
        res.status(500).json({ error: error.message });
        return;
    }
    res.json(data);
});

app.put('/habits/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const { error } = await supabase.from('habits').update(updates).eq('id', id);
    if(error){
        res.status(500).json({ error: error.message });
        return;
    }
    res.json({ message: 'habit updated' });
});

app.delete('/habits/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('habits').delete().eq('id', id);
    if(error){
        res.status(500).json({ error: error.message });
        return;
    }
    res.json({ message: 'habit deleted' });
});

// GET all tasks
app.get('/tasks', async (req, res) => {
    const { data, error } = await supabase.from('tasks').select('*');
    if(error){
        res.status(500).json({ error: error.message });
        return;
    }
    res.json(data);
});

// POST add task
app.post('/tasks', async (req, res) => {
    const { name } = req.body;
    const { data, error } = await supabase.from('tasks').insert([{ name }]).select();
    if(error){
        res.status(500).json({ error: error.message });
        return;
    }
    res.status(201).json(data[0]);
});

// PUT update task
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const { error } = await supabase.from('tasks').update(updates).eq('id', id);
    if(error){
        res.status(500).json({ error: error.message });
        return;
    }
    res.json({ message: 'task updated' });
});

// DELETE task
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if(error){
        res.status(500).json({ error: error.message });
        return;
    }
    res.json({ message: 'task deleted' });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});