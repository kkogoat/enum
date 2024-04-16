<script lang="ts">
	import ThemeToggle from "$lib/components/theme/themeToggle.svelte";
    import Login from "$lib/components/login/login.svelte";
    import Settings from "$lib/components/settings/settings.svelte";
	import Navbar from "$lib/components/navbar/navbar.svelte";
	import List from "$lib/components/list/list.svelte";

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
    @media (min-width:320px) and (pointer: coarse) {
        #app-container {
            display: flex;
            justify-content: center;
        }
    }

    #app-container-login {
        width: 100vw;
        height: 100vh;
    }

    .flex {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<div id={$authContext ? "app-container" : "app-container-login"} class={$authContext ? "" : "flex"}>
    <ThemeToggle />
    {#if !loading}
        {#if $authContext}
            <Navbar />
            <Settings />
            <List />
        {:else}
            <Login />
        {/if}
    {/if}
</div>