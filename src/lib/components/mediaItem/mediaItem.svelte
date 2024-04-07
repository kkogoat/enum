<script lang="ts">
    import Open from "$lib/assets/open.svelte";
    export let item: any;
    export let pos: any;
    
    // DESTRUCTURE ITEM
    let id: string = item["id"];
    let title: string = item["title"];
    let link: string = item["link"];
    let image: string = item["image"];
    let current_episode: number = item["current_episode"];
    let total_episodes: number = item["total_episodes"];
    let rating: number = item["rating"];
    let description: string = item["description"];
    let type: string = item["type"];
    let status: string = item["status"];

    // EDIT MODAL BUTTON
    import EditModal from "./editModal.svelte";
    let editModalRef: any;

    // FONT SIZE CHANGE FOR PROGRESS
    $: current_episode, changeFont();
    $: total_episodes, changeFont();
    let progressFontSize = "font-size: 16px;";
    function changeFont() {
        let length1 = current_episode ? Math.log(current_episode) * Math.LOG10E + 1 | 0 : 1;
        let length2 = total_episodes ? Math.log(total_episodes) * Math.LOG10E + 1 | 0 : 1;
        let total_length = length1+length2;
        if(total_length < 5) {
            progressFontSize = "font-size: 16px;";
        } else {
            progressFontSize = "font-size: 10px; line-height: 26px;"
        }
    }

    // INCREMENT DECREMENT
	import { editMedia } from "$lib/util/mediaFetchUtil";
    let timer: any;
    function incdec(value: number) {
        if(current_episode == 0 && value == -1) {
            return
        }
        if(current_episode == 2147483647 && value == 1) {
            return
        }
        current_episode = current_episode + value;

        // DEBOUNCE
        clearTimeout(timer);
        timer = setTimeout(() => {
            editMedia({id, title, type, current_episode});
        }, 300);
    }
</script>

<style>
    .media-item-container {
        height: 30px;
        display: grid;
        grid-template-columns: minmax(200px, 500px) 50px 85px 100px 120px;
        grid-template-rows: 30px;
        border-bottom: 1px solid var(--foreground-color);
    }

    .pos-1 {
        background-color: var(--background-color);
        transition: color var(--color-animation-timing) ease, background-color var(--color-animation-timing) ease, border-bottom var(--color-animation-timing) ease;
    }
    .pos-2 {
        background-color: var(--background-color-disabled);
        transition: color var(--color-animation-timing) ease, background-color var(--color-animation-timing) ease, border-bottom var(--color-animation-timing) ease;
    }

    .media-item {
        padding: 1px 0px 0px 8px;
    }
    .media-item-border {
        border-right: 1px solid var(--foreground-color);
        transition: border-right var(--color-animation-timing) ease;
    }
    .media-item-progress {
        justify-self: center;
        padding-left: 0px;
        display: grid;
        grid-template-columns: 20px 70px 20px;
        align-items: center;
    }
    .media-item-progress-stat {
        height: 30px;
        max-width: 70px;
        justify-self: center;
        align-self: center;
        overflow-x: hidden;
        white-space: nowrap;
    }
    .media-item-progress-button {
        margin-top: -4px;
        font-size: 18px;
        background: none;
        color: var(--accent-color);
    }
    .media-item-progress-button:hover {
        background: none;
        color: var(--accent-color-hover);
    }
    .media-item-progress-button:active {
        background: none;
        color: var(--accent-color-active);
    }

    .title {
        overflow: hidden;
    }
    .title:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    .media-link {
        width: 32px;
        padding-top: 2px;
        --link-base: var(--accent-color);
        display: flex;
        justify-content: center;
    }
    .media-link:hover {
        --link-base: var(--accent-color-hover);
    }
    .media-link:active {
        --link-base: var(--accent-color-active);
    }
</style>

<div class="media-item-container {pos % 2 == 0 ? "pos-1" : "pos-2"}">
    <div title="Click to edit!" class="media-item media-item-border title" on:click|self={editModalRef.open} aria-hidden="true">
        {title}
    </div>
    <div class="media-item media-item-border">
        {#if link}
            <div class="media-link"><a href={link} target="_black" rel="noopener noreferrer"><Open fill="var(--link-base)" size="15px"/></a></div>
        {/if}
    </div>
    <div class="media-item media-item-border">
        {rating ? rating : "-"}
    </div>
    <div class="media-item media-item-border">
        {type ? type : "-"}
    </div>
    <div class="media-item media-item-progress">
        <button class="media-item-progress-button" on:click={() => incdec(-1)}>-</button>
        <div class="media-item-progress-stat" style={progressFontSize}>
            {current_episode ? current_episode : "-"} / {total_episodes ? total_episodes : "-"}
        </div>
        <button class="media-item-progress-button" on:click={() => incdec(1)}>+</button>
    </div>
</div>

<EditModal bind:this={editModalRef} id={id} bind:title bind:link bind:image bind:current_episode bind:total_episodes bind:rating bind:description bind:type bind:status/>