<script lang="ts">
    import Nav from "./nav.svelte";
    import Analytics from "./analytics.svelte";
	import Data from "./data.svelte";
    import Security from "./security.svelte";
    import Devices from "./devices.svelte";
    let options: {[key: string]: any} = {"analytics": Analytics, "data": Data, "security": Security, "devices": Devices};
    let select: string = "analytics";
    let settingsDialogRef: HTMLDialogElement;

    // SETTINGS OPEN
    function handleOpen() {
        settingsDialogRef.style.display = "flex";
        settingsDialogRef.showModal();
    }
    
    // SETTINGS CLOSE
    function handleClose() {
        settingsDialogRef.style.display = "none";
        select = "analytics";
        settingsDialogRef.close();
    }
</script>

<style>
    .settings-dialog {
        display: none;
        color: var(--text-color);
    }

    .open-button {
        position: fixed;
        padding: 7px 20px 7px 20px;
        border-radius: 50px;
        right: 15px;
        top: 95px;
    }
</style>

<dialog class="settings-dialog" bind:this={settingsDialogRef} on:cancel={handleClose}>
    <Nav options={Object.keys(options)} bind:select dialogClose={handleClose}/>
    <svelte:component this={options[select]}/>
</dialog>

<button class="open-button" on:click={handleOpen}>
    Settings
</button>