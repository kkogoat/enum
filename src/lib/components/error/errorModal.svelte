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
    .modal-alignment {
        display: flex;
        flex-direction: column;
    }
    .error-dialog-button {
        padding: 8px 12px 8px 12px;
        margin-top: 15px;
        align-self: center;
    }
</style>

<!-- ERROR -->
<dialog class="{ok ? "ok-dialog" : "error-dialog"}" bind:this={errorRef}>
    <div class="modal-alignment">
        <div>{errorMessage}</div>
        <button class="error-dialog-button"on:click={() => errorRef.close()}>Okay</button>
    </div>
</dialog>