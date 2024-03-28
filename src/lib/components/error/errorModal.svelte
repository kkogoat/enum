<script lang="ts">
    let errorRef: HTMLDialogElement;
    export let errorMessage: string;
    let ok: boolean = false;

    export function showModal(mode: string = "") {
        if(mode == "ok") {
            ok = true;
        }
        errorRef.showModal();
    }
</script>

<style>
    .ok-dialog {
        color: var(--text-color-ok);
    }
    .error-dialog {
        color: var(--text-color-error);
    }
    .error-dialog-button {
        padding: 8px 12px 8px 12px;
        margin-top: 15px;
        margin-left: 36%;
        margin-right: 36%;
    }
</style>

<!-- ERROR -->
<dialog class="{ok ? "ok-dialog" : "error-dialog"}" bind:this={errorRef}>
    <div>{errorMessage}</div>
    <button class="error-dialog-button"on:click={() => errorRef.close()}>はい</button>
</dialog>