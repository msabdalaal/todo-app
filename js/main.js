let input = document.getElementById("input_1");
let tasks = document.querySelector(".tasks");
let sun = document.getElementById("sun");
let moon = document.getElementById("moon");
let light = document.querySelectorAll(".light");
let taskArray = [];

if (localStorage.getItem("theme") === null) {
  localStorage.setItem("theme", "dark");
}

if (localStorage.getItem("number") === null) {
  localStorage.setItem("number", 0);
}

if (localStorage.getItem("todos") === null) {
  localStorage.setItem("todos", JSON.stringify(taskArray));
  tasks.innerHTML = taskArray.map((ele) => {
    return ele;
  });
} else {
  taskArray = JSON.parse(localStorage.getItem("todos"));
  tasks.innerHTML = taskArray.join("");
}

input.focus();

let createTask = () => {
  if (input.value != "") {
    let task = document.createElement("div");
    task.classList = "task";
    task.id = localStorage.getItem("number");
    let checkbox = document.createElement("input");
    checkbox.id = `${localStorage.getItem("number")}_check`;
    checkbox.type = `checkbox`;
    checkbox.name = `status`;
    let label = document.createElement("label");
    label.setAttribute("for", `${localStorage.getItem("number")}_check`);
    checkbox.classList = `circle`;
    let span = document.createElement("span");
    span.classList = `circle`;
    let h2 = document.createElement("h2");
    h2.classList = `h2`;
    h2.innerHTML = input.value;
    let img = document.createElement("img");
    img.src = "./images/icon-cross.svg";
    img.alt = "close";
    img.classList = `close`;
    img.id = `close_${localStorage.getItem("number")}`;
    label.appendChild(span);
    task.appendChild(checkbox);
    task.appendChild(label);
    task.appendChild(h2);
    task.appendChild(img);
    tasks.appendChild(task);
    taskArray.push(task.outerHTML);
    input.value = "";
    localStorage.setItem("number", `${+localStorage.getItem("number") + 1}`);
    localStorage.setItem("todos", JSON.stringify(taskArray));
    tasks.innerHTML = taskArray.join("");
  }
};

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    createTask();
    countItems();
    let light = document.querySelectorAll(".light");
  }
});

tasks.addEventListener("click", (ele) => {
  if (ele.target.classList.contains("close")) {
    ele.target.parentElement.remove();
    taskArray.splice(taskArray.indexOf(ele), 1);
    localStorage.setItem("todos", JSON.stringify(taskArray));
    countItems();
  }
});

let addCheckBox = () => {
  tasks.addEventListener("click", (ele) => {
    if (ele.target.classList.contains("circle")) {
      let index = ele.target.parentElement.outerHTML;
      ele.target.nextSibling.firstChild.classList.toggle("check");
      ele.target.parentElement.childNodes[2].classList.toggle("line");
      taskArray[taskArray.indexOf(index)] = ele.target.parentElement.outerHTML;
      localStorage.setItem("todos", JSON.stringify(taskArray));
      tasks.innerHTML = taskArray.join("");
      countItems();
    }
    if (ele.target.classList.contains("h2")) {
      let index = ele.target.parentElement.outerHTML;
      ele.target.previousSibling.firstChild.classList.toggle("check");
      ele.target.parentElement.childNodes[2].classList.toggle("line");
      taskArray[taskArray.indexOf(index)] = ele.target.parentElement.outerHTML;
      localStorage.setItem("todos", JSON.stringify(taskArray));
      tasks.innerHTML = taskArray.join("");
      countItems();
    }
  });
};
addCheckBox();

let clear = document.getElementById("clear");
let task = document.getElementsByClassName("task");
clear.addEventListener("click", () => {
  // task = document.getElementsByClassName("task");
  Array.from(task).forEach((ele) => {
    if (ele.children[1].children[0].classList.contains("check")) {
      ele.remove();
      taskArray.splice(taskArray.indexOf(ele.outerHTML), 1);
      localStorage.setItem("todos", JSON.stringify(taskArray));
      countItems();
    }
  });
});

let countItems = () => {
  let count = document.getElementById("count");
  let counter = 0;
  Array.from(task).forEach((ele) => {
    if (ele.children[1].children[0].classList.contains("check")) {
      counter += 1;
    }
  });
  count.innerHTML = `${task.length - counter} items left`;
};
countItems();

let filter = document.querySelector(".filter").children;
let completed = () => {
  Array.from(filter).forEach((e) => {
    e.classList.remove("active");
  });
  filter[2].classList.add("active");
  Array.from(task).forEach((ele) => {
    ele.classList.remove("hide");
    if (ele.children[1].children[0].classList.contains("check")) {
    } else {
      ele.classList.add("hide");
    }
  });
};

let active = () => {
  Array.from(filter).forEach((e) => {
    e.classList.remove("active");
  });
  filter[1].classList.add("active");
  Array.from(task).forEach((ele) => {
    ele.classList.remove("hide");
    if (!ele.children[1].children[0].classList.contains("check")) {
    } else {
      ele.classList.add("hide");
    }
  });
};

let allTasks = () => {
  Array.from(filter).forEach((e) => {
    e.classList.remove("active");
  });
  filter[0].classList.add("active");
  Array.from(task).forEach((ele) => {
    ele.classList.remove("hide");
  });
};

let makeDark = () => {
  Array.from(light).forEach((ele) => {
    ele.classList.remove("light");
  });

  sun.classList.remove("hide");
  moon.classList.add("hide");
  Array.from(task).forEach((ele) => {
    ele.classList.remove("light");
  });
  localStorage.setItem("theme", "dark");
};

let makeLight = () => {
  Array.from(light).forEach((ele) => {
    ele.classList.add("light");
  });
  sun.classList.add("hide");
  moon.classList.remove("hide");
  Array.from(task).forEach((ele) => {
    ele.classList.add("light");
  });
  localStorage.setItem("theme", "light");
};

let adjustTheme = () => {
  if (localStorage.getItem("theme") == "dark") {
    makeDark();
  }
  if (localStorage.getItem("theme") == "light") {
    makeLight();
  }
};
adjustTheme();
