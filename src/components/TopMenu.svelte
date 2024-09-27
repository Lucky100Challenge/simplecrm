<script>
  import { page } from '$app/stores';
  import { theme } from '../stores/theme';

  function toggleTheme() {
    theme.update(t => t === 'dark' ? 'light' : 'dark');
  }
</script>

<nav class="bg-gray-900 shadow-lg dark:bg-gray-800">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex justify-between h-16">
      <div class="flex-shrink-0 flex items-center">
        <a href="/" class="text-2xl font-bold text-red-600">CRM</a>
      </div>
      <div class="hidden sm:flex sm:space-x-4 flex-grow justify-center">
        <a href="/" class="nav-link" class:active={$page.url.pathname === '/'}>
          <i class="fas fa-tachometer-alt mr-2"></i>Dashboard
        </a>
        <a href="/contacts" class="nav-link" class:active={$page.url.pathname === '/contacts'}>
          <i class="fas fa-address-book mr-2"></i>Contacts
        </a>
        <a href="/leads" class="nav-link" class:active={$page.url.pathname === '/leads'}>
          <i class="fas fa-user-tie mr-2"></i>Leads
        </a>
        <a href="/deals" class="nav-link" class:active={$page.url.pathname === '/deals'}>
          <i class="fas fa-handshake mr-2"></i>Deals
        </a>
        <a href="/tasks" class="nav-link" class:active={$page.url.pathname === '/tasks'}>
          <i class="fas fa-tasks mr-2"></i>Tasks
        </a>
        <a href="/notes" class="nav-link" class:active={$page.url.pathname === '/notes'}>
          <i class="fas fa-sticky-note mr-2"></i>Notes
        </a>
      </div>
      <div class="flex items-center">
        <button on:click={toggleTheme} class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
          {$theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  </div>
</nav>

<style>
  .nav-link {
    @apply inline-flex items-center px-3 py-2 border-b-2 border-transparent text-sm font-medium text-gray-400 hover:text-gray-200 hover:border-gray-300;
  }
  .nav-link.active {
    @apply border-red-600 text-white;
  }
</style>