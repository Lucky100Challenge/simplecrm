<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { get, update, add, remove } from '../../../lib/db';

  let lead = { name: '', email: '', phone: '', status: 'New', company: '' };
  let notes = [];
  let newNote = '';
  let isEditing = false;

  const statuses = ['New', 'Contacted', 'Qualified', 'Lost', 'Converted'];

  onMount(async () => {
    const id = $page.params.id;
    if (id !== 'add') {
      isEditing = true;
      lead = await get('leads', parseInt(id));
      notes = await get('notes', parseInt(id)) || [];
    }
  });

  async function handleSubmit() {
    if (isEditing) {
      await update('leads', lead);
    } else {
      const newLead = await add('leads', lead);
      lead = newLead;
      isEditing = true;
    }
    alert(isEditing ? 'Lead updated successfully' : 'Lead added successfully');
  }

  async function addNote() {
    if (newNote.trim()) {
      const note = {
        content: newNote,
        date: new Date().toISOString(),
        leadId: lead.id
      };
      await add('notes', note);
      notes = [...notes, note];
      newNote = '';
    }
  }

  async function deleteNote(noteId) {
    await remove('notes', noteId);
    notes = notes.filter(n => n.id !== noteId);
  }
</script>

<svelte:head>
  <title>{isEditing ? lead.name : 'Add New Lead'} | Lead Details</title>
</svelte:head>

<h1 class="text-3xl font-bold mb-6 text-white">{isEditing ? lead.name : 'Add New Lead'}</h1>

<div class="bg-gray-800 shadow-md rounded-lg p-6 mb-6">
  <form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-300">Name</label>
      <input type="text" id="name" bind:value={lead.name} class="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
    </div>
    <div>
      <label for="email" class="block text-sm font-medium text-gray-300">Email</label>
      <input type="email" id="email" bind:value={lead.email} class="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
    </div>
    <div>
      <label for="phone" class="block text-sm font-medium text-gray-300">Phone</label>
      <input type="tel" id="phone" bind:value={lead.phone} class="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
    </div>
    <div>
      <label for="status" class="block text-sm font-medium text-gray-300">Status</label>
      <select id="status" bind:value={lead.status} class="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        {#each statuses as status}
          <option value={status}>{status}</option>
        {/each}
      </select>
    </div>
    <div>
      <label for="company" class="block text-sm font-medium text-gray-300">Company</label>
      <input type="text" id="company" bind:value={lead.company} class="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
    </div>
    <button type="submit" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">{isEditing ? 'Update' : 'Add'} Lead</button>
  </form>
</div>

{#if isEditing}
  <div class="bg-gray-800 shadow-md rounded-lg p-6">
    <h2 class="text-2xl font-bold mb-4 text-white">Notes</h2>
    <div class="space-y-4">
      {#each notes as note}
        <div class="bg-gray-700 p-4 rounded-lg">
          <p class="text-white">{note.content}</p>
          <p class="text-sm text-gray-400 mt-2">{new Date(note.date).toLocaleString()}</p>
          <button on:click={() => deleteNote(note.id)} class="text-red-400 hover:text-red-300 mt-2">Delete</button>
        </div>
      {/each}
    </div>
    <div class="mt-4">
      <textarea bind:value={newNote} placeholder="Add a new note..." class="w-full p-2 bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
      <button on:click={addNote} class="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Note</button>
    </div>
  </div>
{/if}