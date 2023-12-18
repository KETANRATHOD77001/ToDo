import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'The todo text field is required'],
    },
}, { collection: 'todos' });

const todoModel = mongoose.model('todo', TodoSchema);

export default todoModel;