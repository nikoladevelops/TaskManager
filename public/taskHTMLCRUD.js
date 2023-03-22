// Create a task, save that task in the database
// generate appropriate html to display that new task.
function createTaskAndLoadItsData(){
    const taskName = document.querySelector(`#${createModalIdName} .taskName`);
    const isCompleted = document.querySelector(`#${createModalIdName} .isCompleted`);

    createTask(
        taskName.value,
        isCompleted.checked,
        (res)=>{
            const taskName = res.data.task.name;
            const isCompleted = res.data.task.completed;
            const taskId = res.data.task._id;
            generateTaskHtmlElement(taskName,isCompleted,taskId);
        }
    )
    let modal = document.getElementById(createModalIdName);
    
    taskName.value="";
    isCompleted.checked=false;
    modal.style.display = 'none';
}

// Update a task, save the changes in the database
// make changes to the HTML elements representing that task.
function updateTaskAndLoadItsData(){
    const newTaskName = document.querySelector(`#${editModalIdName} .taskName`);
    const newIsCompleted = document.querySelector(`#${editModalIdName} .isCompleted`);
    const idHolder = document.querySelector(`#${editModalIdName} .idHolder`);
    
    updateTask(idHolder.textContent, newTaskName.value, newIsCompleted.checked,(res)=>{
            const modal = document.getElementById(editModalIdName);
            modal.style.display = 'none';

            const taskName = res.data.task.name;
            const isCompleted = res.data.task.completed;
            
            const htmlTaskIdToEdit = document.querySelector(`#${editModalIdName} .htmlTaskIdToEdit`);
            const taskToEdit = document.querySelector(`#${htmlTaskIdToEdit.innerHTML}`).parentNode.parentNode.parentNode;
            taskToEdit.querySelector('.task-name').textContent=taskName;
            

            let completed = taskToEdit.querySelector('.completed p');
            if(!completed){
                completed = taskToEdit.querySelector('.notCompleted p');
            }

            completed.innerText=isCompleted ? "COMPLETED" : "NOT COMPLETED";
            if(isCompleted){
                completed.classList.add("completed");
                completed.classList.remove("notCompleted");
            }
            else{
                completed.classList.add("notCompleted");
                completed.classList.remove("completed");
            }
    })
}

// Delete a task, delete the task data from the database
// delete the task from the HTML container / no longer display it, because it doesn't exist anymore.
function deleteTaskAndDeleteItsData(){
    const idHolder = document.querySelector(`#${deleteModalIdName} .idHolder`);
    deleteTask(idHolder.textContent);
    const deleteModal = document.getElementById(deleteModalIdName);
    const htmlTaskIdToDelete = document.querySelector(`#${deleteModalIdName} .htmlTaskIdToDelete`);
    const taskToDelete = document.querySelector(`#${htmlTaskIdToDelete.innerHTML}`).parentNode.parentNode.parentNode;
    taskToDelete.remove();

    deleteModal.style.display = 'none';
}
