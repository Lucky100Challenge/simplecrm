<script>
  import { createEventDispatcher } from 'svelte';

  export let items = [];
  export let columns = [];
  export let title = '';
  export let filters = {};

  const dispatch = createEventDispatcher();

  let searchTerm = '';
  let selectedFilters = {};

  $: filteredItems = items.filter(item => 
    columns.some(column => 
      item[column.key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    Object.entries(selectedFilters).every(([key, value]) => 
      value === '' || item[key] === value
    )
  );

  function handleEdit(item) {
    dispatch('edit', item);
  }

  function handleDelete(item) {
    dispatch('delete', item);
  }

  function handleAddNew() {
    dispatch('addNew');
  }
</script>

<div class="bg-secondary shadow-md rounded-lg overflow-hidden">
  <div class="p-4 flex justify-between items-center">
    <h2 class="text-xl font-semibold text-primary">{title}</h2>
    <button on:click={handleAddNew} class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
      Add New
    </button>
  </div>
  <div class="p-4 space-y-4">
    <input
      type="text"
      placeholder="Search..."
      bind:value={searchTerm}
      class="w-full p-2 border rounded bg-primary text-primary border-gray-600 focus:border-red-500 focus:outline-none"
    />
    <div class="flex space-x-4">
      {#each Object.entries(filters) as [key, options]}
        <select
          bind:value={selectedFilters[key]}
          class="p-2 rounded bg-gray-700 text-white border-gray-600 focus:border-red-500 focus:outline-none"
        >
          <option value="">All {key}</option>
          {#each options as option}
            <option value={option}>{option}</option>
          {/each}
        </select>
      {/each}
    </div>
  </div>
  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
    <thead class="bg-gray-50 dark:bg-gray-700">
      <tr>
        {#each columns as column}
          <th class="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
            {column.label}
          </th>
        {/each}
        <th class="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody class="bg-secondary divide-y divide-gray-200 dark:divide-gray-700">
      {#each filteredItems as item}
        <tr>
          {#each columns as column}
            <td class="px-6 py-4 whitespace-nowrap text-sm text-primary">
              {item[column.key]}
            </td>
          {/each}
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <button on:click={() => handleViewDetails(item)} class="text-blue-400 hover:text-blue-300 mr-2">
              View
            </button>
            <button on:click={() => handleEdit(item)} class="text-indigo-400 hover:text-indigo-300 mr-2">
              Edit
            </button>
            <button on:click={() => handleDelete(item)} class="text-red-400 hover:text-red-300">
              Delete
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>