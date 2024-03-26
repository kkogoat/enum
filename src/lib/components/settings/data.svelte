<script lang="ts">
    import { listContext } from "$lib/context/listContext";
    let inputFileRef: HTMLInputElement;

    function handleExport() {
        let file = new Blob([JSON.stringify($listContext)], {type: "all"})
        if((window.navigator as any).msSaveOrOpenBlob) {
            (window.navigator as any).msSaveOrOpenBlob(file, "enum.usagi");
        } else {
            let a = document.createElement("a");
            let url = URL.createObjectURL(file);
            a.href = url;
            a.download = "enum.usagi";
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }


    // HANDLE IMPORT
    import ErrorModal from "../error/errorModal.svelte";
	import { importMediaList } from "$lib/util/mediaFetchUtil";
    let errorRef: any;
    let errorMessage: string;
    let promptDialogRef: HTMLDialogElement;
    function handleImport() {
        if(inputFileRef.files) {
            promptDialogRef.showModal();
        }
    }
    async function handleSubmit(submit: boolean) {
        if(submit) {
            if(inputFileRef.files) {
                const file = await inputFileRef.files[0].text();
                const result = await importMediaList(file);
                if(result.ok) {
                    window.location.reload();
                } else {
                    errorMessage = (await result.json()).message;
                    errorRef.showModal();
                }
            }
        }
    }

</script>

<style>
    .data-container {
        padding-top: 3px;
        margin-left: 23%;
    }

    .prompt {
        width: 200px;
        color: var(--text-color);
        text-align: center;
    }

    .prompt-text {
        margin-bottom: 10px;
    }
    
    .prompt-button {
        padding: 5px 15px 5px 15px;
    }
    
    input {
        display: none;
    }

    .data-button {
        padding: 20px;
    }
</style>

<ErrorModal bind:this={errorRef} errorMessage={errorMessage}/>
<dialog class="prompt" bind:this={promptDialogRef}>
    <div class="prompt-text">Are you sure? This will replace your current list with the imported list.</div>
    <div>
        <button class="prompt-button" on:click={() => {handleSubmit(true); promptDialogRef.close()}}>yes</button>
        <button class="prompt-button" on:click={() => {handleSubmit(false); promptDialogRef.close()}}>no</button>
    </div>
</dialog>

<div class="data-container">
    <button class="data-button" on:click={handleExport}>export</button>
    <button class="data-button" on:click={() => inputFileRef.click()}>import</button>
    <input bind:this={inputFileRef} type="file" on:cancel|stopPropagation accept=".usagi" on:change={handleImport}/>
</div>