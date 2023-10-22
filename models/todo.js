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
  

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema)
const Category = mongoose.models.Category || mongoose.model("Category", categorySchema)
todoSchema.post('save', async function (doc) {
    const category = await Category.findOne({ name: doc.category });
    if (category) {
      category.todos.push(doc);
      await category.save();
    }
  });
export default {Category,Todo}
