<script>
  import { onMount } from 'svelte';
  import { getAll, remove } from '../../lib/db';
  import ListView from '../../components/ListView.svelte';

  let contacts = [];

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
  ];

  onMount(async () => {
    contacts = await getAll('contacts');
  });

  async function handleEdit(contact) {
    window.location.href = `/contacts/${contact.id}`;
  }

  async function handleDelete(contact) {
    if (confirm('Are you sure you want to delete this contact?')) {
      await remove('contacts', contact.id);
      contacts = contacts.filter(c => c.id !== contact.id);
    }
  }

  function handleAddNew() {
    window.location.href = '/contacts/add';
  }
</script>

<svelte:head>
  <title>Contacts | CRM</title>
</svelte:head>

<h1 class="text-3xl font-bold mb-6 text-white">Contacts</h1>

<ListView
  items={contacts}
  {columns}
  title="Contacts"
  on:edit={event => handleEdit(event.detail)}
  on:delete={event => handleDelete(event.detail)}
  on:addNew={handleAddNew}
/>