<script>
  import { onMount } from 'svelte';
  import { getAll, remove } from '../../lib/db';
  import ListView from '../../components/ListView.svelte';

  let leads = [];
  let contacts = [];

  const columns = [
    { key: 'name', label: 'Lead Name' },
    { key: 'industry', label: 'Industry' },
    { key: 'size', label: 'Size' },
    { key: 'contactCount', label: 'Contacts' },
  ];

  onMount(async () => {
    await loadLeads();
  });

  async function loadLeads() {
    leads = await getAll('leads');
    contacts = await getAll('contacts');
    
    // Add leads from contacts
    const contactLeads = contacts
      .filter(contact => contact.company)
      .reduce((acc, contact) => {
        if (!acc[contact.company]) {
          acc[contact.company] = { name: contact.company, contactCount: 1 };
        } else {
          acc[contact.company].contactCount++;
        }
        return acc;
      }, {});

    // Merge and deduplicate leads
    leads = [
      ...leads.map(lead => ({ ...lead, contactCount: 0 })),
      ...Object.values(contactLeads)
    ].reduce((acc, lead) => {
      const existingLead = acc.find(c => c.name === lead.name);
      if (existingLead) {
        existingLead.contactCount += lead.contactCount || 0;
      } else {
        acc.push(lead);
      }
      return acc;
    }, []);
  }

  function handleEdit(lead) {
    window.location.href = `/leads/${lead.id || 'add'}?name=${encodeURIComponent(lead.name)}`;
  }

  async function handleDelete(lead) {
    if (confirm('Are you sure you want to delete this lead?')) {
      if (lead.id) {
        await remove('leads', lead.id);
      }
      await loadLeads();
    }
  }

  function handleAddNew() {
    window.location.href = '/leads/add';
  }
</script>

<svelte:head>
  <title>Leads | CRM</title>
</svelte:head>

<h1 class="text-3xl font-bold mb-6 text-white">Leads</h1>

<ListView
  items={leads}
  {columns}
  title="Leads"
  on:edit={event => handleEdit(event.detail)}
  on:delete={event => handleDelete(event.detail)}
  on:addNew={handleAddNew}
/>