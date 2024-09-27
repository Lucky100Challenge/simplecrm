<script>
  import { onMount } from 'svelte';
  import { getAll } from '../lib/db';

  let contacts = [];
  let deals = [];
  let companies = [];
  let tasks = [];

  onMount(async () => {
    contacts = await getAll('contacts');
    deals = await getAll('deals');
    companies = await getAll('companies');
    tasks = await getAll('tasks');
    tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  });

  $: totalDealValue = deals.reduce((sum, deal) => sum + (deal.value || 0), 0);
</script>

<svelte:head>
  <title>Dashboard | CRM</title>
</svelte:head>

<h1 class="text-3xl font-bold mb-6 text-primary">Dashboard</h1>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <div class="bg-secondary rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4 text-primary">Contacts</h2>
    <p class="text-3xl font-bold text-red-500">{contacts.length}</p>
  </div>
  <div class="bg-secondary rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4 text-primary">Deals</h2>
    <p class="text-3xl font-bold text-red-500">{deals.length}</p>
  </div>
  <div class="bg-secondary rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4 text-primary">Companies</h2>
    <p class="text-3xl font-bold text-red-500">{companies.length}</p>
  </div>
  <div class="bg-secondary rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4 text-primary">Total Deal Value</h2>
    <p class="text-3xl font-bold text-red-500">${totalDealValue.toLocaleString()}</p>
  </div>
</div>

<div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
  <div class="bg-secondary rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4 text-primary">Recent Contacts</h2>
    {#if contacts.length > 0}
      <ul class="divide-y divide-gray-200 dark:divide-gray-700">
        {#each contacts.slice(0, 5) as contact}
          <li class="py-4">
            <p class="text-sm font-medium text-primary">{contact.name}</p>
            <p class="text-sm text-secondary">{contact.email}</p>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-secondary">No contacts found.</p>
    {/if}
  </div>
  <div class="bg-secondary rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4 text-primary">Recent Deals</h2>
    {#if deals.length > 0}
      <ul class="divide-y divide-gray-200 dark:divide-gray-700">
        {#each deals.slice(0, 5) as deal}
          <li class="py-4">
            <p class="text-sm font-medium text-primary">{deal.name}</p>
            <p class="text-sm text-red-500">${deal.value?.toLocaleString() ?? '0'}</p>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-secondary">No deals found.</p>
    {/if}
  </div>
  <div class="bg-secondary rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4 text-primary">To-Do List</h2>
    {#if tasks.length > 0}
      <ul class="divide-y divide-gray-200 dark:divide-gray-700">
        {#each tasks.slice(0, 5) as task}
          <li class="py-4 flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              class="mr-3 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <div>
              <p class="text-sm font-medium text-primary">{task.title}</p>
              <p class="text-xs text-secondary">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            </div>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-secondary">No tasks found.</p>
    {/if}
    <a href="/tasks" class="mt-4 inline-block text-red-500 hover:text-red-400">View all tasks</a>
  </div>
</div>
