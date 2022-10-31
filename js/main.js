let input = document.getElementById("input_1");
let tasks = document.querySelector(".tasks");
let x = document.getElementsByClassName("close");

input.focus();
if (localStorage.getItem("number") === null) {
  localStorage.setItem("number", 0);
}
if (localStorage.getItem("theme") === null) {
  localStorage.setItem("theme", "dark");
  sun.classList.remove("hide");
  moon.classList.add("hide");
}
tasks.innerHTML = localStorage.getItem("todos");

let createTask = () => {
  if (input.value != "") {
    let task = document.createElement("div");
    task.classList = "task light";
    task.id = localStorage.getItem("number");
    let checkbox = document.createElement("input");
    checkbox.type = `checkbox`;
    checkbox.name = `status`;
    let label = document.createElement("label");
    checkbox.classList = `circle`;
    let span = document.createElement("span");
    span.classList = `circle light`;
    let h3 = document.createElement("h3");
    h3.classList = `light`;
    h3.innerHTML = input.value;
    let img = document.createElement("img");
    img.src = "./images/icon-cross.svg";
    img.alt = "close";
    img.classList = `close`;
    img.id = `close_${localStorage.getItem("number")}`;
    label.appendChild(span);
    task.appendChild(checkbox);
    task.appendChild(label);
    task.appendChild(h3);
    task.appendChild(img);
    tasks.appendChild(task);
    input.value = "";
    localStorage.setItem("number", `${+localStorage.getItem("number") + 1}`);
    localStorage.setItem("todos", tasks.innerHTML);
    x = document.getElementsByClassName("close");
  }
};

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    createTask();
    document.location.reload();
  }
});

Array.from(x).forEach((element) => {
  element.addEventListener("click", function (e) {
    let id = `${e.target.id}`;
    let ele = document.getElementById(+id.slice(6));
    ele.remove();
    localStorage.setItem("todos", tasks.innerHTML);
    document.location.reload();
  });
});

let checkboxes = document.getElementsByName("status");

Array.from(checkboxes).forEach((ele) => {
  ele.addEventListener("click", (e) => {
    ele.nextSibling.firstChild.classList.toggle("check");
    ele.parentElement.childNodes[2].classList.toggle("line");
    countItems();
    localStorage.setItem("todos", tasks.innerHTML);
  });
});

let h3 = document.getElementsByTagName("h3");

Array.from(h3).forEach((ele) => {
  ele.addEventListener("click", (e) => {
    ele.previousSibling.firstChild.classList.toggle("check");
    ele.parentElement.childNodes[2].classList.toggle("line");
    countItems();
    localStorage.setItem("todos", tasks.innerHTML);
  });
});

let clear = document.getElementById("clear");
let task = document.getElementsByClassName("task");
clear.addEventListener("click", () => {
  Array.from(task).forEach((ele) => {
    if (ele.children[1].children[0].classList.contains("check")) {
      ele.remove();
      countItems();
      localStorage.setItem("todos", tasks.innerHTML);
      document.location.reload();
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

let light = document.querySelectorAll(".light");
let sun = document.getElementById("sun");
let moon = document.getElementById("moon");

let makeDark = () => {
  Array.from(light).forEach((ele) => {
    ele.classList.remove("light");
  });
  localStorage.setItem("theme", "dark");
  sun.classList.remove("hide");
  moon.classList.add("hide");
};
let makeLight = () => {
  Array.from(light).forEach((ele) => {
    ele.classList.add("light");
  });
  localStorage.setItem("theme", "light");
  sun.classList.add("hide");
  moon.classList.remove("hide");
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
