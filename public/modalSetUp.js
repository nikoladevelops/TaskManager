// Set up create task modal.
let createModalIdName = "createModal";
let createModal = document.querySelector(`#${createModalIdName}`);

new TaskModal(createModal, createModalIdName , createTaskAndLoadItsData);

let createBtnElement = document.querySelector("#createBtn");

createBtnElement.onclick = function() {
    createModal.style.display = "block";
}

// Set up edit task modal.
let editModalIdName = "editModal";
let editModal = document.querySelector(`#${editModalIdName}`);

new TaskModal(editModal, editModalIdName, updateTaskAndLoadItsData);

// Set up delete task modal.
let deleteModalIdName = "deleteModal";
let deleteModal = document.querySelector(`#${deleteModalIdName}`);

new TaskModal(deleteModal, deleteModalIdName, deleteTaskAndDeleteItsData);

deleteModal.querySelector(".cancelBtn").addEventListener('click',()=>{
    deleteModal.style.display = "none";
})