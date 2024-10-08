<script lang="ts">
    import { env as envPublic } from "$env/dynamic/public"; 
	import DeleteMedia from "./deleteMedia.svelte";
    import ErrorModal from "$lib/components/error/errorModal.svelte";

    let dialogRef: HTMLDialogElement;

    // FORM MEMBER
    export let id: string;
    export let title: string;
    export let link: string;
    export let image: string;
    export let current_episode: number;
    export let total_episodes: number;
    export let rating: number;
    export let description: string;
    export let type: string;
    export let status: string;

    // FORM DEFAULTS
    let d_title: string = title;
    let d_link: string = link;
    let d_image: string = image;
    let d_current_episode: number = current_episode;
    let d_total_episodes: number = total_episodes;
    let d_rating: number = rating;
    let d_description: string = description;
    let d_type: string = type;
    let d_status: string = status;

    // MODAL OPEN
    export function open() {
        dialogRef.showModal();
        upload_button_ref.blur();
    }

    // MODAL CLOSE
    function close() {
        dialogRef.close();
        [title, link, current_episode] = [d_title, d_link, d_current_episode];
        [total_episodes, rating, description] = [d_total_episodes, d_rating, d_description];
        [type, status, image] = [d_type, d_status, d_image];
        URL.revokeObjectURL(url);
        url = null;
    }
    
    // HANDLE SUBMIT
    let errorRef: any;
    let errorMessage: string;
    let disable: boolean;
    import { editMedia } from "$lib/util/mediaFetchUtil";
    import { listContext } from '$lib/context/listContext';
    async function handleMediaSubmit() {
        disable = true;
        const result = await editMedia({id, title, link, current_episode, total_episodes, rating, description, status, type, image: upload_image});
        const decoded = await result.json();
        if(decoded.details) {
            setTimeout(() => {
                errorMessage = decoded.details[0].message;
                errorRef.showModal();
                disable = false;
            }, 500);
        } else {
            setTimeout(() => {
                dialogRef.close();
                [d_title, d_link, d_current_episode] = [title, link, current_episode];
                [d_total_episodes, d_rating, d_description] = [total_episodes, rating, description];
                [d_type, d_status] = [type, status]
                if(decoded.image) {
                    image = decoded.image;
                    d_image = decoded.image;
                    upload_image = null;
                    if(url) {
                        URL.revokeObjectURL(url);
                        url = null;
                    }
                }
                listContext.updateIdFromList({id, title: d_title, link: d_link, current_episode: d_current_episode, total_episodes: d_total_episodes, rating: d_rating, description: d_description, type: d_type, status: d_status, image: d_image});
                disable = false;
            }, 1000);
        }
    }

    // HANDLE IMAGE UPLOAD
    let input_ref: HTMLInputElement;
    let upload_button_ref: HTMLButtonElement;
    let over_browser = false;
    let over_zone = false;
    let url: any = null;
    let upload_image: any;
    function handleDrop(event: any, area: number) {
        if(area && !disable) {
            if((event.dataTransfer && event.dataTransfer.items) || event.target.files) {
                const file = event.dataTransfer ? event.dataTransfer.items[0].getAsFile() : event.target.files[0];
                if(file.size > 5242880) {
                    errorMessage = "Please insert an image file less than 5MB";
                    errorRef.showModal();
                } else {
                    if(url) URL.revokeObjectURL(url);
                    upload_image = file;
                    url = URL.createObjectURL(file);
                }
            }
        }
        over_browser = false;
        over_zone = false;
    }
    function handleDrag(area: number) {
        if(area) { // mouse over div
            over_zone = !over_zone;
        } else { // mouse over overlay
            over_browser = !over_browser;
        }
    }
</script>

<style>
    .edit-dialog {
        width: 600px;
        height: 435px;
        padding: 30px 30px 12px 30px;
    }
    .layer1 {
        width: 100%;
        height: 225px;
        margin-bottom: 3px;
    }
    .layer1-left {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 27%;
        height: 222px;
        background-color: var(--background-color);
        float: left;
    }
    .layer1-right {
        width: 69%;
        height: 220px;
        float: right;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }
    textarea {
        width: 100%;
        height: 140px;
        resize: none;
        border: none;
    }
    label {
        display: flex;
        flex-direction: column;
        font-size: 13px;
    }
    .label-shorter {
        width: 120px;
    }
    input, select {
        height: 29px;
    }
    button {
        padding: 8px 12px 8px 12px;
    }
    .cancel-button {
        background-color: #b41010;
    }
    .cancel-button:enabled:hover {
        background-color: #ff1515;
    }
    .cancel-button:enabled:active {
        background-color: #d61313;
    }

    .media-delete-button {
        position: absolute;
        right: 30px;
        bottom: 14px;
    }

    /* DRAGZONE + UPLOAD BUTTON */
    .image-preview {
        width: 100%;
        height: 100%;
        object-fit: cover;
        cursor: pointer;
    }
    .image-input {
        display: none;
    }
    .image-upload {
        position: absolute;
    }
    .image-upload:has(+ img) {
        opacity: 0%;
    }
    .image-upload:has(+ img:hover) { 
        opacity: 100%;
    }
    .image-upload:hover {
        opacity: 100%;
    }
    .drag-zone {
        display: none;
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 435px;
        color: var(--text-color);
        z-index: 999;
    }
    .drag-zone-active {
        display: block !important;
        background-color: rgba(var(--background-color-rgb), .95);
    }
    .drag-zone-enabled {
        display: block !important;
        background-color: rgba(var(--background-color-rgb), .70);
    }
    .edit-dialog:has(:is(.drag-zone-enabled, .drag-zone-active)) {
        outline: 1px dashed var(--accent-color-disabled);
    }
    
    @media (min-width: 320px) and (pointer: coarse) {
        .edit-dialog {
            height: 505px;
            padding: 30px 10px 12px 10px;
        }
        .layer1 {
            height: 300px;
        }
        .layer1-left {
            margin-top: 25px;
            width: 35%;
        }
        .layer1-right {
            width: 63%;
        }
        .media-delete-button {
            position: absolute;
            right: 10px;
            bottom: 10px;
        }
    }
    @media (min-width: 600px) and (pointer: coarse) {
        .edit-dialog {
            height: 435px;
            padding: 30px 30px 12px 30px;
        }
        .layer1 {
            height: 225px;
        }
        .layer1-left {
            margin-top: 0px;
            width: 27%;
        }
        .layer1-right {
            width: 69%;
        }
        .media-delete-button {
            position: absolute;
            right: 30px;
            bottom: 14px;
        }
    }
