// GET REQUEST
function getAllTasks(printTasks){
    axios
    .get('http://localhost:3000/api/v1/tasks')
    .then(res=>{
       printTasks(res);
    })
    .catch(err=>console.log(err));
}

// POST REQUEST
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
function updateTask(taskId, name, completed, updateSingleTask){
    axios
    .patch(`http://localhost:3000/api/v1/tasks/${taskId}`,
    {
        name,
        completed
    }
    .then(res=>{
        updateSingleTask(res);
    })
    .catch(res=>console.log(res)));

}

// generate a single task html element
function generateTaskHtmlElement(taskName, isCompleted, taskId){
    // task html elements
    const task = document.createElement("div");
    const task_name = document.createElement("h4");
    const task_footer = document.createElement("div");

    const completed = document.createElement("div");
    const p = document.createElement("p");

    const task_btns = document.createElement("div");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    const idSpan = document.createElement("span");

    // task html elements' styles

    task.classList.add("task");
    task_name.classList.add("task-name");
    task_footer.classList.add("task-footer");
    if(isCompleted){
        completed.classList.add("completed");
    }
    else{
        completed.classList.add("notCompleted")
    }
    task_btns.classList.add("task-btns");
    editBtn.classList.add("editBtn");
    deleteBtn.classList.add("deleteBtn");
    idSpan.classList.add("idHolder");
    idSpan.hidden=true;

    // populate data
    task_name.innerText = taskName;
    p.innerText=isCompleted ? "COMPLETED" : "NOT COMPLETED";
    editBtn.innerText="EDIT";
    deleteBtn.innerText="DELETE";
    idSpan.innerText=taskId;

    // button events
    let editModal = document.querySelector(`#editModal`);
    editBtn.onclick = function() {
        editModal.style.display = "block";
    }

    // correctly append each element to the parent
    task.appendChild(task_name);
    completed.appendChild(p);
    task_footer.appendChild(completed)
    task_btns.appendChild(editBtn);
    task_btns.appendChild(deleteBtn);
    task_footer.appendChild(task_btns);
    task_footer.appendChild(idSpan);
    task.appendChild(task_footer);

    // add the new task element to the container
    document.querySelector(".container").appendChild(task);
}

// load all tasks and generate a task html element for each of them in the container div
function loadAllTasks(){
    getAllTasks((res)=>{
        for (const task of res.data.tasks) {
            generateTaskHtmlElement(task.name,task.completed,task._id);
        }
    })
}


// make the whole li element clickable
 document.querySelector("#allTasksBtn").addEventListener('click',()=>{
    document.querySelector("#allTasksBtn a").click();
});

// remove all tasks from the container div and load them again
document.querySelector('#refreshBtn').addEventListener('click',()=>{
    document.querySelector(".container").replaceChildren();
    
    loadAllTasks();
});
