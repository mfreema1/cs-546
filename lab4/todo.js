const mongoCollections = require("./mongoCollections");
const todoItems = mongoCollections.todoItems;
const uuidv4 = require('uuid/v4');

const createTask = async (title, description) => {
    if(!title) throw "You must provide a valid title.";
    
    if(!description) throw "You must provide a valid description.";

    const todoCollection = await todoItems();
    const newTodoItem = {
        _id: uuidv4(),
        title: title,
        description: description,
        completed: false,
        completedAt: null
    }

    const insertInfo = await todoCollection.insertOne(newTodoItem);
    if (insertInfo.insertedCount === 0) throw "Could not add new todo item";

    const newId = insertInfo.insertedId;

    const todoItem = await this.getTask(newId);
    return todoItem;
};

const getAllTasks = async () => {
    const todoItemCollection = await todoItems();
    const todoItems = await todoItemCollection.find({}).toArray();
    return todoItems;
};

const getTask = async (id) => {
    if(!id) throw "You must provide a valid id to retrieve."

    const todoItemCollection = await todoItems();
    const todoItem = await todoItemCollection.findOne({ _id: id });
    if(todoItem === null) throw "Task ID not found.";
    return todoItem;
};

const completeTask = async (taskId) => {
    if(!taskId) throw "You must provide a valid id to complete."

    const todoItemCollection = await todoItems();
    const updateInfo = await todoItemCollection.updateOne({ _id: taskId }, { $set: { completed: true }});
    if(updateInfo.modifiedCount === 0) throw "Could not complete task.";
    return await this.getTask(taskId);
};

const removeTask = async (id) => {
    if(!id) throw "You must provide a valid id to delete."

    const todoItemCollection = await todoItems();
    const deleteInfo = await todoItemCollection.deleteOne({ _id: id });
    if(deleteInfo.deletedCount === 0) throw "Could not delete task.";
};