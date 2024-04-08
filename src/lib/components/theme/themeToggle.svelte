<script lang="ts">
	import Sun from "$lib/assets/sun.svelte";
	import Moon from "$lib/assets/moon.svelte";
	import { onMount } from "svelte";

    let theme: string | undefined = "";
    let loading: boolean = false;
    let buttonRef: HTMLButtonElement;

    onMount(() => {
        loading = false;
        theme = document.documentElement.dataset.theme != "undefined" ? document.documentElement.dataset.theme : 'light'
        loading = true;
    });

    // HANDLE THEME
    function setTheme(thm: string) {
        theme = thm;
        document.documentElement.dataset.theme = theme;
        document.cookie = `theme=${theme};max-age=31536000;path="/"; SameSite=strict;`;
    }
</script>

<style>
    .theme-container {
        background-color: var(--foreground-color);
        position: fixed;
        width: 70px;
        height: 30px;
        border-radius: 50px;
        top: 15px;
        right: 15px;
        transition: var(--color-animation-timing) ease;
        user-select: none;
        cursor: pointer;
        z-index: 999;
    }

    .theme-container:hover .theme-toggle {
        background-color: var(--accent-color-hover);
    }

    .theme-toggle {
        background-color: var(--accent-color);
        height: 30px;
        width: 30px;
        position: absolute;
        transition: var(--color-animation-timing) ease;
        border-radius: 50px;
        padding: 0px;
        box-sizing: border-box;
    }

    .light {
        top: 0px;
        left: 0px;
        transition: var(--color-animation-timing) ease;
        user-select: none;
    }

    .dark {
        top: 0px;
        left: 40px;
        transition: var(--color-animation-timing) ease;
    }
</style>

{#if loading}
    <div class="theme-container" on:click|self={() => buttonRef.click()} aria-hidden="true">
        <Sun /> <Moon />
        <button type="button" class="theme-toggle {theme}" bind:this={buttonRef} on:click={theme=="light" ? () => setTheme("dark") : () => setTheme("light")}>
            &nbsp;
        </button>
    </div>
{/if}