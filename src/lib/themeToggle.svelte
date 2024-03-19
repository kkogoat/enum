<script lang="ts">
	import { onMount } from "svelte";

    let theme: string | undefined = "";
    let loading: boolean = false;
    let buttonRef: HTMLButtonElement;

    onMount(() => {
        loading = false;
        theme = document.documentElement.dataset.theme;
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
        transition: .2s ease;
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
        transition: .2s ease;
        border-radius: 50px;
        padding: 0px;
        box-sizing: border-box;
    }
    .light {
        top: 0px;
        left: 0px;
        transition: .2s ease;
        user-select: none;
    }
    .dark {
        top: 0px;
        left: 40px;
        transition: .2s ease;
    }

    .sun {
        position: relative;
        top: 3px;
        left: 5px;
        filter: var(--accent-color-filtered);
        pointer-events: none;
    }
    .moon {
        position: relative;
        right: -14px;
        top: 3px;
        filter: var(--accent-color-filtered);
        pointer-events: none;
    }
</style>

{#if loading}
    <div class="theme-container" on:click|self={() => buttonRef.click()} aria-hidden="true">
        <img class="sun" src="/sun.svg" alt="light-mode" on:click|self={() => buttonRef.click()} aria-hidden="true"/>
        <img class="moon" src="/moon.svg" alt="dark-mode" on:click|self={() => buttonRef.click()} aria-hidden="true"/>
        <button type="button" class="theme-toggle {theme}" bind:this={buttonRef} on:click={theme=="light" ? () => setTheme("dark") : () => setTheme("light")}>
            &nbsp;
        </button>
    </div>
{:else}
    <span/>
{/if}