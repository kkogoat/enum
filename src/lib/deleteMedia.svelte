<script lang="ts">
    import Trash from "$lib/assets/trash.svelte";
    
    export let id: string;
    export let parentModal: HTMLDialogElement;
    let deleteModalRef: HTMLDialogElement;

    
    import { listContext } from "$lib/context/listContext";
    import { deleteMedia } from "./util/mediaFetchUtil";
    let disable: boolean = false;
    async function handleDeleteMedia() {
        disable = true;
        await deleteMedia({id: id});
        setTimeout(() => {
            deleteModalRef.close();
            listContext.removeFromList(id);
            if(parentModal) parentModal.close();
            disable = false;
        }, 300);
    }
</script>

<style>
    /* DIALOG */
    .delete-dialog-prompt {
        color: var(--text-color);
    }

    .layer2 {
        width: 100%;
        margin-top: 20px;
        display: grid;
        grid-template-rows: 30px;
        grid-template-columns: 50px 62px;
        grid-gap: 10px;
        justify-content: center;
    }

    /* DIALOG DELETE ACCEPT */
    .delete-dialog-accept {
        background-color: #b41010;
    }
    .delete-dialog-accept:enabled:hover {
        background-color: #ff1515;
    }
    .delete-dialog-accept:enabled:active {
        background-color: #d61313;
    }

    /* TRASH BUTTON */
    .delete-button {
        padding: 5px 5px 2px 5px;
        background-color: #520606;
        --svg-color: #3d3d3d;
    }
    .delete-button:hover {
        background-color: #b41010;
        --svg-color: #ffffff;
    }
    .delete-button:active {
        background-color: #880c0c;
        --svg-color: #838383;
    }
</style>

<dialog bind:this={deleteModalRef} class="delete-dialog-prompt">
    <!-- LAYER 1 -->
    <div>
        本当に滅ぼすつもりですか？
    </div>

    <!-- LAYER 2 -->
    <div class="layer2">
        <button disabled={disable} class="delete-dialog-accept" on:click={handleDeleteMedia}>
            はい
        </button>
        <button disabled={disable} on:click={() => deleteModalRef.close()}>
            いいえ
        </button>
    </div>
</dialog>

<!-- DELETE BUTTON -->
<button class="delete-button" on:click={() => deleteModalRef.showModal()}>
    <Trash fill="var(--svg-color)"/>
</button>