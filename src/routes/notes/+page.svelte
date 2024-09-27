<script>
  import { onMount } from 'svelte';
  import { addNote, updateNote, deleteNote, getAllNotes } from '../../lib/db';

  let notes = [];
  let newNoteTitle = '';
  let newNoteContent = '';
  let editingNote = null;

  onMount(async () => {
    await loadNotes();
  });

  async function loadNotes() {
    notes = await getAllNotes();
    notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async function handleAddNote() {
    if (newNoteTitle.trim() && newNoteContent.trim()) {
      await addNote({
        title: newNoteTitle,
        content: newNoteContent,
      });
      newNoteTitle = '';
      newNoteContent = '';
      await loadNotes();
    }
  }

  async function handleUpdateNote() {
    if (editingNote && editingNote.title.trim() && editingNote.content.trim()) {
      await updateNote(editingNote);
      editingNote = null;
      await loadNotes();
    }
  }

  async function handleDeleteNote(id) {
    if (confirm('Are you sure you want to delete this note?')) {
      await deleteNote(id);
      await loadNotes();
    }
  }

  function startEditing(note) {
    editingNote = { ...note };
  }

  function cancelEditing() {
    editingNote = null;
  }
</script>

<svelte:head>
  <title>Notes | CRM</title>
</svelte:head>

<h1 class="text-3xl font-bold mb-6 text-white">Notes</h1>

<div class="bg-gray-800 shadow-md rounded-lg p-6 mb-6">
  <h2 class="text-xl font-semibold mb-4 text-white">Add New Note</h2>
  <form on:submit|preventDefault={handleAddNote} class="space-y-4">
    <input
      type="text"
      bind:value={newNoteTitle}
      placeholder="Note title"
      class="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
      required
    />
    <textarea
      bind:value={newNoteContent}
      placeholder="Note content"
      class="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white h-32"
      required
    ></textarea>
    <button type="submit" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
      Add Note
    </button>
  </form>
</div>

<div class="bg-gray-800 shadow-md rounded-lg p-6">
  <h2 class="text-xl font-semibold mb-4 text-white">Your Notes</h2>
  
  {#if notes.length === 0}
    <p class="text-gray-400">No notes found.</p>
  {:else}
    <div class="space-y-4">
      {#each notes as note (note.id)}
        <div class="bg-gray-700 p-4 rounded-lg">
          {#if editingNote && editingNote.id === note.id}
            <input
              type="text"
              bind:value={editingNote.title}
              class="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white mb-2"
            />
            <textarea
              bind:value={editingNote.content}
              class="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white h-32 mb-2"
            ></textarea>
            <div class="flex justify-end space-x-2">
              <button on:click={handleUpdateNote} class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                Save
              </button>
              <button on:click={cancelEditing} class="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
                Cancel
              </button>
            </div>
          {:else}
            <h3 class="text-lg font-semibold text-white">{note.title}</h3>
            <p class="text-gray-300 mt-2">{note.content}</p>
            <p class="text-sm text-gray-400 mt-2">Created: {new Date(note.createdAt).toLocaleString()}</p>
            <div class="flex justify-end space-x-2 mt-2">
              <button on:click={() => startEditing(note)} class="text-blue-400 hover:text-blue-300">
                Edit
              </button>
              <button on:click={() => handleDeleteNote(note.id)} class="text-red-400 hover:text-red-300">
                Delete
              </button>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>