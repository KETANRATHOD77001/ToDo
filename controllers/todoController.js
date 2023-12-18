import todoModel from '../models/todoModel.js';

// Route to get all todos
export const getAllTodos = async (req, res) => {
    try {
        const todos = await todoModel.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Route to create a new todo
export const createTodo = async (req, res) => {
    try {
        const newTodo = new todoModel({ text: req.body.text });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Route to update a todo
export const updateTodo = async (req, res) => {
    try {
        const updatedTodo = await todoModel.findByIdAndUpdate(
            req.params.id,
            { text: req.body.text },
            { new: true }
        );
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Route to delete a todo
export const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await todoModel.findByIdAndDelete(req.params.id);
        res.json(deletedTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};