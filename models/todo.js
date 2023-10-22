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
        required:true 
      },
  });
  
  export const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);

  




