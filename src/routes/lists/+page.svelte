<script>
  import { onMount } from 'svelte';
  import { getAll } from '../../lib/db';
  import ListView from '../../components/ListView.svelte';

  let contacts = [];
  let leads = [];
  let companies = [];

  const contactColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
  ];

  const leadColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status' },
  ];

  const companyColumns = [
    { key: 'name', label: 'Company Name' },
    { key: 'industry', label: 'Industry' },
    { key: 'size', label: 'Size' },
  ];

  onMount(async () => {
    contacts = await getAll('contacts');
    leads = await getAll('leads');
    companies = await getAll('companies');
  });

  function handleEdit(item, type) {
    window.location.href = `/${type}/${item.id}/edit`;
  }

  function handleDelete(item, type) {
    // Implement delete functionality
    console.log(`Delete ${type}:`, item);
  }
</script>

<svelte:head>
  <title>Lists Overview | CRM</title>
</svelte:head>

<h1 class="text-3xl font-bold mb-6 text-white">Lists Overview</h1>

<div class="space-y-8">
  <ListView
    items={contacts}
    columns={contactColumns}
    title="Contacts"
    on:edit={event => handleEdit(event.detail, 'contacts')}
    on:delete={event => handleDelete(event.detail, 'contacts')}
  />

  <ListView
    items={leads}
    columns={leadColumns}
    title="Leads"
    on:edit={event => handleEdit(event.detail, 'leads')}
    on:delete={event => handleDelete(event.detail, 'leads')}
  />

  <ListView
    items={companies}
    columns={companyColumns}
    title="Companies"
    on:edit={event => handleEdit(event.detail, 'companies')}
    on:delete={event => handleDelete(event.detail, 'companies')}
  />
</div>