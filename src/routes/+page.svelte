<script lang="ts">
    import Login from "$lib/login.svelte";
    import { authContext } from "$lib/authContext";
	import { onMount } from "svelte";
	import AddModal from "$lib/addModal.svelte";

    let loading: boolean = true;
    onMount(async () => {
        await authContext.autoLogin();
        loading = false;
    })

    // LOAD LIST IF LOGGED IN
    let list: any[] = [];
    import { getMediaList } from "$lib/util/mediaFetchUtil";
	import { browser } from "$app/environment";
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
    {#if !loading}
        {#if $authContext}
            {$authContext}
            <button on:click={authContext.logout}>Logout</button>
            <AddModal />
            {#each list as item}
                {item["title"]}
            {/each}
        {:else}
            <Login />
        {/if}
    {:else}
        <span></span>
    {/if}
</div>