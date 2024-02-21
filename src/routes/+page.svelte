<script lang="ts">
    import Login from "$lib/login.svelte";
    import { authContext } from "$lib/authContext";
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
    {#if $authContext}
        {$authContext}
    {:else}
        <Login />
    {/if}
</div>