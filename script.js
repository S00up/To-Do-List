document.addEventListener("DOMContentLoaded" , function() {
    // select elements----
    const addButton = document.getElementById("add-task-btn"),
    taskInput = document.getElementById("task-input"),
    taskList = document.getElementById("task-list");


    // check of there are tasks --
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // 'false' indicates not to save again to Local Storage
        storedTasks.forEach(taskText => addTask(taskText, false)); 
    }
    loadTasks();


    addButton.addEventListener("click" , function() {
        addTask();
    });

    taskInput.addEventListener("keypress" , function (event) {
        if(event.key === "Enter") {
            addTask();
        }
    });


    function addTask(task, save = true) {
        let taskText = taskInput.value.trim() || task;

        // check on value---
        if(taskText){
            // create li element
            let li = document.createElement("li");
            li.textContent = taskText;
            // create a btn to remove the task--
            let removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.classList.add("remove-btn");
            removeBtn.onclick = function() {
                li.remove();
                // remove from local storage
                let tasks = JSON.parse(localStorage.getItem("tasks"));
                let filterdTasks = tasks.filter(task => task !== li.firstChild.textContent);
                localStorage.setItem('tasks' , JSON.stringify(filterdTasks));
            }
            li.appendChild(removeBtn);
            taskList.appendChild(li);
            // clear value--
            taskInput.value = "";
        }
        else {
            alert("please add a task");
        }

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText || task);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    };

    // addTask();
});