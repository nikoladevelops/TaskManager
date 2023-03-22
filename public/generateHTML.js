
// Keep track of the tasks / used to create unique IDS for the HTML task elements.
let nextTaskId = 0;

// Generate a single task HTML element.
function generateTaskHtmlElement(taskName, isCompleted, taskId){
    // Task HTML elements.
    const task = document.createElement("div");
    const task_name = document.createElement("h4");
    const task_footer = document.createElement("div");

    const completed = document.createElement("div");
    const p = document.createElement("p");

    const task_btns = document.createElement("div");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    const idSpan = document.createElement("span");

    // Task HTML elements' styles.
    task.classList.add("task");
    task_name.classList.add("task-name");
    task_footer.classList.add("task-footer");
    if(isCompleted){
        completed.classList.add("completed");
    }
    else{
        completed.classList.add("notCompleted");
    }
    task_btns.classList.add("task-btns");
    editBtn.classList.add("editBtn");
    deleteBtn.classList.add("deleteBtn");
    idSpan.classList.add("idHolder");
    idSpan.hidden=true;
    editBtn.setAttribute("id",`task${nextTaskId}`);
    deleteBtn.setAttribute("id",`taskDelete${nextTaskId}`);

    // Populate data.
    task_name.innerText = taskName;
    p.innerText=isCompleted ? "COMPLETED" : "NOT COMPLETED";
    editBtn.innerText="EDIT";
    deleteBtn.innerText="DELETE";
    idSpan.innerText=taskId;

    // Button events.
    let editModal = document.querySelector(`#editModal`);
    editBtn.addEventListener('click',(e)=>{
        const modalTaskName = document.querySelector(`#editModal .taskName`);
        const modalIsCompleted = document.querySelector(`#editModal .isCompleted`);
        const idHolder = document.querySelector(`#editModal .idHolder`);
        const htmlTaskIdToEdit = document.querySelector(`#editModal .htmlTaskIdToEdit`);
        
         const taskToEdit = document.querySelector(`#${e.target.id}`).parentNode.parentNode.parentNode;
         const newModalTaskName = taskToEdit.querySelector(".task-name").innerText;
         let newModalIsCompleted = taskToEdit.querySelector(".completed");
         const newModalIdHolder = taskToEdit.querySelector(".idHolder").innerText;

         modalTaskName.value = newModalTaskName;
         if(newModalIsCompleted)
         {
            modalIsCompleted.checked=true;
         }
         else{
            modalIsCompleted.checked=false;
         }
         idHolder.innerText = newModalIdHolder;
         htmlTaskIdToEdit.innerText=e.target.id; // Give the id of the button that was clicked.
         editModal.style.display = "block";
    });

    deleteBtn.addEventListener('click', (e)=>{
        // Modal.
        const deleteModal = document.querySelector("#deleteModal");
        const modalIdHolder = document.querySelector(`#deleteModal .idHolder`);
        const htmlTaskIdToDelete = document.querySelector(`#deleteModal .htmlTaskIdToDelete`);

        // Task to delete.
        const taskToDelete = document.querySelector(`#${e.target.id}`).parentNode.parentNode.parentNode;
        const taskId = taskToDelete.querySelector(".idHolder").innerText;

        // Edit modal.
        modalIdHolder.innerText=taskId;
        htmlTaskIdToDelete.innerText=e.target.id;

        deleteModal.style.display="block";
    })

    // Correctly append each element to the parent.
    task.appendChild(task_name);
    completed.appendChild(p);
    task_footer.appendChild(completed)
    task_btns.appendChild(editBtn);
    task_btns.appendChild(deleteBtn);
    task_footer.appendChild(task_btns);
    task_footer.appendChild(idSpan);
    task.appendChild(task_footer);

    // Add the new task element to the container.
    document.querySelector(".container").appendChild(task);
    nextTaskId++;
}
