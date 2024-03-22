<script lang="ts">
	import ThemeToggle from "$lib/themeToggle.svelte";
	import Navbar from "$lib/navbar.svelte";
	import List from "$lib/list.svelte";
    import Login from "$lib/login.svelte";

    // ON MOUNT
    import { authContext } from "$lib/context/authContext";
	import { onMount } from "svelte";
    let loading: boolean = true;
    onMount(async () => {
        await authContext.autoLogin();
        loading = false;
    })

    // LOAD LIST IF LOGGED IN
    import { listContext } from "$lib/context/listContext";
    import { getMediaList } from "$lib/util/mediaFetchUtil";
	import { browser } from "$app/environment";
    $: if(browser && $authContext) getList();
    async function getList() {
        const response = await getMediaList();
        listContext.initializeList(response);
    }
</script>

<style>
    #app-container {
        width: 100vw;
        max-height: 100vh;
    }

    .flex {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<div id="app-container" class={$authContext ? "" : "flex"}>
    <ThemeToggle />
    {#if !loading}
        {#if $authContext}
            <Navbar />
            <List />
        {:else}
            <Login />
        {/if}
    {:else}
        <span></span>
    {/if}
</div>