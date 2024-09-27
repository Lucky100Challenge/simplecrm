<script>
  import { onMount } from 'svelte';
  import { getAll, remove } from '../../lib/db';
  import ListView from '../../components/ListView.svelte';

  let companies = [];
  let contacts = [];

  const columns = [
    { key: 'name', label: 'Company Name' },
    { key: 'industry', label: 'Industry' },
    { key: 'size', label: 'Size' },
    { key: 'contactCount', label: 'Contacts' },
  ];

  onMount(async () => {
    companies = await getAll('companies');
    contacts = await getAll('contacts');
    
    // Add companies from contacts
    const contactCompanies = contacts
      .filter(contact => contact.company)
      .reduce((acc, contact) => {
        if (!acc[contact.company]) {
          acc[contact.company] = { name: contact.company, contactCount: 1 };
        } else {
          acc[contact.company].contactCount++;
        }
        return acc;
      }, {});

    // Merge and deduplicate companies
    companies = [
      ...companies.map(company => ({ ...company, contactCount: 0 })),
      ...Object.values(contactCompanies)
    ].reduce((acc, company) => {
      const existingCompany = acc.find(c => c.name === company.name);
      if (existingCompany) {
        existingCompany.contactCount += company.contactCount || 0;
      } else {
        acc.push(company);
      }
      return acc;
    }, []);
  });

  async function handleEdit(company) {
    window.location.href = `/companies/${company.id || 'add'}?name=${encodeURIComponent(company.name)}`;
  }

  async function handleDelete(company) {
    if (confirm('Are you sure you want to delete this company?')) {
      if (company.id) {
        await remove('companies', company.id);
      }
      companies = companies.filter(c => c.name !== company.name);
    }
  }
</script>

<svelte:head>
  <title>Companies | CRM</title>
</svelte:head>

<h1 class="text-3xl font-bold mb-6 text-white">Companies</h1>

<ListView
  items={companies}
  {columns}
  title="Companies"
  on:edit={event => handleEdit(event.detail)}
  on:delete={event => handleDelete(event.detail)}
/>