</style>

<dialog class="edit-dialog" bind:this={dialogRef} on:cancel={close} on:dragenter={() => handleDrag(0)} on:dragleave={() => handleDrag(0)} on:drop|preventDefault={(e) => handleDrop(e, 0)} on:dragover|preventDefault>
    <ErrorModal bind:this={errorRef} errorMessage={errorMessage}/>
    <div class="drag-zone {over_browser && !over_zone ? "drag-zone-enabled" : ""} {over_zone ? "drag-zone-active": ""}" on:dragenter={() => handleDrag(1)} on:dragleave={() => handleDrag(1)} on:drop|preventDefault|stopPropagation={(e) => handleDrop(e, 1)} aria-hidden="true">
        {over_browser && !over_zone ? "Drag Here" : ""}
        {over_zone ? "Drop Image" : ""}
    </div>
    <form on:submit|preventDefault={handleMediaSubmit} autocomplete="off">
        <!-- LAYER 1 -->
        <div class="layer1">
            <!-- LEFT COLUMN -->
            <div class="layer1-left">
                <input bind:this={input_ref} class="image-input" type="file" on:cancel|stopPropagation on:change={(e) => handleDrop(e, 1)} disabled={disable}/>
                <button bind:this={upload_button_ref} class="image-upload" on:click|preventDefault={() => input_ref.click()} disabled={disable}>click or drag</button>
                {#if url}
                    <img class="image-preview" src={url} draggable="false" alt="cover" on:click={() => upload_button_ref.click()} aria-hidden="true"/>
                {:else if image}
                    <img loading="lazy" class="image-preview" src={`covers/${image}`} draggable="false" alt="cover" on:click={() => upload_button_ref.click()} aria-hidden="true"/>
                {/if}
            </div>

            <!-- RIGHT COLUMN -->
            <div class="layer1-right">
                <label for="title">
                    Title:
                    <input name="title" type="text" minlength="1" maxlength="200" bind:value={title} disabled={disable} required/>
                </label>
                <label for="link">
                    Link:
                    <input name="link" type="text" minlength="1" maxlength="200" bind:value={link} disabled={disable}/>
                </label>
                <div style="display: flex; justify-content: space-between; flex-wrap: wrap; row-gap: 10px">
                    <label class="label-shorter" for="current-episode">
                        Current #:
                        <input type="number" name="current-episode" min="0" max="2147483647" bind:value={current_episode} disabled={disable} required/>
                    </label>
    
                    <label class="label-shorter" for="total-episode">
                        Total #:
                        <input type="number" name="total-episode" min="0" max="2147483647" bind:value={total_episodes} disabled={disable}/>
                    </label>
    
                    <label class="label-shorter" for="rating">
                        Rating #:
                        <input type="number" name="rating" min="0" max="10" step="0.1" bind:value={rating} disabled={disable}/>
                    </label>

                    <label class="label-shorter" for="status">
                        Status:
                        <select name="status" bind:value={status} disabled={disable}>
                            <option></option>
                            <option>Completed</option>
                            <option>In Progress</option>
                            <option>Planned</option>
                            <option>Dropped</option>
                        </select>
                    </label>
    
                    <label class="label-shorter" for="type">
                        Type:
                        <select name="type" bind:value={type} disabled={disable}>
                            <option></option>
                            {#each envPublic.PUBLIC_ALLOWED_TYPES.split(envPublic.PUBLIC_ALLOWED_TYPES_DELIMITER) as item}
                                <option>{item}</option>
                            {/each}
                        </select>
                    </label>
                    <div class="label-shorter"/>
                </div>
            </div>
        </div>

        <!-- LAYER 2 -->
        <label>
            Description:
            <textarea minlength="1" maxlength="5000" bind:value={description} disabled={disable}></textarea>
        </label>
        
        <!-- LAYER 3 -->
        <div style="display:flex;align-items:center;justify-content:center;gap:20px;margin-top:13px;">
            <button disabled={disable || !Boolean(title)}>
                Save
            </button>
            <button disabled={disable} class="cancel-button" type="button" on:click={close}>
                Cancel
            </button>
        </div>
    </form>

    <!-- MEDIA DELETE -->
    <div class="media-delete-button">
        <DeleteMedia id={id} parentModal={dialogRef}/>
    </div>
</dialog>