const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB (usa una cuenta gratis en https://cloud.mongodb.com)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión:', err));

// Modelo de Tarea
const Task = mongoose.model('Task', {
  text: String,
  completed: Boolean,
});

// API: Obtener todas las tareas
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// API: Crear tarea
app.post('/api/tasks', async (req, res) => {
  const newTask = new Task({ text: req.body.text, completed: false });
  await newTask.save();
  res.status(201).json(newTask);
});

// API: Eliminar tarea
app.delete('/api/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor backend en puerto ${PORT}`));

//Hola