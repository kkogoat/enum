<script lang="ts">
	import { onMount } from "svelte";

    let theme: string | undefined = "";

    onMount(() => {
        theme = document.documentElement.dataset.theme;
    });

    // HANDLE THEME
    function setTheme(thm: string) {
        theme = thm;
        document.documentElement.dataset.theme = theme;
        document.cookie = `theme=${theme};max-age=31536000;path="/"; SameSite=strict;`;
    }
</script>

<style>
    .theme-toggle {
        position: absolute;
        top: 15px;
        right: 15px;
    }
</style>

{#if theme == "light"}
    <button class="theme-toggle" on:click={() => setTheme("dark")}>
        {theme}
    </button>
{:else}
    <button class="theme-toggle" on:click={() => setTheme("light")}>
        {theme}
    </button>
{/if}
