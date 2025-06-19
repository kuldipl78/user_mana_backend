const express = require('express');
const cors = require('cors');
const { AppDataSource } = require('./data-source');
require('reflect-metadata');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

AppDataSource.initialize().then(() => {
  const taskRepo = AppDataSource.getRepository('Task');

  // GET all tasks
  app.get('/tasks', async (req, res) => {
    try{
      const tasks = await taskRepo.find();
      res.json(tasks);
    }catch(error){
      res.send(`Error : ${error}` )
    }
  });

  // POST new task
  app.post('/tasks', async (req, res) => {
   try{
      const { title, description, status, dueDate } = req.body;
      if (!title || !status) {
        return res.status(400).json({ error: 'Title and status are required' });
      }
      const newTask = taskRepo.create({ title, description, status, dueDate });
      const savedTask = await taskRepo.save(newTask);
      res.status(201).json(savedTask);
   }catch(error){
      res.send(`Error: ${error}`)
   }
  });

  // PUT update task
  app.put('/tasks/:id', async (req, res) => {
    try{
      const { id } = req.params;  
      const existing = await taskRepo.findOneBy({ id });
      if (!existing) {
        return res.status(404).json({ error: 'Task not found' });
      }
      taskRepo.merge(existing, req.body);
      const updated = await taskRepo.save(existing);
      res.json(updated);
    }catch(error){
      res.send(`Error: ${error}`)
    }
  });
  
  // GET a single task by ID
  app.get('/tasks/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const task = await taskRepo.findOneBy({ id });
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // DELETE task
  app.delete('/tasks/:id', async (req, res) => {
    try{
      const { id } = req.params;
      const result = await taskRepo.delete(id);
      if (result.affected === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.status(204).send();
    }catch(error){
      res.send(`Error : ${error}`)
    }
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('❌ Failed to connect to DB:', err);
});
