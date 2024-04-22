<script lang="ts">
	import ThemeToggle from "$lib/components/theme/themeToggle.svelte";
    import Settings from "$lib/components/settings/settings.svelte";
	import Navbar from "$lib/components/navbar/navbar.svelte";
    import Login from "$lib/components/login/login.svelte";
	import List from "$lib/components/list/list.svelte";

    // ON MOUNT, TRY LOGIN
    import { authContext } from "$lib/context/authContext";
	import { onMount } from "svelte";
    let loading: boolean = true;
    onMount(async () => {
        await authContext.autoLogin();
        loading = false;
    })

    // LOAD LIST IF LOGGED IN
    import { getMediaList } from "$lib/util/mediaFetchUtil";
    import { listContext } from "$lib/context/listContext";
	import { browser } from "$app/environment";
    $: if(browser && $authContext) (async () => {
        const media_list = await getMediaList();
        listContext.initializeList(media_list);
    })();
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
        width: inherit;
        height: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<div id={$authContext ? "app-container" : "app-container-login"}>
    <ThemeToggle />
    {#if !loading}
        {#if $authContext}
            <Navbar />
            <Settings />
            <List />
        {:else}
            <div class="flex">
                <Login />
            </div>
        {/if}
    {/if}
</div>