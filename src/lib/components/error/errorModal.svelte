<script lang="ts">
    let errorRef: HTMLDialogElement;
    export let errorMessage: string;

    export function showModal() {
        errorRef.showModal();
    }
</script>

<style>
    .error-dialog {
        color: var(--text-color-error);
    }
    .error-dialog button {
        padding: 8px 12px 8px 12px;
        margin-top: 15px;
        margin-left: 36%;
        margin-right: 36%;
    }
</style>

<!-- ERROR -->
<dialog class="error-dialog" bind:this={errorRef}>
    <div>{errorMessage}</div>
    <button on:click={() => errorRef.close()}>はい</button>
</dialog>