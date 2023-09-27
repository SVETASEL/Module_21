document.addEventListener("DOMContentLoaded", () => {
    const userIdInput = document.getElementById("userIdInput");
    const getTasksButton = document.getElementById("getTasksButton");
    const taskList = document.getElementById("taskList");
  
    getTasksButton.addEventListener("click", () => {
      const userId = userIdInput.value;
  
      // Очищаем предыдущий список задач
      taskList.innerHTML = "";
  
      // Отправляем запрос на получение задач
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
        .then(response => response.json())
        .then(tasks => {
          if (tasks.length === 0) {
            taskList.textContent = "Пользователь с указанным id не найден";
            return;
          }
  
          const list = document.createElement("ul");
  
          tasks.forEach(task => {
            const listItem = document.createElement("li");
            listItem.textContent = task.title;
  
            if (task.completed) {
              listItem.style.textDecoration = "line-through";
            }
  
            list.appendChild(listItem);
          });
  
          taskList.appendChild(list);
        })
        .catch(error => {
          console.error("Произошла ошибка:", error);
        });
    });
  });