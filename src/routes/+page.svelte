<script lang="ts">
    import Login from "$lib/login.svelte";
    import { authContext } from "$lib/authContext";
	import { onMount } from "svelte";

    let loading: boolean = true;
    onMount(async () => {
        await authContext.autoLogin();
        loading = false;
    })
</script>

<style>
    #app-container {
        width: 100vw;
        height: 100vh;
        margin: 0px;
        padding: 0px;
        background:#171a20;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        flex-direction: column;
    }
</style>

<div id="app-container">
    {#if !loading}
        {#if $authContext}
            {$authContext}
            <button on:click={authContext.logout}>Logout</button>
        {:else}
            <Login />
        {/if}
    {:else}
        <span></span>
    {/if}
</div>