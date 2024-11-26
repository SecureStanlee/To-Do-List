
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const searchInput = document.getElementById("searchInput"); // Assuming there's an input with this ID

// Function to add a task
function addTask() {
    if (inputBox.value === '') {
        alert("Add something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = `<div class="task-text">${inputBox.value}</div>`;
        listContainer.appendChild(li);

        // Create the three vertical dots
        let span = document.createElement("span");
        span.innerHTML = "&#8942;";
        span.className = "three-dots";
        li.appendChild(span);

        // Create the buttons container
        let buttonsContainer = document.createElement("div");
        buttonsContainer.className = "buttons-container";
        buttonsContainer.style.display = "none"; // Initially hidden

        // Add Delete and Edit buttons
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        buttonsContainer.appendChild(deleteButton);

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-button";
        buttonsContainer.appendChild(editButton);

        li.appendChild(buttonsContainer);

        // **Add Event Listeners for Hover Behavior**
        span.addEventListener("mouseenter", function () {
            buttonsContainer.style.display = "block";
        });

        buttonsContainer.addEventListener("mouseenter", function () {
            buttonsContainer.style.display = "block";
        });

        span.addEventListener("mouseleave", function () {
            setTimeout(() => {
                if (!buttonsContainer.matches(":hover")) {
                    buttonsContainer.style.display = "none";
                }
            }, 100); // Small delay to allow transition
        });

        buttonsContainer.addEventListener("mouseleave", function () {
            buttonsContainer.style.display = "none";
        });

        // **Add Functionality for Delete Button**
        deleteButton.addEventListener("click", function () {
            li.remove();
            saveData();
        });

        // **Add Functionality for Edit Button**
        editButton.addEventListener("click", function () {
            const taskText = li.querySelector(".task-text");
            const newText = prompt("Edit your task:", taskText.textContent);
            if (newText !== null && newText.trim() !== "") {
                taskText.textContent = newText;
                saveData();
            }
        });

        saveData(); // Save the updated task list
    }

    inputBox.value = ""; // Clear the input box
}


// Event listener for marking tasks as completed
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI" && !e.target.classList.contains("three-dots")) {
        e.target.classList.toggle("checked");
        saveData();
    }
}, false);

// Function to save data to localStorage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to display saved tasks from localStorage
// Function to display saved tasks from localStorage
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";

    const spans = listContainer.querySelectorAll(".three-dots");
    spans.forEach(span => {
        const li = span.parentElement;
        const buttonsContainer = li.querySelector(".buttons-container");

        // Show the buttons-container on hover over the dots
        span.addEventListener("mouseenter", function () {
            buttonsContainer.style.display = "block";
        });

        // Prevent hiding when hovering over the buttons-container
        buttonsContainer.addEventListener("mouseenter", function () {
            buttonsContainer.style.display = "block";
        });

        // Hide buttons-container when leaving the dots or the buttons-container
        span.addEventListener("mouseleave", function () {
            setTimeout(() => {
                if (!buttonsContainer.matches(":hover")) {
                    buttonsContainer.style.display = "none";
                }
            }, 100); // Small delay to detect mouse enter on buttons-container
        });

        buttonsContainer.addEventListener("mouseleave", function () {
            buttonsContainer.style.display = "none";
        });

        // Reapply Delete functionality
        buttonsContainer.querySelector(".delete-button").addEventListener("click", function () {
            li.remove();
            saveData();
        });

        // Reapply Edit functionality
        buttonsContainer.querySelector(".edit-button").addEventListener("click", function () {
            const taskText = li.querySelector(".task-text");
            const newText = prompt("Edit your task:", taskText.textContent);
            if (newText !== null && newText.trim() !== "") {
                taskText.textContent = newText;
                saveData();
            }
        });
    });
}



showTask();



document.getElementById("searchButton").addEventListener("click", filterList);
searchInput.addEventListener("input", filterList);

function filterList() {
    const query = searchInput.value.toLowerCase();
    const contentItems = listContainer.querySelectorAll('#list-container li'); // Updated dynamically

    contentItems.forEach((item) => {
        if (query === "") {
            item.classList.remove('hidden', 'highlight');
        } else if (item.textContent.toLowerCase().includes(query)) {
            item.classList.remove('hidden');
            item.classList.add('highlight');
        } else {
            item.classList.add('hidden');
            item.classList.remove('highlight');
        }
    });
}
















// Attach event listener to input box
inputBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask(); // Call the addTask function
        event.preventDefault(); // Prevent any default behavior (optional)
    }
});




