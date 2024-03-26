<script lang="ts">
    import Nav from "./nav.svelte";
    import Analytics from "./analytics.svelte";
	import Data from "./data.svelte";
    let options: {[key: string]: any} = {"analytics": Analytics, "data": Data};
    let select: string = "analytics";
    let settingsDialogRef: HTMLDialogElement;

    // SETTINGS OPEN
    function handleOpen() {
        settingsDialogRef.style.display = "grid";
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
        grid-template-columns: 100px 300px;
        color: var(--text-color);
    }

    .open-button {
        position: absolute;
        padding: 5px 20px 5px 20px;
        border-radius: 50px;
        right: 15px;
        top: 95px;
    }
</style>

<dialog class="settings-dialog" bind:this={settingsDialogRef} on:cancel={handleClose}>
    <Nav bind:select dialogClose={handleClose}/>
    <svelte:component this={options[select]}/>
</dialog>

<button class="open-button" on:click={handleOpen}>
    設定
</button>