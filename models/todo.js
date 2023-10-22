import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
    taskname:{
        type:String,
        required:true
    },
    completed: {
      type: Boolean,
      default: false,
    },
    category: {
        type: String,
        ref: 'Category', 
      },
  });
  
  export const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);
  const categorySchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    todos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo',
    }],
  }); 
export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);


