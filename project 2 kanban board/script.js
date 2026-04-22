const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const tasks = document.querySelectorAll(".task");

let dragElement = null;
let tasksData = {};
let columns = [todo, progress, done];

if(localStorage.getItem("tasks")){
  const data = JSON.parse(localStorage.getItem("tasks"));

  // console.log(data);

  for(const col in data){
    const colum = document.querySelector(`#${col}`);
    console.log(colum);
    data[col].forEach(task=>{

      const div = document.createElement("div");
      div.classList.add("task");
      div.setAttribute("draggable", "true");

      div.innerHTML = `<h2>${task.title}</h2>
                       <p>${task.desc}</p>
                       <button>Delete</button>`;
      colum.appendChild(div);

      div.addEventListener("drag", (e) => {
        dragElement = div;
      });

    })
    
    const tasks = colum.querySelectorAll(".task");
    const count = colum.querySelector(".right");
    count.innerText = tasks.length;

  }
  
}

tasks.forEach((task) => {
  task.addEventListener("drag", (e) => {
    dragElement = task;
  });
});

function addDragEventsOnColumn(column) {
  column.addEventListener("dragenter", (e) => {
    column.classList.add("hover_over");
  });
  column.addEventListener("dragleave", (e) => {
    column.classList.remove("hover_over");
  });

  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  column.addEventListener("drop", (e) => {

    
    // console.log("droped", dragElement, column);
    column.appendChild(dragElement);
    column.classList.remove("hover_over");

   

    columns.forEach((col) => {
    const tasks = col.querySelectorAll(".task");
    const count = col.querySelector(".right");

    tasksData[col.id] = Array.from(tasks).map(t=>{
      return{
        title: t.querySelector("h2").innerText,
        desc: t.querySelector("p").innerText
      }
    })
  
    localStorage.setItem("tasks", JSON.stringify(tasksData));
    count.innerText = tasks.length;
  });

  });
}
addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);

// modal logic
const toggleModalBtn = document.querySelector("#toggle_modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskBtn = document.querySelector("#add_new_task");

toggleModalBtn.addEventListener("click", () => {
  modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});

addTaskBtn.addEventListener("click", () => {
  const taskTitle = document.querySelector("#task_title_input").value;
  const taskDesc = document.querySelector("#task_dec_input").value;

  const div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("draggable", "true");

  div.innerHTML = `<h2>${taskTitle}</h2>
                   <p>${taskDesc}</p>
                   <button>Delete</button>`;

  todo.appendChild(div);

  columns.forEach((col) => {
    const tasks = col.querySelectorAll(".task");
    const count = col.querySelector(".right");

    tasksData[col.id] = Array.from(tasks).map(t=>{
      return{
        title: t.querySelector("h2").innerText,
        desc: t.querySelector("p").innerText
      }
    })
  
    localStorage.setItem("tasks", JSON.stringify(tasksData));
    count.innerText = tasks.length;
  });

  div.addEventListener("drag", (e) => {
    dragElement = div;
  });
  modal.classList.remove("active");
});
// console.log(tasksData);

