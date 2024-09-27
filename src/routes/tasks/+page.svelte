<script>
  import { onMount } from 'svelte';
  import { addTask, updateTask, deleteTask, getAllTasks } from '../../lib/db';

  let tasks = [];
  let newTaskTitle = '';
  let newTaskDueDate = '';
  let newTaskPriority = 'medium';
  let filter = 'all';

  onMount(async () => {
    await loadTasks();
  });

  async function loadTasks() {
    tasks = await getAllTasks();
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }

  async function handleAddTask() {
    if (newTaskTitle.trim()) {
      await addTask({
        title: newTaskTitle,
        dueDate: newTaskDueDate,
        priority: newTaskPriority,
        completed: false
      });
      newTaskTitle = '';
      newTaskDueDate = '';
      newTaskPriority = 'medium';
      await loadTasks();
    }
  }

  async function toggleTaskCompletion(task) {
    task.completed = !task.completed;
    await updateTask(task);
    await loadTasks();
  }

  async function handleDeleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
      await loadTasks();
    }
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  }

  $: filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
  });
</script>

<svelte:head>
  <title>Tasks | CRM</title>
</svelte:head>

<h1 class="text-3xl font-bold mb-6 text-white">Task Management</h1>

<div class="bg-gray-800 shadow-md rounded-lg p-6 mb-6">
  <h2 class="text-xl font-semibold mb-4 text-white">Add New Task</h2>
  <form on:submit|preventDefault={handleAddTask} class="space-y-4">
    <input
      type="text"
      bind:value={newTaskTitle}
      placeholder="Task title"
      class="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
      required
    />
    <input
      type="date"
      bind:value={newTaskDueDate}
      class="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
    />
    <select
      bind:value={newTaskPriority}
      class="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <button type="submit" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
      Add Task
    </button>
  </form>
</div>

<div class="bg-gray-800 shadow-md rounded-lg p-6">
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-xl font-semibold text-white">Task List</h2>
    <select
      bind:value={filter}
      class="p-2 bg-gray-700 border border-gray-600 rounded text-white"
    >
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="completed">Completed</option>
    </select>
  </div>
  
  {#if filteredTasks.length === 0}
    <p class="text-gray-400">No tasks found.</p>
  {:else}
    <ul class="space-y-4">
      {#each filteredTasks as task (task.id)}
        <li class="bg-gray-700 p-4 rounded-lg flex items-center justify-between">
          <div class="flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              on:change={() => toggleTaskCompletion(task)}
              class="mr-4 h-5 w-5 text-red-600"
            />
            <div>
              <span class={task.completed ? 'line-through text-gray-500' : 'text-white'}>
                {task.title}
              </span>
              {#if task.dueDate}
                <span class="ml-2 text-sm text-gray-400">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              {/if}
              <span class={`ml-2 text-sm ${getPriorityColor(task.priority)}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
            </div>
          </div>
          <button
            on:click={() => handleDeleteTask(task.id)}
            class="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>