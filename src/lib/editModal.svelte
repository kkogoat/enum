<script lang="ts">
	import DeleteMedia from "$lib/deleteMedia.svelte";

    let dialogRef: HTMLDialogElement;

    // FORM MEMBER
    export let id: string;
    export let title: string;
    export let link: string;
    export let current_episode: number;
    export let total_episodes: number;
    export let rating: number;
    export let description: string;
    export let type: string;
    export let status: string;

    // FORM DEFAULTS
    let d_title: string = title;
    let d_link: string = link;
    let d_current_episode: number = current_episode;
    let d_total_episodes: number = total_episodes;
    let d_rating: number = rating;
    let d_description: string = description;
    let d_type: string = type;
    let d_status: string = status;

    // MODAL OPEN
    export function open() {
        dialogRef.showModal();
    }

    // MODAL CLOSE
    function close() {
        dialogRef.close();
        title = d_title;
        link = d_link;
        current_episode = d_current_episode;
        total_episodes = d_total_episodes;
        rating = d_rating;
        description = d_description;
        type = d_type;
        status = d_status;
    }
    
    // HANDLE SUBMIT
    let disable: boolean;
    import { editMedia } from "$lib/util/mediaFetchUtil";
    async function handleMediaSubmit() {
        disable = true;
        await editMedia({id, title, link, current_episode, total_episodes, rating, description, status, type});
        setTimeout(() => {
            dialogRef.close();
            d_title = title;
            d_link = link;
            d_current_episode = current_episode;
            d_total_episodes = total_episodes;
            d_rating = rating;
            d_description = description;
            d_type = type;
            d_status = status;
            disable = false;
        }, 1000);
    }

</script>

<style>
    dialog {
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
</style>

<dialog class="dialog" bind:this={dialogRef} on:cancel={close}>
    <form on:submit|preventDefault={handleMediaSubmit} autocomplete="off">
        <!-- LAYER 1 -->
        <div class="layer1">
            <!-- LEFT COLUMN -->
            <div class="layer1-left">

            </div>

            <!-- RIGHT COLUMN -->
            <div class="layer1-right">
                <label for="title">
                    タイトル:
                    <input name="title" type="text" minlength="1" maxlength="100" bind:value={title} disabled={disable} required/>
                </label>
                <label for="link">
                    リンク:
                    <input name="link" type="text" minlength="1" maxlength="100" bind:value={link} disabled={disable}/>
                </label>
                <div style="display: flex; justify-content: space-between; flex-wrap: wrap; row-gap: 10px">
                    <label class="label-shorter" for="current-episode">
                        現在 #:
                        <input type="number" name="current-episode" min="0" max="2147483647" bind:value={current_episode} disabled={disable} required/>
                    </label>
    
                    <label class="label-shorter" for="total-episode">
                        全 #:
                        <input type="number" name="total-episode" min="0" max="2147483647" bind:value={total_episodes} disabled={disable}/>
                    </label>
    
                    <label class="label-shorter" for="rating">
                        評価 #:
                        <input type="number" name="rating" min="1" max="10" step="0.1" bind:value={rating} disabled={disable}/>
                    </label>

                    <label class="label-shorter" for="status">
                        状態:
                        <select name="status" bind:value={status} disabled={disable}>
                            <option></option>
                            <option selected>Completed</option>
                            <option>In Progress</option>
                            <option>Planned</option>
                        </select>
                    </label>
    
                    <label class="label-shorter" for="type">
                        媒体:
                        <select name="type" bind:value={type} disabled={disable}>
                            <option></option>
                            <option>Anime</option>
                            <option>Cartoon</option>
                            <option>C-Drama</option>
                            <option>J-Drama</option>
                            <option>K-Drama</option>
                            <option>Manga</option>
                            <option>Manhwa</option>
                            <option>Manhua</option>
                        </select>
                    </label>
                    <div class="label-shorter"/>
                </div>
            </div>
        </div>

        <!-- LAYER 2 -->
        <label>
            筋書き:
            <textarea minlength="1" maxlength="200" bind:value={description} disabled={disable}></textarea>
        </label>
        
        <!-- LAYER 3 -->
        <div style="display:flex;align-items:center;justify-content:center;gap:20px;margin-top:13px;">
            <button disabled={disable || !Boolean(title)}>
                セーブ
            </button>
            <button disabled={disable} class="cancel-button" type="button" on:click={close}>
                キャンセル
            </button>
        </div>
    </form>

    <!-- MEDIA DELETE -->
    <div class="media-delete-button">
        <DeleteMedia id={id} parentModal={dialogRef}/>
    </div>
</dialog>