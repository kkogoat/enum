<script lang="ts">
    export let item: any;
    export let pos: any;
    let buttonRef: HTMLButtonElement;
    
    // DESTRUCTURE ITEM
    let id: string = item["id"];
    let title: string = item["title"];
    let link: string = item["link"];
    let current_episode: number = item["current_episode"];
    let total_episodes: number = item["total_episodes"];
    let rating: number = item["rating"];
    let description: string = item["description"];
</script>

<style>

    .media-item-container {
        height: 30px;
        display: grid;
        grid-template-columns: minmax(200px, 500px) 100px 100px 100px;
        border-bottom: 1px solid var(--foreground-color);
    }

    .pos-1 {
        background-color: var(--background-color);
    }
    .pos-2 {
        background-color: var(--background-color-disabled);
    }

    .media-item {
        height: 100%;
        padding: 1px 0px 0px 8px;
    }
    .media-item-border {
        border-right: 1px solid var(--foreground-color);
    }
    .media-item-progress {
        padding-left: 0px;
        justify-self: center;
    }

    .edit-button {
        float: right;
        margin: 5px 7px 0px 0px;
        display: none;
    }
    .title:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    .title:hover > .edit-button {
        display: block;
        background-color: var(--accent-color-hover);
    }
    .title:active > .edit-button {
        background-color: var(--accent-color-active);
    }
</style>

<div class="media-item-container {pos % 2 == 0 ? "pos-1" : "pos-2"}">
    <div class="media-item media-item-border title" on:click|self={() => buttonRef.click()} aria-hidden="true">
        {item["title"]}
        <button class="edit-button" bind:this={buttonRef} on:click={() => console.log("clicked")}>open</button>
    </div>
    <div class="media-item media-item-border">
        {item["rating"] ? item["rating"] : "-"}
    </div>
    <div class="media-item media-item-border">
        {item["rating"] ? item["rating"] : "-"}
    </div>
    <div class="media-item media-item-progress">
        {item["current_episode"]} / {item["total_episodes"] ? item["total_episodes"] : "-"}
    </div>
</div>