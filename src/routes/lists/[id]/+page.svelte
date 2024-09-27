<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { get, add, update } from '../../../lib/db';

  let list = { name: '', type: 'general', description: '' };
  let isEditing = false;

  onMount(async () => {
    const id = $page.params.id;
    if (id !== 'add') {
      isEditing = true;
      list = await get('lists', parseInt(id));
    }
  });

  async function handleSubmit() {
    if (isEditing) {
      await update('lists', list);
    } else {
      await add('lists', list);
    }
    window.location.href = '/lists';
  }
</script>

<svelte:head>
  <title>{isEditing ? 'Edit' : 'Add'} List | CRM</title>
</svelte:head>

<h1 class="text-3xl font-bold mb-6 text-white">{isEditing ? 'Edit' : 'Add'} List</h1>

<form on:submit|preventDefault={handleSubmit} class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <div class="mb-4">
    <label class="block text-gray-300 text-sm font-bold mb-2" for="name">
      List Name
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white border-gray-600 leading-tight focus:outline-none focus:border-red-500"
      id="name"
      type="text"
      placeholder="List Name"
      bind:value={list.name}
      required
    >
  </div>
  <div class="mb-4">
    <label class="block text-gray-300 text-sm font-bold mb-2" for="type">
      List Type
    </label>
    <select
      class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white border-gray-600 leading-tight focus:outline-none focus:border-red-500"
      id="type"
      bind:value={list.type}
    >
      <option value="general">General</option>
      <option value="leads">Leads</option>
      <option value="customers">Customers</option>
    </select>
  </div>
  <div class="mb-6">
    <label class="block text-gray-300 text-sm font-bold mb-2" for="description">
      Description
    </label>
    <textarea
      class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white border-gray-600 leading-tight focus:outline-none focus:border-red-500"
      id="description"
      placeholder="List Description"
      bind:value={list.description}
    ></textarea>
  </div>
  <div class="flex items-center justify-between">
    <button
      class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
    >
      {isEditing ? 'Update' : 'Create'} List
    </button>
  </div>
</form>