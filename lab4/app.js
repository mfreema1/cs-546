const todo = require('./todo');

async function main() {
    let task = await todo.createTask("Ponder Dinosaurs", "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?");
    //log first task
    console.log('FIRST TASK===============================');
    console.log(task);

    //add another
    let other_task = await todo.createTask("Play Pokemon with Twitch TV", "Should we revive Helix?")

    //query all
    console.log('TWO TASKS===============================');
    console.log(await todo.getAllTasks());

    //remove first
    console.log('TASK REMOVED===============================');
    await todo.removeTask(task._id);

    //query all again
    console.log('AFTER REMOVAL===============================');
    console.log(await todo.getAllTasks());

    console.log('AFTER COMPLETION===============================');
    console.log(await todo.completeTask(other_task._id));
}

main().catch(err => {console.log(err)});