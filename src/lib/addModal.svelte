<script lang="ts">
    let dialogRef: HTMLDialogElement;
    let formRef: HTMLFormElement;

    // FORM MEMBER
    let title: string;
    let link: string;
    let current_episode: number;
    let total_episodes: number;
    let rating: number;
    let description: string;
    let status: string;
    let type: string;

    // HANDLE SUBMIT
    let disable: boolean;
    import { addMedia }  from '$lib/util/mediaFetchUtil';
    async function handleMediaSubmit() {
        disable = true;
        await addMedia({title, link, current_episode, total_episodes, rating, description, status, type});
        setTimeout(() => {
            formRef.reset();
            dialogRef.close();
            title="";
            disable = false;
        }, 1000);
    }

    // HANDLE DIALOG CLOSE
    function handleDialogClose() {
        dialogRef.close();
        formRef.reset();
        title="";
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
    .add-button {
        width: 30px;
        height: 30px;
        padding-left: 9.3px;
        padding-top: 7px;
        border-radius: 50px;
        text-align: left
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
</style>

<dialog class="dialog" bind:this={dialogRef}>
    <form on:submit|preventDefault={handleMediaSubmit} bind:this={formRef} autocomplete="off">
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
                        <input type="number" name="current-episode" min="0" bind:value={current_episode} disabled={disable}/>
                    </label>
    
                    <label class="label-shorter" for="total-episode">
                        全 #:
                        <input type="number" name="total-episode" min="1" bind:value={total_episodes} disabled={disable}/>
                    </label>
    
                    <label class="label-shorter" for="rating">
                        評価 #:
                        <input type="number" name="rating" min="1" max="10" step="0.1" bind:value={rating} disabled={disable}/>
                    </label>

                    <label class="label-shorter" for="status">
                        状態:
                        <select name="status" bind:value={status} disabled={disable}>
                            <option></option>
                            <option>Completed</option>
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
            <button disabled={disable} class="cancel-button" type="button" on:click={handleDialogClose}>
                キャンセル
            </button>
        </div>
    </form>
</dialog>

<button class="add-button" on:click={() => dialogRef.showModal()}>
    +
</button>