class Task {
    constructor(id, name, description) {
      this.id = id;
      this.name = name;
      this.description = description;
    }
  }
  
  class TaskManager {
    constructor() {
      this.tasks = [];
      this.nextId = 1;
    }
  
    addTask(name, description) {
      const task = new Task(this.nextId++, name, description);
      this.tasks.push(task);
      return task;
    }
  
    getTasks() {
      return this.tasks;
    }
  
    updateTask(id, newName, newDescription) {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
        task.name = newName;
        task.description = newDescription;
        return task;
      }
      return null;
    }
  
    deleteTask(id) {
      const index = this.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        return this.tasks.splice(index, 1);
      }
      return null;
    }
  }
  
  const taskManager = new TaskManager();
  
  const taskNameInput = document.getElementById('taskName');
  const taskDescriptionInput = document.getElementById('taskDescription');
  const taskListContainer = document.getElementById('taskListContainer');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const editModal = document.getElementById('editModal');
  const editTaskName = document.getElementById('editTaskName');
  const editTaskDescription = document.getElementById('editTaskDescription');
  const updateTaskBtn = document.getElementById('updateTaskBtn');
  const closeBtn = document.getElementsByClassName('close-btn')[0];
  
  addTaskBtn.addEventListener('click', () => {
    const name = taskNameInput.value;
    const description = taskDescriptionInput.value;
  
    if (name && description) {
      const newTask = taskManager.addTask(name, description);
      renderTasks();
      taskNameInput.value = '';
      taskDescriptionInput.value = '';
    } else {
      alert('Please enter both name and description');
    }
  });
  
  function renderTasks() {
    taskListContainer.innerHTML = '';
    const tasks = taskManager.getTasks();
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${task.name}</span> - <span>${task.description}</span>
        <button class="edit-btn" onclick="openEditModal(${task.id})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
      `;
      taskListContainer.appendChild(li);
    });
  }
  
  function openEditModal(id) {
    const task = taskManager.getTasks().find(task => task.id === id);
    if (task) {
      editTaskName.value = task.name;
      editTaskDescription.value = task.description;
      updateTaskBtn.onclick = () => updateTask(id);
      editModal.style.display = 'block';
    }
  }
  
  function updateTask(id) {
    const newName = editTaskName.value;
    const newDescription = editTaskDescription.value;
  
    if (newName && newDescription) {
      const updatedTask = taskManager.updateTask(id, newName, newDescription);
      if (updatedTask) {
        renderTasks();
        closeEditModal();
      } else {
        alert('Task not found.');
      }
    } else {
      alert('Please enter both name and description');
    }
  }
  
  function deleteTask(id) {
    const deletedTask = taskManager.deleteTask(id);
    if (deletedTask) {
      renderTasks();
    } else {
      alert('Task not found.');
    }
  }
  
  closeBtn.addEventListener('click', closeEditModal);
  function closeEditModal() {
    editModal.style.display = 'none';
  }
  
  window.onclick = function(event) {
    if (event.target === editModal) {
      closeEditModal();
    }
  }
  
  renderTasks();
  