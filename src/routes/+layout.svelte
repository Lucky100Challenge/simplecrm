<script>
    import "../app.css";
    import { onMount } from 'svelte';
    import { initDB } from '../lib/db';
    import TopMenu from '../components/TopMenu.svelte';
    import { theme } from '../stores/theme';

    onMount(async () => {
        await initDB();
        // Apply the theme on initial load
        document.body.classList.toggle('dark', $theme === 'dark');
    });

    // Update the body class whenever the theme changes
    $: {
        if (typeof document !== 'undefined') {
            document.body.classList.toggle('dark', $theme === 'dark');
        }
    }
</script>

<div class="min-h-screen transition-colors duration-300">
    <TopMenu />
    <main class="container mx-auto px-4 py-8">
        <slot />
    </main>
</div>

<style>
    :global(body) {
        @apply bg-white text-gray-900 transition-colors duration-300;
    }
    :global(body.dark) {
        @apply bg-gray-900 text-white;
    }
    :global(.dark) {
        color-scheme: dark;
    }
</style>
