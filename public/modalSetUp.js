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


let createModalIdName = "createModal";
let createModal = document.querySelector(`#${createModalIdName}`);

new TaskModal(createModal, createModalIdName , createTaskAndLoadItsData);


let createBtnElement = document.querySelector("#createBtn");

createBtnElement.onclick = function() {
    createModal.style.display = "block";
}

let editModalIdName = "editModal";
let editModal = document.querySelector(`#${editModalIdName}`);

new TaskModal(editModal, editModalIdName, ()=>{
    alert("Functionality is still not implemented.")
});
