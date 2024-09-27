<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { get, add, update } from '../../../lib/db';

  let deal = { name: '', value: 0, stage: 'Prospecting', company: '', contact: '' };
  let isEditing = false;

  const stages = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

  onMount(async () => {
    const id = $page.params.id;
    if (id !== 'add') {
      isEditing = true;
      deal = await get('deals', parseInt(id));
    }
  });

  async function handleSubmit() {
    if (isEditing) {
      await update('deals', deal);
    } else {
      await add('deals', deal);
    }
    window.location.href = '/deals';
  }
</script>

<svelte:head>
  <title>{isEditing ? 'Edit' : 'Add'} Deal | CRM</title>
</svelte:head>

<h1 class="text-3xl font-bold mb-6 text-white">{isEditing ? 'Edit' : 'Add'} Deal</h1>

<form on:submit|preventDefault={handleSubmit} class="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <div class="mb-4">
    <label class="block text-gray-300 text-sm font-bold mb-2" for="name">
      Deal Name
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white border-gray-600 leading-tight focus:outline-none focus:border-red-500"
      id="name"
      type="text"
      placeholder="Deal Name"
      bind:value={deal.name}
      required
    >
  </div>
  <div class="mb-4">
    <label class="block text-gray-300 text-sm font-bold mb-2" for="value">
      Value
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white border-gray-600 leading-tight focus:outline-none focus:border-red-500"
      id="value"
      type="number"
      placeholder="Deal Value"
      bind:value={deal.value}
      required
    >
  </div>
  <div class="mb-4">
    <label class="block text-gray-300 text-sm font-bold mb-2" for="stage">
      Stage
    </label>
    <select
      class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white border-gray-600 leading-tight focus:outline-none focus:border-red-500"
      id="stage"
      bind:value={deal.stage}
    >
      {#each stages as stage}
        <option value={stage}>{stage}</option>
      {/each}
    </select>
  </div>
  <div class="mb-4">
    <label class="block text-gray-300 text-sm font-bold mb-2" for="company">
      Company
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white border-gray-600 leading-tight focus:outline-none focus:border-red-500"
      id="company"
      type="text"
      placeholder="Company Name"
      bind:value={deal.company}
    >
  </div>
  <div class="mb-6">
    <label class="block text-gray-300 text-sm font-bold mb-2" for="contact">
      Contact
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white border-gray-600 leading-tight focus:outline-none focus:border-red-500"
      id="contact"
      type="text"
      placeholder="Contact Name"
      bind:value={deal.contact}
    >
  </div>
  <div class="flex items-center justify-between">
    <button
      class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
    >
      {isEditing ? 'Update' : 'Create'} Deal
    </button>
  </div>
</form>