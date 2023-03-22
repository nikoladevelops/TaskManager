// GET REQUEST
// Get all tasks from the database and execute a function responsible for printing those tasks.
function getAllTasks(printTasks){
    axios
    .get('http://localhost:3000/api/v1/tasks')
    .then(res=>{
       printTasks(res);
    })
    .catch(err=>console.log(err));
}

// POST REQUEST
// Post a new task, save it in the database and execute a function responsible for printing the new task.
function createTask(name, completed, printSingleTask){
    axios
    .post('http://localhost:3000/api/v1/tasks',
    {
        name,
        completed
    })
    .then(res=>{
        printSingleTask(res)
    })
    .catch(err=>console.log(err));
}

// PATCH REQUEST
// Patch a task, update a task's data in the database and execute a function responsible for printing the updated task.
function updateTask(taskId, name, completed, printSingleTask){
    axios
    .patch(`http://localhost:3000/api/v1/tasks/${taskId}`,
    {
        name,
        completed
    })
    .then((res)=>{
        printSingleTask(res);
    })
    .catch((res)=>console.log(res));

}

// DELETE REQUEST
// Delete a task from the database.
function deleteTask(taskId){
    axios
    .delete(`http://localhost:3000/api/v1/tasks/${taskId}`)
    .then()
    .catch(err=>console.log(err));
}