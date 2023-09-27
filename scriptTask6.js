document.addEventListener("DOMContentLoaded", () => {
    const pageNumberInput = document.getElementById("pageNumber");
    const limitInput = document.getElementById("limit");
    const requestButton = document.getElementById("requestButton");
    const imageList = document.getElementById("imageList");
  
    // Проверка, есть ли данные в localStorage
    const lastPageNumber = localStorage.getItem("lastPageNumber");
    const lastLimit = localStorage.getItem("lastLimit");
  
    if (lastPageNumber && lastLimit) {
      pageNumberInput.value = lastPageNumber;
      limitInput.value = lastLimit;
      requestData(lastPageNumber, lastLimit);
    }
  
    requestButton.addEventListener("click", () => {
      const pageNumber = parseInt(pageNumberInput.value);
      const limit = parseInt(limitInput.value);
  
      imageList.innerHTML = "";
  
      if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > 10) {
        imageList.textContent = "Номер страницы вне диапазона от 1 до 10";
      } else if (isNaN(limit) || limit < 1 || limit > 10) {
        imageList.textContent = "Лимит вне диапазона от 1 до 10";
      } else {
        requestData(pageNumber, limit);

        localStorage.setItem("lastPageNumber", pageNumber);
        localStorage.setItem("lastLimit", limit);
      }
    });
  
    function requestData(pageNumber, limit) {
      fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
          const list = document.createElement("ul");
  
          data.forEach(item => {
            const listItem = document.createElement("li");
            const image = document.createElement("img");
            image.src = item.download_url;
            listItem.appendChild(image);
            list.appendChild(listItem);
          });
  
          imageList.appendChild(list);
        })
        .catch(error => {
          console.error("Произошла ошибка:", error);
        });
    }
  });
  