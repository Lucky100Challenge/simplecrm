<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { get, add, update } from '../../../lib/db';

  let company = { name: '', industry: '', size: '', website: '', description: '' };
  let isEditing = false;

  const industries = ['Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing', 'Retail', 'Other'];
  const companySizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];

  onMount(async () => {
    const id = $page.params.id;
    if (id !== 'add') {
      isEditing = true;
      company = await get('companies', parseInt(id));
    }
  });

  async function handleSubmit() {
    if (isEditing) {
      await update('companies', company);
    } else {
      await add('companies', company);
    }
    window.location.href = '/companies';
  }
</script>

<svelte:head>
  <title>{isEditing ? 'Edit' : 'Add'} Company | CRM</title>
</svelte:head>

<h1 class="text-3xl font-bold mb-6 text-white">{isEditing ? 'Edit' : 'Add'} Company</h1>

<form on:submit|preventDefault={handleSubmit} class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <div class="mb-4">
    <label class="block text-gray-300 text-sm font-bold mb-2" for="name">
      Company Name
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white border-gray-600 leading-tight focus:outline-none focus:border-red-500"
      id="name"
      type="text"
      placeholder="Company Name"
      bind:value={company.name}
      required
    >
  </div>
  <div class="mb-4">
    <label class="block text-gray-300 text-sm font-bold mb-2" for="industry">
      Industry
    </label>
    <select
      class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white border-gray-600 leading-tight focus:outline-none focus:border-red-500"
      id="industry"
      bind:value={company.industry}
    >
      {#each industries as industry}
        <option value={industry}>{industry}</option>
      {/each}
    </select>
  </div>
  <div class="mb-4">
    <label class="block text-gray-300 text-sm font-bold mb-2" for="size">
      Company Size
    </label>
    <select
      class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white border-gray-600 leading-tight focus:outline-none focus:border-red-500"
      id="size"
      bind:value={company.size}
    >
      {#each companySizes as size}
        <option value={size}>{size}</option>
      {/each}
    </select>
  </div>
  <div class="mb-4">
    <label class="block text-gray-300 text-sm font-bold mb-2" for="website">
      Website
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white border-gray-600 leading-tight focus:outline-none focus:border-red-500"
      id="website"
      type="url"
      placeholder="Company Website"
      bind:value={company.website}
    >
  </div>
  <div class="mb-6">
    <label class="block text-gray-300 text-sm font-bold mb-2" for="description">
      Description
    </label>
    <textarea
      class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white border-gray-600 leading-tight focus:outline-none focus:border-red-500"
      id="description"
      placeholder="Company Description"
      bind:value={company.description}
    ></textarea>
  </div>
  <div class="flex items-center justify-between">
    <button
      class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
    >
      {isEditing ? 'Update' : 'Create'} Company
    </button>
  </div>
</form>