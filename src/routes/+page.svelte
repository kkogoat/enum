<script lang="ts">
	import MediaItem from "$lib/mediaItem.svelte";
    import Login from "$lib/login.svelte";
	import AddModal from "$lib/addModal.svelte";

    // ON MOUNT
    import { authContext } from "$lib/authContext";
	import { onMount } from "svelte";
    let loading: boolean = true;
    onMount(async () => {
        await authContext.autoLogin();
        loading = false;
    })

    // LOAD LIST IF LOGGED IN
    let list: any = [];
    import { getMediaList } from "$lib/util/mediaFetchUtil";
	import { browser } from "$app/environment";
	import ThemeToggle from "$lib/themeToggle.svelte";
    $: if(browser && $authContext) getList();
    async function getList() {
        const response = await getMediaList();
        list = response;
    }
</script>

<style>
    #app-container {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
</style>

<div id="app-container">
    <ThemeToggle />
    {#if !loading}
        {#if $authContext}
            {$authContext}
            <button on:click={authContext.logout}>Logout</button>
            <AddModal />
            {#each list as item}
                <MediaItem item={item}/>
            {/each}
        {:else}
            <Login />
        {/if}
    {:else}
        <span></span>
    {/if}
</div>