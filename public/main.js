// Load all tasks and generate a task html element for each of them in the HTML container div.
function loadAllTasks(){
    getAllTasks((res)=>{
        for (const task of res.data.tasks) {
            generateTaskHtmlElement(task.name,task.completed,task._id);
        }
    })
}

loadAllTasks();
