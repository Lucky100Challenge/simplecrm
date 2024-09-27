<script>
  import { onMount } from 'svelte';
  import { getAll, remove } from '../../lib/db';
  import ListView from '../../components/ListView.svelte';

  let deals = [];

  const columns = [
    { key: 'name', label: 'Deal Name' },
    { key: 'value', label: 'Value' },
    { key: 'stage', label: 'Stage' },
  ];

  onMount(async () => {
    deals = await getAll('deals');
  });

  async function handleEdit(deal) {
    window.location.href = `/deals/${deal.id}/edit`;
  }

  async function handleDelete(deal) {
    if (confirm('Are you sure you want to delete this deal?')) {
      await remove('deals', deal.id);
      deals = deals.filter(d => d.id !== deal.id);
    }
  }

  function handleAddNew() {
    window.location.href = '/deals/add';
  }
</script>

<svelte:head>
  <title>Deals | CRM</title>
</svelte:head>

<h1 class="text-3xl font-bold mb-6 text-white">Deals</h1>

<ListView
  items={deals}
  {columns}
  title="Deals"
  on:edit={event => handleEdit(event.detail)}
  on:delete={event => handleDelete(event.detail)}
  on:addNew={handleAddNew}
/>