function createTaskAndLoadItsData(){
    const taskName = document.querySelector(`#${createModalIdName} .taskName`);
    const isCompleted = document.querySelector(`#${createModalIdName} .isCompleted`);

    createTask(
        taskName.value,
        isCompleted.checked,
        (res)=>{
            const taskName = res.data.task.name;
            const isCompleted = res.data.task.completed;
            const taskId = res.data._id;

            generateTaskHtmlElement(taskName,isCompleted,taskId);
        }
    )
    let modal = document.getElementById(createModalIdName);
    
    taskName.value="";
    isCompleted.checked=false;
    modal.style.display = 'none';
}

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


let createModalIdName = "createModal";
let createModal = document.querySelector(`#${createModalIdName}`);

new TaskModal(createModal, createModalIdName , createTaskAndLoadItsData);


let createBtnElement = document.querySelector("#createBtn");

createBtnElement.onclick = function() {
    createModal.style.display = "block";
}

let editModalIdName = "editModal";
let editModal = document.querySelector(`#${editModalIdName}`);

new TaskModal(editModal, editModalIdName, updateTaskAndLoadItsData);
